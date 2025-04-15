const params = new URLSearchParams(window.location.search);
const companyId = params.get("id");
 console.log(companyId);

 // js/customer.js

document.addEventListener('DOMContentLoaded', function () {
    const toggleEditBtn = document.getElementById('toggleEdit');
    let isEditMode = false;
  
    toggleEditBtn.addEventListener('click', () => {
      isEditMode = !isEditMode;
      toggleViewMode(isEditMode);
      toggleEditBtn.innerText = isEditMode ? 'Save Changes' : 'Edit Mode';
  
      if (!isEditMode) {
        saveChanges();
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
  
    function toggleViewMode(isEdit) {
      document.querySelectorAll('.view').forEach(el =>
        el.classList.toggle('hidden', isEdit)
      );
      document.querySelectorAll('.edit').forEach(el =>
        el.classList.toggle('hidden', !isEdit)
      );
    }
  
    function saveChanges() {
      console.log('this would be saving');
      document.querySelectorAll('input.edit').forEach(input => {
        const span = input.previousElementSibling;
        if (span && span.classList.contains('view')) {
          if (span.querySelector('a')) {
            span.querySelector('a').href = input.value;
            span.querySelector('a').innerText = input.value;
          } else {
            span.textContent = input.value;
          }
        }
      });
    }
  });
  