document.addEventListener('DOMContentLoaded', (event) => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const close = document.getElementsByClassName('close')[0];
    const font_button = document.querySelectorAll('.font-button')
    const text_bg_color = document.querySelectorAll('.text-bg-color');
    const overlays = document.querySelectorAll('.overlay');


    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
        
            if (event.target.classList.contains('font-button')) {
                const fontName = event.target.dataset.font;
                
              
                const description = overlay.querySelector('.description');         
                // Remove previous font classes
                description.classList.remove('Georgia', 'Times-New-Roman', 'Spartan');
                
                // Add new font class based on data-font attribute
                description.classList.add(fontName);
            }
        });

        // Background color buttons event listener
        overlay.addEventListener('click', function(event) {
            // Check if the clicked element is a text-bg-color button
            if (event.target.classList.contains('text-bg-color')) {
                const colorName = event.target.dataset.color;
                
                const description = overlay.querySelector('.description');
                
                // Remove previous background color classes
                description.classList.remove('red', 'green', 'blue', 'black');
                
                // Add new background color class based on data-color attribute
                description.classList.add(colorName);
            }
        });
    });

    document.querySelectorAll('.gallery_item img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = img.getAttribute('data-description');
        });
    });

    close.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });
});


