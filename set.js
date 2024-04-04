const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUlCS3ZEck1xc2FKZ1pzVlk4bUhnczY0dDlMRFozeTQ1RFdqTi81cWFWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzN0VFoxNHF4bVZyOVdZWHNGbVk3MDlpeWlteXNoSTlhSnYrSFE3aXJEYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RkpHVFg5YWxlVW5KWm5HUVVuL1l2MSs0WkM3MHNzODlISGFPUVNhMTJRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYTTFRV2FiMklqdm1vbGticm9lazE5RU15ODFXdjZrRVVBZjJHeUEyK2tNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFGNVROWHJsZ05scTdkaERDREsvcG03QnEyODZKbmJoQXdxeFFWOXk3Rzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5yRVB1bkIvWkVpV1IvUkVEdnNwblBBYkVzdUlRRnlZK0xvclJZQ3JhZ009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0lvWndwYmNheWJyL3dmUzJ0UktqUUpaU0FhZjRmTCtublVYQnd5ODdGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFNzTVhqOGJFandJY3dSM2JvQXlNcGk2RmcySVB2dCsrQ0R4QkFxVmYyUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBBMHBJdEE5S1RWRmVnWnltc1EzY2o2VTVXNUtUMUVHMEZKaHJEY3dJRVpTUjlpTkxQMHhoaEViRHI1eENmVnV6S2o5QXpFNlBodURIbkZnZUZQc0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE5LCJhZHZTZWNyZXRLZXkiOiJoMlVNQ0ZHNXpHajZJSHd5TCtSSzN3UDRQR0hBVUhCOUV1UkNZZzZGTHk4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJfWk5XdEhLZlFHLVdPM1dKenVmR2l3IiwicGhvbmVJZCI6ImIxMTgyOTgxLWEzM2EtNDU3NS05OGRjLTI3YWEzZDY2OTkzNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyelVnOXA2VjE3NlFiT3R6UFBDNlVNZ1RmMlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWnVVbXh2MzhBaE85TlJPTzdoNUJJelMvbWFBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdUQ1BXRDhaIiwibWUiOnsiaWQiOiIyMDEwOTU0OTk4NjY6MjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTmVHbSBTdGFyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNTHBMQkRQcTZxd0JoZ0NJQUFvQUE9PSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJFRk85Q051S28wMWJLK29tNDFWc3V2b2ZOWWNSS3lrbFVmcHdhdE9xZEY0PSIsImFjY291bnRTaWduYXR1cmUiOiJnZXpFUzNDdXJKQXNsVTArYnYxOTNHUy9ONnFLZUJLV3Y2OXhtSGJCNUVicmhHZ0RSQnhNMjJBbUxDeVlTQXlLeDNmTktuS2s1aHdWK0tmZGNadHlBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibXM2Z0F5VVliR1hGK1BqVlV2ellJUXphTk1jWUlwOHphdVRSV1d3YlFiYldEam1rb3owRUNWNDRzSTh0eXNPZTRyWG5NRVByUFJjbmN5SnczNVVHQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMDEwOTU0OTk4NjY6MjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUkJUdlFqYmlxTk5XeXZxSnVOVmJMcjZIeldIRVNzcEpWSDZjR3JUcW5SZSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxMTk2OTc1NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOS3UifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "snarco ilbasha",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "201095499866",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'oui',
    BOT : process.env.BOT_NAME || 'S N A R K O',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
