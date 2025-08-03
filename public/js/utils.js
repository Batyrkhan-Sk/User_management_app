function showMessage(title, message, type = 'info') {
    const modalTitle = document.getElementById('messageModalLabel');
    const modalBody = document.getElementById('messageModalBody');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = `<div class="alert alert-${type === 'error' ? 'danger' : 'success'} mb-0">${message}</div>`;
    
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    modal.show();
}

function showMessageModal(title, message) {
    showMessage(title, message, 'error');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 1;
}

function getFormData(formId) {
    const elements = document.querySelectorAll(`#${formId} input`);
    const data = {};
    
    elements.forEach(input => {
        if (input.id) {
            data[input.id] = input.value.trim();
        }
    });
    
    return data;
}

function clearForm(formId) {
    const inputs = document.querySelectorAll(`#${formId} input`);
    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.value = '';
        } else {
            input.checked = false;
        }
    });
}