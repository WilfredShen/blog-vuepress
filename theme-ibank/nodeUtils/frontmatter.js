const fs = require("fs");
const matter = require("gray-matter");
const { genPemaLink } = require("./components/hash");
const { isReadme, matchAny } = require("./components/regex");
const { currentTime } = require("./components/time");
const { defaultPrefix, defaultType, author, defaultExcludes } = require("./defaults");

const parseFile = filePath => {
  const paths = filePath.split("/");
  if (isReadme.test(filePath)) paths.pop();
  const fileName = paths.pop() || ".首页";
  const categories = paths.filter(e => e).map(e => e.split(".")[1]);
  const name = fileName.split(".")[1];
  return { fileName, categories, name };
};

const formatFrontmatter = ({ content, frontmatter, categories, name, type = defaultType, permalinkPrefix = defaultPrefix }) => {
  if (!frontmatter.title) frontmatter.title = name;
  if (!frontmatter.permalink) frontmatter.permalink = `${permalinkPrefix}${genPemaLink(content)}`;
  if (!frontmatter.date) frontmatter.date = currentTime().datetime;
  if (!frontmatter.type) frontmatter.type = type;
  if (!frontmatter.categories && categories && categories.length) frontmatter.categories = categories;
  if (!frontmatter.author) frontmatter.author = { ...author };
  return frontmatter;
};

const formatFile = (fullPath, docPath, excludes = defaultExcludes) => {
  const filePath = fullPath.replace(docPath, "");
  if (matchAny(filePath, excludes)) return [filePath, "excluded"]; // 排除的文件
  const { content, data } = matter.read(fullPath);
  const { categories, name } = parseFile(filePath);
  const frontmatter = formatFrontmatter({
    content,
    frontmatter: data,
    categories,
    type: isReadme.test(filePath) ? "readme" : defaultType,
    name,
  });
  fs.writeFileSync(fullPath, matter.stringify(content, frontmatter));
  return [filePath, "success"];
};

module.exports = { formatFile };
