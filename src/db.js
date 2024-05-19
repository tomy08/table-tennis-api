import mysql from 'mysql'

const connection = mysql.createConnection({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'table_tennis',
})

export default connection
