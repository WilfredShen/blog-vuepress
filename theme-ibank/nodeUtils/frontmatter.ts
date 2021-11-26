import fs from "fs";
import matter from "gray-matter";
import { genPemaLink } from "./components/hash";
import { isReadme, ignoreFormatter, matchAny } from "./components/regex";
import { currentTime } from "./components/time";
import { defaultPrefix, defaultType } from "./defaults";
import { FrontMatter, ThemeConfig } from "types";

const parseFile = (filePath: string) => {
  const paths = filePath.split("/");
  if (isReadme.test(filePath)) paths.pop();
  const fileName = paths.pop() || ".首页";
  const categories = paths.filter(e => e).map(e => e.split(".")[1]);
  const name = fileName.split(".")[1];
  return { fileName, categories, name };
};

const formatFrontmatter = ({
  content,
  frontmatter,
  categories,
  name,
  type = defaultType,
  permalinkPrefix = defaultPrefix,
  author,
}: {
  content: string;
  frontmatter: FrontMatter;
  categories: string[];
  name: string;
  type?: string;
  permalinkPrefix?: string;
  author: ThemeConfig["author"];
}) => {
  if (!frontmatter.title) frontmatter.title = name;
  if (!frontmatter.permalink) frontmatter.permalink = `${permalinkPrefix}${genPemaLink(content)}`;
  if (!frontmatter.date) frontmatter.date = currentTime().datetime;
  if (!frontmatter.type) frontmatter.type = type;
  if (!frontmatter.categories && categories && categories.length) frontmatter.categories = categories;
  if (!frontmatter.author && author) frontmatter.author = { ...author };
  return frontmatter;
};

export const formatFile = (cfg: ThemeConfig, fullPath: string, docPath: string, excludes = [ignoreFormatter]) => {
  const filePath = fullPath.replace(docPath, "");
  if (matchAny(filePath, excludes)) return [filePath, "excluded"]; // 排除的文件
  const { content, data } = matter.read(fullPath);
  const { categories, name } = parseFile(filePath);
  const frontmatter = formatFrontmatter({
    content,
    frontmatter: data as FrontMatter,
    categories,
    type: isReadme.test(filePath) ? "readme" : defaultType,
    name,
    author: cfg.author,
  });
  fs.writeFileSync(fullPath, matter.stringify(content, frontmatter));
  return [filePath, "success"];
};
