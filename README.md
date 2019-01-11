# Version Ticker

Version ticker is designed as a simple server that will periodically (with the help of cron) fetch the versions of a list of npm modules.

## Getting Started

`yarn add version-ticker`

### Manifest

Version Ticker operates with the help of a manifest file that contains optional lists of npm organizations, users, and modules.

```
{
    "orgs": ["dmsi","flatland"],
    "users": ["renddslow", "tehshrike", "saibotsivad"],
    "modules": ["onesignal-promise"],
    "exclude": ["@dmsi/core"]
}
```

| Prop | Description |
| --- | --- |
| `orgs` | An array of npm organization names. The version ticker will fetch all of the modules that your user has access to and cache their names locally. |
| `users` | An array of npm users. The version ticker will fetch all the modules that your user has access to and cache their names locally. |
| `modules` | An array of module names. |
| `excludes` | Modules that should be excluded from the list of versions checked. This is useful when there are more modules that a user or org has than you wish to limit. |

### CLI

The Version Ticker runs on a time delay, fetching results based on a cached list of module names generated at start up.

| Prop | Description |
| --- | --- |
| `-u --username [username]` | npm username |
| `-p --password [password]` | (Optional) npm passsword. If you do not provide it, you will be prompted for it. |
| `[port]` | The port the server should listen on. Defaults to 8080. |
| `-f --filename [filename]` | The relative path to your manifest.json. Defaults to check for a manifest in your current directory. |
| `--interval [interval]` | | |

As of `1.0.0` the response is logged to the console in the following format:

```
[
    { version: <VERSION>, name: <NAME> },
    ...
]
``` 