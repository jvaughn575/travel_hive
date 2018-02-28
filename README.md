
# Travel Hive
===================

- - - -

# Steps to run: #

create a copy of `/config/config.js.template` as `/config/config.js` and `/config/dbMigrationConfig.json.template` as `/config/dbMigrationConfig.json` with any env specific settings.

Change database information config/config.js to match your database credentials.
If using the default MySQL port set port to 3306.
If using MAMP set port to 8889.

1. run `npm install`
2. run `npm run db:create`
3. run `npm run server`
4. open another terminal/cmd
5. ensure datbase is started and run `npm start` in second terminal/cmd



[Migrations](https://github.com/sequelize/cli)
run `npm run db:migrate`



- localhost:3000/ will take you to the home page.

- localhost:3000/api/version will fetch the version number from the express api.

![landing page](https://raw.githubusercontent.com/reggieroby/travel_hive/master/public/landing.png)
