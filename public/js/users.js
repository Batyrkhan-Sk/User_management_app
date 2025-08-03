import { sortUsersByLastLogin } from './sortUsers.js';

let usersData = [];

async function fetchAndRenderUsers() {
  const response = await fetch('http://localhost:3001/api/users');
  let users = await response.json();
  usersData = users; 

  const allBlocked = users.length > 0 && users.every(user => user.status === 'blocked');
  if (allBlocked) {
    showMessage('Notice', 'All users are blocked. You will be redirected to the login page.', 'warning');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    return;
  }

  users = sortUsersByLastLogin(users);

  const tbody = document.getElementById('userDetails');
  tbody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.setAttribute('data-user-id', user.id); 
    row.innerHTML = `
      <td><input class="form-check-input row-checkbox" type="checkbox" /></td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.last_login ? dayjs(user.last_login).fromNow() : 'Never logged in'}</td>
    `;
    tbody.appendChild(row);

    const checkbox = row.querySelector('.row-checkbox');
    checkbox.addEventListener('change', updateMasterCheckboxState);
  });
}

function getSelectedUsers() {
  const selected = document.querySelectorAll('.row-checkbox:checked');
  const selectedIds = Array.from(selected).map(cb => cb.closest('tr').getAttribute('data-user-id'));
  return usersData.filter(user => selectedIds.includes(user.id.toString()));
}

function updateMasterCheckboxState() {
  const checkboxes = document.querySelectorAll('.row-checkbox');
  const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
  const totalCount = checkboxes.length;

  const master = document.getElementById('masterCheckbox');
  if (!master) return;

  master.checked = checkedCount === totalCount;
  master.indeterminate = checkedCount > 0 && checkedCount < totalCount;
}

function showConfirmModal(message, onConfirm) {
  const modalHTML = `
    <div class="modal fade" id="confirmModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">${message}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="confirmBtn">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('confirmModal')?.remove();
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  modal.show();

  document.getElementById('confirmBtn').addEventListener('click', () => {
    modal.hide();
    onConfirm();
  });

  document.getElementById('confirmModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('confirmModal').remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const master = document.getElementById('masterCheckbox');

  master.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = master.checked;
    });
    master.indeterminate = false;
  });

  fetchAndRenderUsers();
});

document.getElementById('deleteAllBtn').addEventListener('click', async () => {
  const selectedUsers = getSelectedUsers();
  
  if (selectedUsers.length === 0) {
    showMessage('No Selection', 'Please select at least one user to delete.', 'error');
    return;
  }

  try {
    for (const user of selectedUsers) {
      await fetch(`http://localhost:3001/api/users/${user.id}`, { method: 'DELETE' });
    }
    await fetchAndRenderUsers();
    showMessage('Success', `${selectedUsers.length} user(s) deleted successfully.`, 'success');
  } catch (error) {
    showMessage('Error', 'Failed to delete users. Please try again.', 'error');
  }
});

document.getElementById('blockAllBtn').addEventListener('click', async () => {
  const selectedUsers = getSelectedUsers();
  
  if (selectedUsers.length === 0) {
    showMessage('No Selection', 'Please select at least one user to block.', 'error');
    return;
  }

  const alreadyBlocked = selectedUsers.filter(user => user.status === 'blocked');
  if (alreadyBlocked.length > 0) {
    const names = alreadyBlocked.map(user => user.name).join(', ');
    showMessage('Warning', `The following users are already blocked: ${names}`, 'warning');
    return;
  }

  try {
    for (const user of selectedUsers) {
      await fetch(`http://localhost:3001/api/users/${user.id}/block`, { method: 'PATCH' });
    }
    await fetchAndRenderUsers();
    showMessage('Success', `${selectedUsers.length} user(s) blocked successfully.`, 'success');
  } catch (error) {
    showMessage('Error', 'Failed to block users. Please try again.', 'error');
  }
});

document.getElementById('unblockAllBtn').addEventListener('click', async () => {
  const selectedUsers = getSelectedUsers();

  if (selectedUsers.length === 0) {
    showMessage('No Selection', 'Please select at least one user to unblock.', 'error');
    return;
  }

  const blockedUsers = selectedUsers.filter(user => user.status === 'blocked');
  const activeUsers = selectedUsers.filter(user => user.status !== 'blocked');

  if (activeUsers.length > 0) {
    const names = activeUsers.map(user => user.name).join(', ');
    const message = `The following user${activeUsers.length > 1 ? 's are' : ' is'} already active: ${names}.`;

    if (blockedUsers.length === 0) {
      showMessage('Info', message, 'info');
      return;
    }

    showConfirmModal(message, () => performUnblock(blockedUsers));
    return;
  }

  performUnblock(blockedUsers);
});


async function performUnblock(users) {
  try {
    for (const user of users) {
      await fetch(`http://localhost:3001/api/users/${user.id}/unblock`, { method: 'PATCH' });
    }
    await fetchAndRenderUsers();
    showMessage('Success', `${users.length} user(s) unblocked successfully.`, 'success');
  } catch (error) {
    showMessage('Error', 'Failed to unblock users. Please try again.', 'error');
  }
}