document.addEventListener("DOMContentLoaded", function() {
    
    // Getting cart data from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cartDataString = urlParams.get('cartData');
    const cart_data = JSON.parse(decodeURIComponent(cartDataString));

    
    let total_items = 0;

    // Displaying total number of items in cart
    const total_no_items = document.getElementById("total-amount");
    if (!cart_data) {
        total_no_items.textContent = 0;
    } else {
        for (const [title, quantity] of Object.entries(cart_data)) {
            total_items += quantity;
        }
        total_no_items.textContent = total_items;
    }

    // getting the neccessary data from content.json
    fetch("../json/content.json")
        .then(response => response.json())
        .then(data => {

            const cart_items_container = document.getElementById("cart-items");

            // Function to create a new row in the cart table
            function create_row(title, quantity) {
                const product = data[title];

                if (!product) return; 

                const row = document.createElement("tr");

                // Checkbox column
                const check_box_container = document.createElement("td");
                const checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.checked = true; 
                checkBox.classList.add("check-box");
                check_box_container.appendChild(checkBox);
                row.appendChild(check_box_container);

                // Product image column
                const img_container = document.createElement("td");
                const img = document.createElement("img");
                img.src = `../${product.img2}`;
                img.alt = title;
                img_container.appendChild(img);
                row.appendChild(img_container);

                // Type column
                const type_container = document.createElement("td");
                type_container.classList.add("type");
                type_container.textContent = product.type;
                row.appendChild(type_container);

                // Title column
                const title_container = document.createElement("td");
                title_container.classList.add("title");
                title_container.textContent = title;
                row.appendChild(title_container);

                // Quantity column
                const quantity_container = document.createElement("td");
                const quantity_div = document.createElement("div");
                quantity_div.classList.add("quantity");

                // Minus button
                const minus_btn = document.createElement("button");
                minus_btn.textContent = "-";
                minus_btn.classList.add("minus-button");
                quantity_div.appendChild(minus_btn);

                // Quantity input
                const input = document.createElement("input");
                input.type = "text";
                input.value = quantity;
                input.classList.add("quantity-input");
                quantity_div.appendChild(input);

                // Plus button
                const plus_btn = document.createElement("button");
                plus_btn.textContent = "+";
                plus_btn.classList.add("plus-button");
                quantity_div.appendChild(plus_btn);

                quantity_container.appendChild(quantity_div);
                row.appendChild(quantity_container);

                // Price column
                const price_container = document.createElement("td");
                price_container.classList.add("price");
                price_container.textContent = `Rs. ${product.price * quantity}.00`; 
                row.appendChild(price_container);

                // putting the rows to the table body
                cart_items_container.appendChild(row);
                console.log(cart_items_container);

                calculateTotal();

                // functions for plus and minus buttons
                setTimeout(()=>{
                    quantity_div.addEventListener("click", function(event) {
                    
                        const target = event.target;
    
                        
                        if (target.classList.contains("minus-button") || target.classList.contains("plus-button")) {

                            let current_value = parseInt(input.value);
            
                            if (!isNaN(current_value)) {
                                if (target.classList.contains("minus-button") && current_value > 1) {
                                    current_value--;

                                } else if (target.classList.contains("plus-button")) {
                                    current_value++;
                                }
    
                                // Update quantity input
                                input.value = current_value;
    
                                // Update price
                                price_container.textContent = `Rs. ${product.price * current_value}.00`;
    
                                // Recalculate total price
                                calculateTotal();
                            }
                        }
                    });
                },200)
                
            }

            // Create rows for each item in cartData
            for (const [title, quantity] of Object.entries(cart_data)) {
                create_row(title, quantity);
            }

            // Function to calculate and update total price
            function calculateTotal() {
                let total = 0;
                const rows = document.querySelectorAll(".cart-container table tbody tr");

                rows.forEach(row => {
                    const priceCell = row.querySelector(".price");
                    if (priceCell) {
                        const price = parseFloat(priceCell.textContent.replace("Rs. ", ""));
                        total += price;
                    }
                });

                const totalAmountTag = document.querySelector(".total-amount-tag");
                if (totalAmountTag) {
                    totalAmountTag.textContent = `${total.toFixed(2)}`;
                }
            }
        })
        .catch(error => console.error('Error fetching content.json:', error));
});
