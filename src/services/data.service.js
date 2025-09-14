import database from '../db/db.js'

export async function fetchArrayOfRecords(tableName, idName ,idValue) {
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

export async function fetchOneRecord(tableName, idName ,idValue) {
  try {
    const query = 'SELECT * FROM ${table:name} WHERE ${idCol:name} = ${idVal}';
    const requests = await database.oneOrNone(query, {
      table: tableName,
      idCol: idName,
      idVal: idValue
    });
    return requests;
  } catch(e) {
    console.log(`err fetching tables: ${e}`)
  }
}

export async function createReservation(request_id, surplus_id, company_id, organization_id, reserved_at, status) {
  try {
    const query = `
    INSERT INTO reservations(
      request_id, 
      surplus_id, 
      company_id, 
      organization_id, 
      reserved_at, 
      reservation_status
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `
   return await database.one(query, [request_id, surplus_id, company_id, organization_id, reserved_at, status])
  } catch(e) {
    console.log(`err creating reservation: ${e}`)
  }
}

export async function modifyStatus(tableName, id, status, modify) {
  try {
    const query = 'UPDATE ${table:name} SET request_status = ${newStatus} WHERE request_id = ${idVal}'
    await database.none(query, {
      table: tableName,
      newStatus: status,
      idVal: id
    })

    const table = await fetchOneRecord('requests', 'request_id', id)
    const { request_id, surplus_id, company_id, organization_id, created_at, request_status } = table

    if (modify) {
      return await createReservation(request_id, surplus_id, company_id, organization_id, created_at, request_status)
    }
  } catch(e) {
    console.log(`err accepting request tables: ${e}`)
  }
}

export async function saveRequest(body) {
  try {
    const query = `INSERT INTO requests(
      surplus_id,
      company_id,
      organization_id,
      message,
      request_status,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `
    const { surplus_id, company_id, organization_id, message } = body

    const todayDate = new Date().toISOString()
    return await database.one(query, [surplus_id, company_id, organization_id, message, "pending", todayDate])
  } catch(e){
    console.log(`err saving request: ${e}`)
  } 
}
