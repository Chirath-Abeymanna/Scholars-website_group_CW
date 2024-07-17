document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Simple validation
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
        alert('Your score must between 1 and 10');
        isValid = false;
    }

    if (isValid) {
        alert('Thank you for your feedback!');
        this.reset();
    }
});