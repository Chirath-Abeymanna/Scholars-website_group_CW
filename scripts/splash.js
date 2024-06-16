document.addEventListener('DOMContentLoaded', function() {
    let content = document.querySelector('.content');
    let logo = document.querySelector('.logo');
    let mission_topic = document.querySelector('.topic');
    let mission = document.querySelector('.mission');
    let team = document.querySelector('.team');
    let profile = document.querySelector('.profile');
    let profile_details = document.querySelectorAll('.profile_details'); 
    

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');           
            } else {
                entry.target.classList.add('fade');
            }
        });
    }, observerOptions);

    observer.observe(logo);

    setTimeout(() => {
        observer.observe(mission_topic); 
    }, 500);

    setTimeout(() => {
        observer.observe(mission);
    }, 600);
    setTimeout(() => {
        observer.observe(team); 
    }, 700);

    setTimeout(() => {
        observer.observe(profile);
    }, 800);
    
    
    profile_details.forEach(item => {
        setTimeout(() => {
            observer.observe(item);
        }, 1100); 
    });

    setTimeout(() => {
        document.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active');
            element.classList.add('fade-out');
        });

        
        setTimeout(()=>{
            content.style.top = '-100vh';
         },500);
    }, 4000);

    setTimeout(()=>{
        window.location.href = "../Home.html";
    },4800);

});
