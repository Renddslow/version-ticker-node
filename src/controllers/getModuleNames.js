const got = require('got');
const { uniq } = require('lodash');

module.exports = async (auth, { orgs, users, modules, exclude }) => {
  const [orgRepos, userRepos] = await Promise.all([
    Promise.all(orgs.map((org) => got(
      `https://registry.npmjs.org/-/org/${org}/package`,
      { json: true, auth },
    ).then((data) => data.body))),
    Promise.all(users.map((user) => got(
      `https://registry.npmjs.org/-/user/${user}/package`,
      { json: true, auth },
    ).then((data) => data.body)))
  ]);

  const repos = ([ ...orgRepos, ...userRepos ])
    .reduce((acc, repo) => ([
      ...acc,
      ...Object.keys(repo).map((k) => k),
    ]),[]);

  return uniq([
    ...repos,
    ...modules,
  ]).filter((m) => !exclude.includes(m));
};