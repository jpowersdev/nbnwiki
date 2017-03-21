module.exports = {
    client: 'sqlite3',
    connection: {
      filename: process.env.TESTING ? "./tests/e2e/db/matterwiki.sqlite" : "./db/matterwiki.sqlite"
      //filename: process.env.TESTING ? "./tests/e2e/db/nbnwiki.sqlite" : "./db/nbnwiki.sqlite"
    },
    useNullAsDefault: true
}

/*
The development object is the connection object for the development database.
We need to create more for different environments (production, testing, staging).
This environment is being used in the db.js file in the root directory. Check there.
*/
