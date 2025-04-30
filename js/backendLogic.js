function getAccessToken() {
  return sessionStorage.getItem('access_token');
}



export async function putCustomer(name) {
  const token = getAccessToken();
    try {
      // Make the API request to the backend
      const response = await fetch('https://ccnpdlhwnc.execute-api.us-east-2.amazonaws.com/default/CIC-putCustomer', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }), // Send the data as JSON in the request body
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const responseData = await response.json();
  
      // Handle the response (You can modify based on your needs)
      console.log('Customer added:', responseData);
      return responseData; // Return response data if needed for further use
  
    } catch (error) {
      // Catch and handle any errors   
      console.error('Error adding customer:', error);
      throw error; // Rethrow the error or handle it gracefully in your app
    }
  }

//********************************************************************************************************************/
//********************************************************************************************************************/

  export async function putCompanyProfile(companyId, updatedData) {
    const token = getAccessToken();
    try {
      console.log("Sending update for companyId:", companyId);
      console.log("Updated data:", updatedData);
  
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
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error("Server responded with an error:", result);
        throw new Error(result || "Failed to update company profile.");
      }
  
      console.log("Update successful:", result.message);
      
  
    } catch (error) {
      console.error("Error during company profile update:", error.message);
      throw error; // rethrow so calling function can handle it
    }
  }
  
//********************************************************************************************************************/
//********************************************************************************************************************/

export async function getCompanyProfile(companyId){
  const token = getAccessToken();
  const response = await fetch('https://tad764dbo3.execute-api.us-east-2.amazonaws.com/default/CIC-getCompanyProfile', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ companyId }), // Send the data as JSON in the request body);
});
  try {
    let data = await response.json();
    let status = data.exists;
    console.log(data);
    if(status == true ){
      let companyProfile = data.item;
      return companyProfile;
    }
    else{
      console.log('company profile has not been added yet');
      return;
    }
  } 
  catch (error) {
    
  }
  }

//********************************************************************************************************************/
//********************************************************************************************************************/

export async function getCustomers(){
  const token = getAccessToken();
  const response = await fetch('https://wfz9zapms1.execute-api.us-east-2.amazonaws.com/default/CIC-getCustomers', {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
    try{
        // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const responseData = await response.json();

      return responseData; // Return response data if needed for further use
  
    } catch (error) {
      // Catch and handle any errors
      console.error('Error:', error);
      throw error; // Rethrow the error or handle it gracefully in your app
    }
}

//********************************************************************************************************************/
//********************************************************************************************************************/
  