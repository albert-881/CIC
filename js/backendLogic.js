function getAccessToken() {
  return sessionStorage.getItem('access_token');
}

function handleUnauthorized() {
  sessionStorage.removeItem("access_token");
  window.location.href = "login.html"; // adjust this path if needed
}

//********************************************************************************************************************/

export async function putCustomer(name) {
  const token = getAccessToken();
  try {
    const response = await fetch('https://ccnpdlhwnc.execute-api.us-east-2.amazonaws.com/default/CIC-putCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (response.status === 401) return handleUnauthorized();
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const responseData = await response.json();
    console.log('Customer added:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
}

//********************************************************************************************************************/

export async function putCompanyProfile(companyId, updatedData) {
  const token = getAccessToken();
  try {
    

    const response = await fetch(
      'https://be1wpz0fde.execute-api.us-east-2.amazonaws.com/default/CIC-putCustomerProfile',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ companyId, updatedData }),
      }
    );

    if (response.status === 401) return handleUnauthorized();
    const result = await response.json();
    if (!response.ok) throw new Error(result || "Failed to update company profile.");

    console.log("Update successful:", result.message);
    return result;
  } catch (error) {
    console.error("Error during company profile update:", error.message);
    throw error;
  }
}

//********************************************************************************************************************/

export async function getCompanyProfile(companyId) {
  const token = getAccessToken();
  try {
    const response = await fetch(
      'https://tad764dbo3.execute-api.us-east-2.amazonaws.com/default/CIC-getCompanyProfile',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ companyId }),
      }
    );

    if (response.status === 401) return handleUnauthorized();
    const data = await response.json();

    if (data.exists) {
      return data.item;
    } else {
      console.log('Company profile has not been added yet');
      return;
    }
  } catch (error) {
    console.error("Error getting company profile:", error);
    throw error;
  }
}

//********************************************************************************************************************/

export async function getCustomers() {
  const token = getAccessToken();
  try {
    const response = await fetch(
      'https://wfz9zapms1.execute-api.us-east-2.amazonaws.com/default/CIC-getCustomers',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );

    if (response.status === 401) return handleUnauthorized();
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}
