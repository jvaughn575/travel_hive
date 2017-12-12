
# Travel Hive
===================

- - - -

# Steps to run: #

The /src directory contains the react app and also a folder /express-api
that holds the express api endpoint.

// Nodemon will watch files in the express-script directory and restart
// the server when files change
1. npm install nodemon -g  

// Starts express
2. In the express-api folder run: npm start

// Starts react app
3. In the /src folder run: npm start

Then localhost:3000/ will take you to the home page.

localhost:3000/api/version will fetch the version number from the express api.
