import { getCustomers } from "./backendLogic.js";

document.addEventListener("DOMContentLoaded", async () => {
  const companies = await getCustomers();
  console.log(companies);

  const container = document.getElementById("customerGrid");

  companies.forEach(company => {
    const card = createCompanyCard(company);
    container.appendChild(card);
  });
});

function createCompanyCard(company) {
  const a = document.createElement("a");
  a.href = `customer.html?id=${company.id?.S || ""}`;
  a.className = "bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative overflow-hidden";
  a.setAttribute("data-status", "active");
  a.setAttribute("data-name", company.name?.S || "Unknown");
  a.innerHTML = `
    <span class="absolute top-4 right-4 h-3 w-3 rounded-full bg-green-500" title="Active"></span>
    <div class="absolute inset-0 bg-[#4a90e2] opacity-0 group-hover:opacity-10 transition duration-300"></div>
    <h2 class="text-xl font-semibold text-[#4a90e2] group-hover:underline">${company.name?.S || "Unnamed Company"}</h2>
    <p class="text-gray-600 mt-1">View contact and documents</p>
  `;
  a.addEventListener('click', (e)=> {
    console.log(`you clicked on ${company.name?.S || "Unnamed Company"}`);
  });
  return a;
}

