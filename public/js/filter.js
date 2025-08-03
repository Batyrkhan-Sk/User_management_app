document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('userSearch');
  const tableBody = document.getElementById('userDetails');

  if (!searchInput || !tableBody) return;

  searchInput.addEventListener('input', function () {
    const filter = searchInput.value.toLowerCase();

    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
      const name = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
      const email = row.querySelector('td:nth-child(3)')?.textContent.toLowerCase() || '';

      if (name.includes(filter) || email.includes(filter)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
});
