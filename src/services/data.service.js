import { supabase } from '../db/db.js';

export async function fetchArrayOfRecords(tableName, idName ,idValue) {
  try {
    return await supabase.from(tableName).select('*').eq(idName, idValue);
  } catch(e) {
    console.log(`err fetching tables: ${e}`)
  }
}

export async function getRequests(user_id) {
  try {
    const { data } = await supabase.from('requests').select('*').eq('user_id', user_id);
    return data;
  } catch (e) {
    console.log(`err fetching requests where by company_id: ${e}`)
  }
}

export async function fetchOneRecord(tableName, idName ,idValue) {
  try {
    return await supabase.from(tableName).select('*').eq(idName, idValue).single();
  } catch(e) {
    console.log(`err fetching one record: ${e}`)
  }
}

export async function createReservation(request) {
  const { surplus_id, user_id } = request
  const reservation = {
    surplus_id: surplus_id,
    user_id: user_id,
    reservation_status: 'in process',

  };
  console.log(reservation);
  try {
    return await supabase.from('reservations').insert(reservation).select();
  } catch(e) {
    console.log(`err creating reservation: ${e}`)
  }
}

export async function modifyStatus(id, status, modify) {
  try {
    await supabase.from('requests').update({ request_status: status }).eq('id', id);

    const { data } = await fetchOneRecord('requests', 'id', id)

    if (modify) {
      return await createReservation(data)
    }
  } catch(e) {
    console.log(`err accepting request tables: ${e}`)
  }
}

export async function saveRequest(body) {
  try {
    return await supabase.from('requests').insert(body).single();
  } catch(e){
    console.log(`err saving request: ${e}`)
  } 
}
