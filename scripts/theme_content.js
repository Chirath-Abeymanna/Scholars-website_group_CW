var theme = document.getElementById("theme");
let logo_img = document.querySelector("header img")
console.log(logo_img);

// Function to toggle the theme
theme.onclick = function () {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light-theme');
        theme.src = "../img/1sun.png";
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        theme.src = "../img/1moon.png";
    }
}

// Function to check for previously selected theme and apply it
window.onload = function () {
    var storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark-theme') {
        document.body.classList.add('dark-theme');
        theme.src = "../img/1moon.png";
    } else {
        localStorage.setItem('theme', 'light-theme');
        theme.src = "../img/1sun.png";
    }
}

logo_img.addEventListener('click',()=>{

    window.scrollTo({
        top:0,
        behavior : 'smooth'
    })
})