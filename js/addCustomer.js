import { putCustomer } from "./backendLogic.js";

const newCustomer = document.querySelector('#newCustomer');
const name = document.querySelector('#name');
newCustomer.addEventListener('submit', async (e) => {
    e.preventDefault();
    let nameVal = name.value;
    putCustomer(nameVal);
});