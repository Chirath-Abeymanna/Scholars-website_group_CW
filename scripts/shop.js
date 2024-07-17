let slider = document.querySelector('.Top-sellers .list');
let items = document.querySelectorAll('.Top-sellers .list .item');
let img_tag = document.querySelectorAll('.Top-sellers .list button[name]');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.Top-sellers .dots li');
const product_template = document.querySelector("[data-content]"); 
let productDetails = {};


//Creating the functions for image slider in top sellers
let length_items = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= length_items ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : length_items;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 5000);

function reloadSlider(){

    slider.style.left = -items[active].offsetLeft + 'px';
    
    let last_active_dot = document.querySelector('.Top-sellers .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 5000);

}
img_tag.forEach((button)=>{
    console.log(button.outerHTML)
    let img = button.getAttribute("name");
    console.log(img);
    button.addEventListener('click',()=>{
        let title = encodeURIComponent(img);
        window.location.href = `../content/product.html?title=${title}`;
    })
    
})

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})

//creating the search functions
let search_bar = document.getElementById("search-bar");
let search_btn = document.getElementById("search-btn");

search_btn.addEventListener('click',(event)=>{
    event.preventDefault()

    search_item_value = search_bar.value;
    const search_items = encodeURIComponent(search_item_value);
    window.location.href = `content/search.html?search=${search_items}`;
})

// Creating functions adding items to the product cardss

document.addEventListener("DOMContentLoaded", function() {


    function gatherCartData() {
        const cartItems = document.querySelectorAll(".cart-container table tbody tr");
        cartItems.forEach(item => {
            const title = item.querySelector(".title").textContent;
            const quantity = parseInt(item.querySelector(".quantity-input").value);
            productDetails[title] = quantity;
        });
    }

    fetch("json/content.json").then(response => response.json())
    .then(data => {

        //creating a dictionary to store the data that's been chosen to add to cart
        let product_count = {};
        const template = document.getElementById("data-content").content;
        const product_containter = document.querySelector(".pro-container");

        for (const [title, product] of Object.entries(data)) {

            const clone = template.cloneNode(true);
            const card = clone.querySelector('.product'); 
            const image = card.querySelectorAll('.image img');
    
            const description_type = card.querySelector(".description #type");
            const description_h5 = card.querySelector(".description h5");
            const description_h6 = card.querySelector(".description h6");
            const description_h4 = card.querySelector(".description #amount");

            // updating the elements with data
            image[0].src = product.img;
            image[0].alt = title;
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

        const buy_now_btn = document.querySelectorAll(".buy-btn");
            console.log(buy_now_btn)
        

            buy_now_btn.forEach(button =>{
            button.addEventListener("click",function(event){
                const container = this.closest(".product")
                const price_tag = container.querySelector("#amount");
                const title = container.querySelector("h5").textContent;
                productDetails[title] = 1;

                const price = encodeURIComponent(parseInt(price_tag.textContent));
                const product_object = encodeURIComponent(JSON.stringify(productDetails));
                window.location.href =`../content/checkout.html?price=${price}&object=${product_object}`;

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

                //updating the product count
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
            window.location.href = `content/cart.html?cartData=${product_data}`;
        })
    })
    .catch(error => console.error('Error fetching the JSON data: ', error));
});
