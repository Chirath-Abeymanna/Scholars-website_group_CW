document.addEventListener('DOMContentLoaded', (event) => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const close = document.getElementsByClassName('close')[0];

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