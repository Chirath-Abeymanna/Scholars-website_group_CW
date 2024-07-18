
document.addEventListener("DOMContentLoaded",function(){

    const navigation = document.querySelector(".main-buttons");
    const sliders = document.querySelectorAll(".slide-in")

    const navigationHeight = navigation.offsetHeight;
    console.log(navigationHeight);

    document.documentElement.style.setProperty(
        "--scroll-padding",navigationHeight -150+"px"
    );
    
    const appearOptions = {
        threshold:0,
        rootMargin:"0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver
    (function(entries,appearOnScroll){
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                entry.target.classList.add("appear")
            }
            else{
                entry.target.classList.remove("appear");
            }
        });
    },appearOptions);
    
    sliders.forEach(slider =>{

        appearOnScroll.observe(slider);
    })
})

