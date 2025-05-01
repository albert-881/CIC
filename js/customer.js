import { putCompanyProfile } from "./backendLogic.js";
import { getCompanyProfile } from "./backendLogic.js";

const params = new URLSearchParams(window.location.search);
const companyId = params.get("id");

const isValidCompanyId = /^[a-zA-Z0-9_-]{5,50}$/.test(companyId);

document.addEventListener('DOMContentLoaded', async function () {
  const toggleEditBtn = document.getElementById('toggleEdit');
  let isEditMode = false;

  toggleEditBtn.addEventListener('click', async () => {
    isEditMode = !isEditMode;
    toggleViewMode(isEditMode);
    toggleEditBtn.innerText = isEditMode ? 'Save Changes' : 'Edit Mode';

    if (!isEditMode) {
      await saveChanges();
    }
  });

  document.getElementById('toggleCard').addEventListener('click', () => {
    const cardInfo = document.getElementById('cardInfo');
    const isHidden = cardInfo.classList.contains('hidden');
    cardInfo.classList.toggle('hidden');
    document.getElementById('toggleCard').innerText = isHidden
      ? 'Hide Debit Card Info'
      : 'Show Debit Card Info';
  });

  if (companyId && isValidCompanyId) {
    try {
      const data = await getCompanyProfile(companyId);
      if (data) {
        populateFields(data);
      } else {
        alert("Company profile not found.");
      }
    } catch (error) {
      alert("Error loading company profile.");
    }
  } else {
    alert("Invalid or missing company ID.");
  }

  function toggleViewMode(isEdit) {
    document.querySelectorAll('.view').forEach(el =>
      el.classList.toggle('hidden', isEdit)
    );
    document.querySelectorAll('.edit').forEach(el =>
      el.classList.toggle('hidden', !isEdit)
    );
  }

  function normalizeKey(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function populateFields(data) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const rows = section.querySelectorAll('p');

      rows.forEach(row => {
        const label = row.querySelector('strong');
        const view = row.querySelector('span.view');
        const input = row.querySelector('input.edit');

        if (label && view && input) {
          const key = normalizeKey(label.textContent);
          const rawValue = data[key];
          let value = '';

          if (rawValue) {
            value = rawValue.S || rawValue.N || rawValue.BOOL || '';
          }

          input.value = value;

          const link = view.querySelector('a');
          if (link) {
            link.href = value;
            link.textContent = value;
          } else {
            view.textContent = value;
          }
        }
      });
    });
  }

  async function saveChanges() {
    const updatedData = {};

    document.querySelectorAll('section').forEach(section => {
      const rows = section.querySelectorAll('p');

      rows.forEach(row => {
        const view = row.querySelector('span.view');
        const input = row.querySelector('input.edit');
        const label = row.querySelector('strong');

        if (view && input && label) {
          const key = normalizeKey(label.textContent);
          const value = input.value.trim();

          updatedData[key] = value;

          const link = view.querySelector('a');
          if (link) {
            link.href = value;
            link.textContent = value;
          } else {
            view.textContent = value;
          }
        }
      });
    });

    try {
      await putCompanyProfile(companyId, updatedData);
      alert("Changes saved successfully.");
    } catch (error) {
      alert("Failed to save changes.");
    }
  }
});
