document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const previewButton = document.getElementById('previewButton');
    const modal = document.getElementById('previewModal');
    const closeButton = modal.querySelector('.close');
    const previewContent = document.getElementById('previewContent');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            alert('Thank you for your feedback!');
            this.reset();
        }
    });

    previewButton.addEventListener('click', function() {
        if (validateForm()) {
            displayPreview();
            modal.style.display = 'block';
        }
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const satisfaction = document.getElementById('satisfaction');

        if (name.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        } else {
            document.getElementById('nameError').textContent = '';
        }

        if (email.value.trim() === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!email.value.includes('@')) {
            document.getElementById('emailError').textContent = 'Please Enter a valid email';
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
        }

        if (satisfaction.value < 1 || satisfaction.value > 10) {
            alert('Your score must be between 1 and 10');
            isValid = false;
        }

        return isValid;
    }

    function displayPreview() {
        let previewHTML = '<ul>';
        
        previewHTML += `<li><strong>Name:</strong> ${document.getElementById('name').value}</li>`;
        previewHTML += `<li><strong>Email:</strong> ${document.getElementById('email').value}</li>`;
        
        const firstVisit = document.querySelector('input[name="firstVisit"]:checked');
        previewHTML += `<li><strong>First time visiting:</strong> ${firstVisit ? firstVisit.value : 'Not selected'}</li>`;
        
        const informative = document.querySelector('input[name="informative"]:checked');
        previewHTML += `<li><strong>Was the website easy to access:</strong> ${informative ? informative.value : 'Not selected'}</li>`;
        
        previewHTML += `<li><strong>Suggested improvements:</strong> ${document.getElementById('improvements').value || 'None'}</li>`;
        previewHTML += `<li><strong>Satisfaction score:</strong> ${document.getElementById('satisfaction').value}</li>`;
        previewHTML += `<li><strong>Recommend our service:</strong> ${document.getElementById('recommend').value}</li>`;
        previewHTML += `<li><strong>Receive updates:</strong> ${document.getElementById('updates').value}</li>`;
        previewHTML += `<li><strong>Additional comments:</strong> ${document.getElementById('additionalComments').value || 'None'}</li>`;
        
        previewHTML += '</ul>';
        previewContent.innerHTML = previewHTML;
    }
});