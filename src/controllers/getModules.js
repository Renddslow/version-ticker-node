const path = require('path');

const promptly = require('promptly');
const catchify = require('catchify');

const getModuleNames = require('./getModuleNames');
const { getFile, writeFile } = require('./files');

module.exports = async (program) => {
  let auth = program.username &&
    `${program.username}:${await promptly.prompt('npm password :', { silent: true })}`;

  const filepath = program.filename || path.join(process.cwd(), 'manifest.json');
  const [err, manifest] = await catchify(getFile(filepath).then(JSON.parse));

  if (err) {
    throw new Error('File not found');
  }

  const modules = await getModuleNames(auth, manifest);
  await writeFile(path.join(process.cwd(), '.cache.json'), JSON.stringify({
    modules,
    auth,
  }));
};
