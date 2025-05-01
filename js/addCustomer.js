import { putCustomer } from "./backendLogic.js";

const newCustomer = document.querySelector('#newCustomer');
const name = document.querySelector('#name');

newCustomer.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nameVal = name.value.trim();

  // Basic input validation
  if (!nameVal || nameVal.length < 2 || nameVal.length > 100) {
    alert("Please enter a valid name (2–100 characters).");
    return;
  }

  try {
    const result = await putCustomer(nameVal);
    alert("Customer successfully added.");
    name.value = ""; // Clear the field
  } catch (error) {
    alert("There was an error adding the customer. Please try again.");
    // You can log detailed errors in dev tools if needed
    // console.error("putCustomer error:", error);
  }
});
