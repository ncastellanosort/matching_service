import pgPromise from 'pg-promise'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.AWS_RDS_URL
const pgp = pgPromise()

const conn = {
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const database = pgp(conn)

export default database;

