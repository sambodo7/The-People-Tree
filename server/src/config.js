module.exports = {

    dbHost: process.env.DB_SERVER || "127.0.0.1",
    dbUsername: process.env.DB_USERNAME || "root",
    dbPassword: process.env.DB_PASSWORD || "password",
    facebookSecret: process.env.FB_SECRET,
    facebookID: process.env.FB_ID


};