import { supabase } from '../db/db.js';

export async function fetchArrayOfRecords(tableName, idName, idValue) {
  try {
    const { data, error } = await supabase.from(tableName).select('*').eq(idName, idValue);
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error(`Error fetching ${tableName}: ${e.message}`);
    throw e;
  }
}

export async function fetchReservations(tableName, idValue, companyType) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', idValue)
      .eq('user_type', companyType);
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error(`Error fetching reservations: ${e.message}`);
    throw e;
  }
}

export async function getRequests(user_id) {
  try {
    const { data, error } = await supabase.from('requests').select('*').eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error(`Error fetching requests by user_id: ${e.message}`);
    throw e;
  }
}

export async function fetchOneRecord(tableName, idName, idValue) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq(idName, idValue)
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error(`Error fetching one record: ${e.message}`);
    throw e;
  }
}

export async function createReservation(request) {
  const { surplus_id, user_id } = request;
  const reservation = {
    surplus_id,
    user_id,
    reservation_status: 'in process',
  };

  try {
    const { data, error } = await supabase.from('reservations').insert(reservation).select();
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error(`Error creating reservation: ${e.message}`);
    throw e;
  }
}

export async function modifyStatus(id, status, modify) {
  try {
    const { error: updateError } = await supabase
      .from('requests')
      .update({ request_status: status })
      .eq('id', id);
    if (updateError) throw new Error(updateError.message);

    const data = await fetchOneRecord('requests', 'id', id);
    if (modify) {
      return await createReservation(data);
    }

    return data;
  } catch (e) {
    console.error(`Error modifying status: ${e.message}`);
    throw e;
  }
}

export async function saveRequest(body) {
  try {
    const { data, error } = await supabase.from('requests').insert(body).single();
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.error(`Error saving request: ${e.message}`);
    throw e;
  }
}
