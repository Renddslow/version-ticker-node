const http = require('http');

const commander = require('commander');
const express = require('express');

const getModules = require('./controllers/getModules');
const getModuleVersions = require('./controllers/getModuleVersions');

commander
  .version(require('../package').version)
  .option('-f --filename [filename]', 'Path to the watcher manifest')
  .option('-u --username [username]', 'Your npm username')
  .option('[port]', 'The port you want to run the server on')
  .parse(process.argv);

const main = async () => {
  await getModules(commander);

  const app = express();
  const server = http.createServer(app);

  app.get('/', async (req, res) => {
    await getModuleVersions();
    res.end();
  });

  const PORT = commander.port || 8080;

  server.listen(PORT, () => console.log(`Running version-ticker on port ${PORT}`));
};

main();
