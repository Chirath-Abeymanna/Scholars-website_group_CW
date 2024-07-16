document.addEventListener("DOMContentLoaded", function() {

    const urlParams = new URLSearchParams(window.location.search);
    const search_item = urlParams.get('search');
    console.log(search_item);

    fetch("../json/content.json").then(response => response.json())
    .then(data => {

        //creating a dictionary to store the data that's been chosen to add to cart
        let product_count = {};
        const template = document.getElementById("data-content").content;
        const product_containter = document.querySelector(".pro-container");
        let match_found = false;

        for (const [title, product] of Object.entries(data)) {

            //a fucntion to cross-match the words
            function check_words(searcher, title) {

                const checking_word = searcher.split(' ');
                const checking_title = title.split(' ');
                
                for (let word of checking_word) {
                    if (!checking_title.includes(word)) {
                        console.log(word)
                        return false;
                    }
                }
            
                return true;
            } 

            let trimed_search_items = search_item.toLowerCase().replace(/\s+/g, ' ').trim();
            let trimed_title = title.toLowerCase().replace(/\s+/g, ' ').trim();
            console.log(check_words(trimed_search_items,trimed_title))


            if (check_words(trimed_search_items,trimed_title)&& search_item){

                const clone = template.cloneNode(true);
                const card = clone.querySelector('.product'); 
                const image = card.querySelectorAll('.image img');
        
                const description_type = card.querySelector(".description #type");
                const description_h5 = card.querySelector(".description h5");
                const description_h6 = card.querySelector(".description h6");
                const description_h4 = card.querySelector(".description #amount");

                match_found = true;

                const image_location = `../${product.img}`;

                // updating the elements with data
                image[0].src = image_location;
                description_type.textContent = product.type;
                description_h5.textContent = title;
                description_h6.textContent = product.author;
                description_h4.textContent = product.price;

                product_containter.appendChild(clone); 

                card.addEventListener('click', function(event) {
                    // Check if clicked element is not a button
                    if (!event.target.matches('#buy-now') && !event.target.matches('#cart-anchor')&& !event.target.matches('#cart-icon')) {
                        // Redirect to product.html with the product title
                        const product_Title = encodeURIComponent(title);
                        window.location.href = `../content/product.html?title=${product_Title}`;
                    }
            });
            }
        }
                
                let error_message = document.getElementById("no-search-results");
                let container = document.getElementById("search-section");
                console.log(match_found)

                //making the error message visible if there's no cards
                if (!match_found){
                    container.style.display = "none";
                    error_message.style.display = "block";
                }
                
                

        const buy_now_btn = document.querySelectorAll(".buy-btn");
            console.log(buy_now_btn)
        
            buy_now_btn.forEach(button =>{
            button.addEventListener("click",function(event){
                const container = this.closest(".product")
                const price_tag = container.querySelector("#amount");

                const price = encodeURIComponent(parseInt(price_tag.textContent));
                window.location.href =`../content/checkout.html?price=${price}`;

                console.log(Number.isInteger(price));
            })
        })


        const cart_button = document.querySelectorAll(".cart-sub #cart-anchor");
        
        cart_button.forEach(button => {
            button.addEventListener("click", function(event) {

                console.log("Working started");

                const purchase_container = this.closest(".product");
                const purchase = purchase_container.querySelector("#purchase");
                const add_item_text = purchase.querySelector("p");
                const item_number = add_item_text.querySelector("#number");
                const title = purchase_container.querySelector("h5").textContent;

                //updating the product count dictionary
                if (product_count[title]){
                    product_count[title]++;
                }else{
                    product_count[title] =1;
                }

                

                // Increasing the number with every click in the add item part
                let currentNumber = parseInt(item_number.textContent);
                item_number.textContent = currentNumber + 1;

                // Making the add item part visible
                add_item_text.style.opacity = 1;
                add_item_text.style.visibility = "visible";

                setTimeout(() => {
                    add_item_text.style.opacity = 0;
                    add_item_text.style.visibility = "hidden";
                }, 1000);

                //Updating the cart number in the header
                const header_cart_number = document.querySelector(".section-0 .cart .item-number p");
                let CurrentNumber = parseInt(header_cart_number.textContent);
                header_cart_number.textContent = CurrentNumber + 1;
                
            });
        });

        //redirecting to the cart.html
        console.log(product_count);
        const main_cart = document.querySelector(".cart");
        main_cart.addEventListener("click",function(event){
            const product_data = encodeURIComponent(JSON.stringify(product_count));
            window.location.href = `../content/cart.html?cartData=${product_data}`;
        })
    })
    .catch(error => console.error('Error fetching the JSON data: ', error));
});