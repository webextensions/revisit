#!/usr/bin/env node

const
    fs = require('node:fs');

const
    chalk = require('chalk'),
    findUp = require('find-up');

// TODO: These values are set to avoid human errors in typing values, so, these variables and hence the package would
//       need to be updated after a certain period of time. In future, we may switch the approach to limit
//       snooze-duration / frequency / etc.
const
    SNOOZE_LIMIT = '2025-12-31',
    LAST_REMINDER_ACTED_UPON_DEFAULT_VALUE = '2020-01-01';

const revisitFileName = 'revisit.json';
const revisitJsonFilePath = findUp.sync(revisitFileName);

if (!revisitJsonFilePath) {
    console.log(chalk.red(` ✘ Error: Could not find file ${revisitFileName} at ${process.cwd()} or any of its parent directories.`));
    process.exit(1);
}

let revisitJson;
try {
    revisitJson = JSON.parse(fs.readFileSync(revisitJsonFilePath));
} catch (e) {
    console.log(chalk.red(` ✘ Error: Ensure that ${revisitJsonFilePath} is a valid JSON file with appropriate file read permissions.`));
    process.exit(1);
}

const mainConfig = revisitJson.revisit || {};
const arrReminders = mainConfig.reminders || [];
const revisitSettings = mainConfig.settings || {};

const today = new Date();
const dateForToday = today.toISOString().substr(0, 10);

const { snoozedAllUpto } = revisitSettings;

if (snoozedAllUpto && (snoozedAllUpto > dateForToday) && (snoozedAllUpto <= SNOOZE_LIMIT)) {
    // do nothing
} else {
    for (const reminder of arrReminders) {
        const {
            description = 'Description not available',
            frequencyInDays = 1,
            lastReminderActedUpon = LAST_REMINDER_ACTED_UPON_DEFAULT_VALUE,
            snoozedUpto = null
        } = reminder;

        const dateForLastReminderActedUpon = new Date(
            Date.UTC(
                parseInt(lastReminderActedUpon.substr(0, 4), 10),
                parseInt(lastReminderActedUpon.substr(5, 2), 10) - 1,
                parseInt(lastReminderActedUpon.substr(8, 2), 10)
            )
        );

        const nextReminderAfter = new Date(
            dateForLastReminderActedUpon.getTime() +
            frequencyInDays * 24 * 60 * 60 * 1000
        );

        if (snoozedUpto && (snoozedUpto > dateForToday) && (snoozedAllUpto <= SNOOZE_LIMIT)) {
            // do nothing
        } else {
            if (today > nextReminderAfter) {
                console.log(
                    chalk.yellow('Revisit:') +
                    chalk.cyan(` (Due date: ${chalk.bold(nextReminderAfter.toISOString().substr(0, 10))} UTC)`) +
                    ` - ${description}`
                );
            }
        }
    }
}
