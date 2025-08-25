import { getCustomers } from "./backendLogic.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("customerGrid");
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const customerCount = document.getElementById("customerCount");

  // Render function
  function renderCompanies(companies) {
    container.innerHTML = ""; // Clear old cards
    companies.forEach(company => {
      const card = createCompanyCard(company);
      container.appendChild(card);
    });
    updateCustomerCount();
  }

  // Update customer count
  function updateCustomerCount() {
    const visibleCards = [...container.querySelectorAll("a")].filter(
      card => card.style.display !== "none"
    );
    customerCount.textContent = `Showing ${visibleCards.length} customer${
      visibleCards.length !== 1 ? "s" : ""
    }`;
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const cards = container.querySelectorAll("a");
    let anyVisible = false;

    cards.forEach(card => {
      const text = card.getAttribute("data-name").toLowerCase();
      const visible = text.includes(query);
      card.style.display = visible ? "block" : "none";
      if (visible) anyVisible = true;
    });

    noResults.style.display = anyVisible ? "none" : "block";
    updateCustomerCount();
  });

  // Filter buttons
  const filterActive = document.getElementById("filterActive");
  const filterInactive = document.getElementById("filterInactive");
  const filterAll = document.getElementById("filterAll");

  filterActive.addEventListener("click", () => filterCards("active"));
  filterInactive.addEventListener("click", () => filterCards("inactive"));
  filterAll.addEventListener("click", () => filterCards("all"));

  function filterCards(status) {
    const cards = container.querySelectorAll("a");
    let anyVisible = false;

    cards.forEach(card => {
      if (status === "all") {
        card.style.display = "block";
      } else {
        const isVisible = card.getAttribute("data-status") === status;
        card.style.display = isVisible ? "block" : "none";
      }
      if (card.style.display === "block") anyVisible = true;
    });

    noResults.style.display = anyVisible ? "none" : "block";
    updateCustomerCount();
  }

  // 1. Load from localStorage immediately (if available)
  const cached = localStorage.getItem("companies");
  if (cached) {
    try {
      const companies = JSON.parse(cached);
      renderCompanies(companies);
      console.log("✅ Loaded companies from localStorage");
    } catch (err) {
      console.error("❌ Error parsing cached companies:", err);
    }
  }

  // 2. Fetch fresh data from API and update localStorage
  try {
    const companies = await getCustomers();
    renderCompanies(companies);
    localStorage.setItem("companies", JSON.stringify(companies));
    console.log("🔄 Updated companies from DynamoDB via API");
  } catch (err) {
    console.error("❌ Error fetching companies:", err);
  }
});

function createCompanyCard(company) {
  const a = document.createElement("a");
  a.href = `customer.html?id=${company.id?.S || ""}`;
  a.className =
    "bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative overflow-hidden";
  a.setAttribute("data-status", "active");
  a.setAttribute("data-name", company.name?.S || "Unknown");

  // Active status dot
  const statusDot = document.createElement("span");
  statusDot.className =
    "absolute top-4 right-4 h-3 w-3 rounded-full bg-green-500";
  statusDot.title = "Active";
  a.appendChild(statusDot);

  // Hover overlay
  const overlay = document.createElement("div");
  overlay.className =
    "absolute inset-0 bg-[#4a90e2] opacity-0 group-hover:opacity-10 transition duration-300";
  a.appendChild(overlay);

  // Company name
  const title = document.createElement("h2");
  title.className =
    "text-xl font-semibold text-[#4a90e2] group-hover:underline";
  title.textContent = company.name?.S || "Unnamed Company";
  a.appendChild(title);

  // Description
  const desc = document.createElement("p");
  desc.className = "text-gray-600 mt-1";
  desc.textContent = "View contact and documents";
  a.appendChild(desc);

  // Click logging
  a.addEventListener("click", () => {
    console.log(
      `➡️ Clicked on ${company.name?.S || "Unnamed Company"}`
    );
  });

  return a;
}
