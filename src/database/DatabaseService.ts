import logger from '../shared/Logger';
import * as mysql from 'mysql';
import dbConfig from "../config/dbConfig.json";


export default class DatabaseService {
  pool: any = {};

  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 50,
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      dateStrings: true,
      charset: 'utf8',
      
    });
  }

  getConnection = (callback: any) => {
    this.pool.getConnection(callback);
  };

  executeQuery = (sql: string, values: any, conn: any) => new Promise((resolve, reject) => {
    return conn.query(sql, values, (err: any, results: any) => {
      console.log('executeQ1');
      if (sql != "SELECT * from `admin` where `admin_email`=?") {
        logger.info('SQL: ' + sql);
        logger.info('Query values: ' + values);
      }
      conn.release();
      console.log('executeQ2');

      if (err) {
        console.log('error occur in dbservice query')
        reject(err);
      } else {
        if (sql != "SELECT * from `admin` where `admin_email`=?") {
          logger.info('Query Sueccess! results:' + JSON.stringify(results));
        }
        console.log('executeQ3', results);
        resolve(results);
        console.log('executeQ4');
      }
    });
  })

  query = (sql: string, values: any, conn?: any) => new Promise((resolve, reject) => {
    if (conn) {
      conn.query(sql, values, (err: any, results: any) => {
        if (sql != "SELECT * from `admin` where `admin_email`=?") {
          logger.info('SQL: ' + sql);
          logger.info('Query values: ' + values);
        }
  
        if (err) {
          console.log('error occur in dbservice query')
          reject(err);
        } else {
          if (sql != "SELECT * from `admin` where `admin_email`=?") {
            logger.info('Query Sueccess! results:' + JSON.stringify(results));
          }
          resolve(results);
        }
      });
    } else {
      this.pool.getConnection((err: any, connection: any) => {
        if (err) {
          reject(err);
          throw err;
        } else {
          connection.query(sql, values, (err: any, results: any) => {
            if (sql != "SELECT * from `admin` where `admin_email`=?") {
              logger.info('SQL: ' + sql);
              logger.info('Query values: ' + values);
            }
            connection.release();
      
            if (err) {
              console.log('error occur in dbservice query')
              reject(err);
            } else {
              if (sql != "SELECT * from `admin` where `admin_email`=?") {
                logger.info('Query Sueccess! results:' + JSON.stringify(results));
              }
              resolve(results);
            }
          });
        }
      });
    }

  });

  beginTransaction = () => {
    this.pool.beginTransaction();
  }

  destroy = () => {
    this.pool.end((err: any) => console.error(err));
  }
}