document.addEventListener('DOMContentLoaded', (event) => {

    const urlParams = new URLSearchParams(window.location.search);
    const productTitle = urlParams.get('title');
    console.log(productTitle)
    let productDetails = {};

    fetch("../json/content.json").then(response => response.json())
    .then(data => {
        const product = data[productTitle];
        if (product) {
            
            // Populate the template with the product data
            const template = document.querySelector(".product-section template").content;
            const clone = template.cloneNode(true);
            const selectedProduct = clone.querySelector('.selected-product');
            const description = selectedProduct.querySelector('.description');

            const imgElement = selectedProduct.querySelector('img');
            const h5Element = description.querySelector('h5');
            const h2Element = description.querySelector('h2');
            const h4Element = description.querySelector('h4');
            const descriptionElement = description.querySelector('#item-paragraph');
            const amountElement = description.querySelector('#amount');

            const image_location = `../${product.img2}`;

            imgElement.src = image_location;
            imgElement.alt = productTitle;
            h5Element.textContent = product.type;
            h2Element.textContent = productTitle;
            h4Element.textContent = product.author;
            descriptionElement.textContent = product.description;
            amountElement.textContent = product.price;

            document.querySelector('.product-section').appendChild(clone);
        }
    })
    .catch(error => console.error('Error fetching the JSON data: ', error));

    setTimeout(() => {
        const quantity = document.getElementById("quantity");
        const add_item = document.getElementById("plus");
        const reduct_item = document.getElementById("minus");
        const buy_now_btn = document.getElementById("buy-now");
        const price_tag = document.getElementById("amount");

        // Ensure elements are found before attaching event listeners
        console.log(quantity, add_item, reduct_item);

        // Reducing the quantity
        reduct_item.addEventListener('click', () => {
            let currentValue = parseInt(quantity.value);
            if (isNaN(currentValue)) {
                currentValue = 1;
            }
            if (currentValue > 1) {
                quantity.value = currentValue - 1;
            }
        });

        // Increasing the quantity
        add_item.addEventListener('click', () => {
            let currentValue = parseInt(quantity.value);
            if (isNaN(currentValue)) {
                currentValue = 1;
            }
            quantity.value = currentValue + 1;
        });

        buy_now_btn.addEventListener('click',()=>{

            let q = document.getElementById("quantity");
            const title =document.querySelector(".description h2").textContent

            let current_quantity = parseInt(q.value);
            let price = parseInt(price_tag.textContent);

            const final_price = current_quantity * price;
            productDetails[title] = current_quantity;
            
            const url_price = encodeURIComponent(parseInt(final_price));
            const product_object = encodeURIComponent(JSON.stringify(productDetails));
            window.location.href =`../content/checkout.html?price=${url_price}&object=${product_object}`;


        })

        // Debugging
        console.log(quantity.value);
    }, 1000);

    // debugging
    console.log(quantity.value);
});