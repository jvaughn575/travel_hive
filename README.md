
# Travel Hive
===================

- - - -

# Steps to run: #


create a copy of `/config/default.json.template` as `/config/default.json` with any env specific settings.

1. npm install
2. npm run db:create
3. run `npm start` in first terminal/cmd
4. open another terminal/cmd
5. run `npm run server` in second terminal/cmd

Change database information config/default.json to match your database credentials.

If using the default MySQL port set port to 3306.
If using MAMP set port to 8889.


Nodemon is installed as a dev dependence, so no need to manually install it.

Then localhost:3000/ will take you to the home page.

localhost:3000/api/version will fetch the version number from the express api.

![landing page](https://raw.githubusercontent.com/reggieroby/travel_hive/master/public/landing.png)
