const commander = require('commander');

const getModules = require('./controllers/getModules');
const getModuleVersions = require('./controllers/getModuleVersions');

commander
  .version(require('../package').version)
  .option('-f --filename [filename]', 'Path to the watcher manifest')
  .option('-u --username [username]', 'Your npm username')
  .option('-p --password [password]', 'Your npm password')
  .option('--interval [interval]', 'The interval in seconds at which the versions should be fetched')
  .parse(process.argv);

const main = async () => {
  await getModules(commander);

  setTimeout(getVersions, 0);

  async function getVersions() {
    await getModuleVersions();

    setTimeout(getVersions, (parseInt(commander.interval, 10) || 120) * 1000);
  }
};

main();
