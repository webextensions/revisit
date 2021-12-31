# @webextensions/revisit
Tasks to revisit from time to time / Simple reminders for recurring tasks


# Usage
```sh
$ npm install --global @webextensions/revisit
$ cd /path/to/project/
$ revisit
 ✘ Error: Could not find file revisit.json at /path/to/project or any of its parent directories.
```

Now, to fix the issue of missing `revisit.json` file, add it at your project's root folder with contents like the following:
```json
{
    "revisitSettings": {
        "snoozedAllUpto": "2022-01-05"
    },
    "revisit": [
        {
            "description": "Ensure that SSL certificate is working well for production site",
            "frequencyInDays": 1,
            "lastReminderActedUpon": "2022-01-01",
            "snoozedUpto": "2022-01-10"
        },
        {
            "description": "Update Node JS version",
            "frequencyInDays": 14,
            "lastReminderActedUpon": "2022-01-01"
        },
        {
            "description": "Update npm packages",
            "frequencyInDays": 14,
            "lastReminderActedUpon": "2022-01-01"
        },
        {
            "description": "Update installed softwares",
            "frequencyInDays": 28,
            "lastReminderActedUpon": "2022-01-01"
        },
        {
            "description": "Review unwanted npm packages",
            "frequencyInDays": 84,
            "lastReminderActedUpon": "2022-01-01"
        }
    ]
}
```

Now, suppose on 2022-01-06, one attempts to execute the above mentioned command, the output would look like:
```sh
$ cd /path/to/project/
$ revisit
Revisit: (Due date: 2022-01-15 UTC) - Update Node JS version
Revisit: (Due date: 2022-01-15 UTC) - Update npm packages
Revisit: (Due date: 2022-01-29 UTC) - Update installed softwares
Revisit: (Due date: 2022-03-26 UTC) - Review unwanted npm packages
```

One may want to call this `revisit` command via the `post-checkout` / `post-commit` hook in the project's Git repository.


# About this project

## Author

* Priyank Parashar - [GitHub](https://github.com/paras20xx) | [Twitter](https://twitter.com/paras20xx) | [LinkedIn](https://linkedin.com/in/ParasharPriyank/)

## Connect with us

* https://www.webextensions.org/
* [GitHub](https://github.com/webextensions/live-css-editor)
* [Twitter](https://twitter.com/webextensions)

## License

* [MIT](LICENSE)
