import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import appRoute from './app/app.routing';

const app = express();
// console.log("log start")
// console.log( `./environments/${ process.env.NODE_ENV }.env`)
// 動態選擇環境變數的檔案
dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });

//----------------------------------------------------------------
//* import database
import { Database } from './database';
Database.connect();
//----------------------------------------------------------------

app.get('/', (req, res, next) => {
    res.send('Hello, World!!');
});

app.use('/', appRoute);

app.listen(process.env.PORT, () => console.log(`http server is running at port ${ process.env.PORT }.`));