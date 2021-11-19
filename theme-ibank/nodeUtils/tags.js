const { defaultType } = require("./defaults");

const buildTags = pages => {
  const tags = { $all: [] };
  pages.forEach(page => {
    if (page.data.frontmatter.type === defaultType) {
      const p = { $data: { order: page.order, ...page.data } };
      tags.$all.push(p);
      page.data.frontmatter.tags &&
        page.data.frontmatter.tags.forEach(tag => {
          if (!tags[tag]) tags[tag] = [];
          tags[tag].push(p);
        });
    }
  });
  Object.values(tags).forEach(l => l.sort(({ $data: { frontmatter: a } }, { $data: { frontmatter: b } }) => b.date.localeCompare(a.date)));
  return tags;
};

module.exports = { buildTags };
