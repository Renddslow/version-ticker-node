const path = require('path');
const got = require('got');

const { getFile } = require('./files');

module.exports = async () => {
  const { modules, auth } = await getFile(path.join(process.cwd(), '.cache.json')).then(JSON.parse);

  const packages = await Promise.all(
    modules.map(async (module) => got(
      `https://registry.npmjs.org/${module}`,
      { json: true, auth },
    )
      .then((d) => d.body)
      .then((d) => ({
        version: d['dist-tags'].latest,
        name: d.name,
      }))
    )
  );

  console.log(packages);
};