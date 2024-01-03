const fs = require('fs');
require('dotenv').config();

const writeStream = fs.createWriteStream('android/app/src/main/res/values/strings.xml');

writeStream.write(`<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">${process.env.APP_NAME}</string>
    <string name="title_activity_main">${process.env.APP_NAME}</string>
    <string name="package_name">${process.env.APP_ID}</string>
    <string name="custom_url_scheme">${process.env.APP_ID}</string>
    <string name="server_client_id">${process.env.GOOGLE_SERVER_CLIENT_ID}</string>
</resources>
`);

writeStream.end();
