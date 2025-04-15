export async function putCustomer(name) {
   
    try {
      // Make the API request to the backend
      const response = await fetch('https://ccnpdlhwnc.execute-api.us-east-2.amazonaws.com/default/CIC-putCustomer', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          // If you need authorization, add an Authorization header
          // 'Authorization': `Bearer ${authToken}`, // Uncomment if using Cognito or any auth mechanism
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

export async function getCustomers(){
    const response = await fetch('https://wfz9zapms1.execute-api.us-east-2.amazonaws.com/default/CIC-getCustomers')
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

  