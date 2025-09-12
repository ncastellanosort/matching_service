import database from '../db/db.js'

export async function fetchTables(tableName, idName ,idValue) {
  try {
    const query = 'SELECT * FROM ${table:name} WHERE ${idCol:name} = ${idVal}';
    const requests = await database.any(query, {
      table: tableName,
      idCol: idName,
      idVal: idValue
    });
    return requests;
  } catch(e) {
    console.log('err fetching requests from db')
  }
}


