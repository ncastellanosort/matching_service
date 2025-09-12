import pgPromise from 'pg-promise'

const DATABASE_URL = proces.env.URL_DATABASE
const pgp = pgPromise()

const db = pgp(DATABASE_URL)

export default db;
