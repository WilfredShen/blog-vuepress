const { defaultType } = require("./defaults");

const buildArchives = pages => {
  const archives = {};
  pages.forEach(page => {
    if (page.data.frontmatter.type === defaultType) {
      const p = { $data: page.data };
      const [year, month, day] = p.$data.frontmatter.date
        .slice(0, 10)
        .split("-")
        .map(e => parseInt(e));
      if (!archives[year]) archives[year] = {};
      if (!archives[year][month]) archives[year][month] = {};
      if (!archives[year][month][day]) archives[year][month][day] = [];
      archives[year][month][day].push(p);
    }
  });
  return archives;
};

module.exports = { buildArchives };
