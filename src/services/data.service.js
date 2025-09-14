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
    console.log(`err fetching tables: ${e}`)
  }
}

export async function modifyStatus(tableName, id, status) {
  try {
    const query = 'UPDATE ${table:name} SET request_status = ${newStatus} WHERE request_id = ${idVal}'
    await database.none(query, {
      table: tableName,
      newStatus: status,
      idVal: id
    })

    return await fetchTables('requests', 'request_id', id)

  } catch(e) {
    console.log(`err accepting request tables: ${e}`)
  }
}
