let slider = document.querySelector('.Top-sellers .list');
let items = document.querySelectorAll('.Top-sellers .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.Top-sellers .dots li');
const product_template = document.querySelector("[data-content]"); 


//Creating the functions for image slider in top sellers
let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 5000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.Top-sellers .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 5000);

}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})

// Creating functions adding items

document.addEventListener("DOMContentLoaded", function() {
    fetch("json/content.json").then(response => response.json())
    .then(data => {
        const template = document.getElementById("data-content").content;
        const product_containter = document.querySelector(".pro-container");

        for (const [title, product] of Object.entries(data)) {
            const clone = template.cloneNode(true);
            const card = clone.querySelector('.product'); 
            const image = card.querySelectorAll('.image img');
            const description_type = card.querySelector(".description #type");
            const description_h5 = card.querySelector(".description h5");
            const description_h6 = card.querySelector(".description h6");
            const description_h4 = card.querySelector(".description h4");

            // updating the elements with data
            image[0].src = product.img;
            image[0].alt = title;
            image[1].src = product.img2;
            image[1].alt = title;
            description_type.textContent = product.type;
            description_h5.textContent = title;
            description_h6.textContent = product.author;
            description_h4.textContent = product.price;

            product_containter.appendChild(clone); 
        }

        const cart_buttons = document.querySelectorAll(".cart #cart-anchor");
        
        cart_buttons.forEach(button => {
            button.addEventListener("click", function(event) {

                console.log("Working started");
                console.log(cart_buttons);

                const purchase_container = this.closest(".product").querySelector("#purchase");
                const add_item_text = purchase_container.querySelector("p");
                const item_number = add_item_text.querySelector("#number");

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
    })
    .catch(error => console.error('Error fetching the JSON data: ', error));
});
