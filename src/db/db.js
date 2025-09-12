import pgPromise from 'pg-promise'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.URL_DATABASE
const pgp = pgPromise()

const database = pgp(DATABASE_URL)

export default database;
