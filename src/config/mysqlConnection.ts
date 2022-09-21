import mysql from 'mysql';
import dbConfig from "./dbConfig.json";

const config = {
    host : dbConfig.host,
    user : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database
}

export const conn = mysql.createConnection(config);
conn.connect();
