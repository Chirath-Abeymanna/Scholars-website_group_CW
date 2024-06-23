document.addEventListener("DOMContentLoaded", function() {
    // Getting cart data from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sum_total = urlParams.get('price');
    console.log(Number.isInteger(sum_total));

    const amount_tag = document.querySelector(".total-amount");

    if(sum_total){
        amount_tag.textContent = parseFloat(sum_total).toFixed(2);
    }
    else{
        amount_tag.textContent = `0.00`;
    }

    const feedback_containter = document.querySelector(".feedback");

    const personal_form = document.querySelector('.personal-details-form');
    const address_form = document.querySelector('.address-form');
    const card_form = document.querySelector('.card-details-form');
    const background = document.querySelector(".checkout-form-container");

    const back_btn = document.getElementById('back-arrow');
    const next_personal_btn = document.getElementById('next-personal-button');
    const next_address_btn = document.getElementById('next-address-button');
    const submit_btn = document.getElementById('submit-btn');

    const phone_number = document.getElementById("p-number");
    const card_number = document.getElementById("c-num");

    const exp_date = document.getElementById("exp-d");
    const cvc = document.getElementById("cvc");
    const postal_code = document.getElementById('p-code');


    background.style.height = "25rem";
    address_form.style.display = 'none';
    card_form.style.display = 'none';

    // Function to validate a form
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, select');
        let valid = true;
        for (const input of inputs) {
            const error = input.nextElementSibling;
            if (!input.value.trim()) {
                error.style.opacity = "1";
                valid = false;
            }
            else{
                error.style.opacity = "0";
            }
        }
        return valid;
    }

    // Event listener for next button in personal details form
    next_personal_btn.addEventListener('click', function(event) {
        event.preventDefault(); 

        if (validateForm(personal_form)) {
            personal_form.style.display = 'none';
            address_form.style.display = 'block';
            background.style.height = "33rem";
        }
    });

    // Event listener for next button in address form
    next_address_btn.addEventListener('click', function(event) {
        event.preventDefault(); 

        if (validateForm(address_form)) {
            address_form.style.display = 'none';
            card_form.style.display = 'block';
            background.style.height = "25rem";
        } 
    });

    // Event listener for back arrow button
    back_btn.addEventListener('click', function(event) {
        event.preventDefault(); 

        if (card_form.style.display === 'block') {
            card_form.style.display = 'none';
            address_form.style.display = 'block';
            background.style.height = "33rem";

        } else if (address_form.style.display === 'block') {
            address_form.style.display = 'none';
            personal_form.style.display = 'block';
            background.style.height = "25rem";
        }
    });

    submit_btn.addEventListener('click',function(event){
        event.preventDefault();

        
        if (validateForm(card_form)) {

            background.style.display = "none";
            feedback_containter.style.display = "inline-block";
        }


    })

    // chedking phone number input
    phone_number.addEventListener('input', function(event) {
        let value = event.target.value.replace(/\D/g, '');

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        if (value.length > 6) {
            value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
        } else if (value.length > 3) {
            value = `${value.slice(0, 3)} ${value.slice(3)}`;
        }

        event.target.value = value;
    });

    // checking card number input
    card_number.addEventListener('input', function(event) {
        let number = event.target.value.replace(/\D/g, '');

        if (number.length > 16) {
            number = number.slice(0, 16);
        }

        if (number.length > 12) {
            number = `${number.slice(0, 4)}-${number.slice(4, 8)}-${number.slice(8, 12)}-${number.slice(12)}`;
        } else if (number.length > 8) {
            number = `${number.slice(0, 4)}-${number.slice(4, 8)}-${number.slice(8)}`;
        } else if (number.length > 4) {
            number = `${number.slice(0, 4)}-${number.slice(4)}`;
        }

        event.target.value = number;
    });

    // checking expiration date input
    exp_date.addEventListener('input', function(event) {
        let number = event.target.value.replace(/\D/g, '');

        if (number.length > 4) {
            number = number.slice(0, 4);
        }
        if (number.length > 2) {
            number = `${number.slice(0, 2)}/${number.slice(2)}`;
        }

        event.target.value = number;
    });

    // checking CVC input
    cvc.addEventListener('input', function(event) {
        let number = event.target.value.replace(/\D/g, '');

        if (number.length > 3) {
            number = number.slice(0, 3);
        }

        event.target.value = number;
    });

    //checking postal code input
    postal_code.addEventListener('input',(e)=>{

        let number = e.target.value.replace(/\D/g,"");

        e.target.value = number;
    })
});
