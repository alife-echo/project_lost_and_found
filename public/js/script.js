let show = true;
const menuToggle = document.querySelector('.menu-toggle');
const one = document.querySelector('.menu-toggle .one');
const two = document.querySelector('.menu-toggle .two');
const three = document.querySelector('.menu-toggle .three');
const linksHidden = document.querySelector('.links-hidden');

menuToggle.addEventListener('click', () => {
    if (show) {
        one.style.transform = 'rotate(45deg) translate(7px, 7px)';
        two.style.opacity = 0;
        three.style.transform = 'rotate(-45deg) translate(8px, -10px)';
        linksHidden.style.display = 'block';
        show = false;
    } else {
        one.style.transform = 'none';
        two.style.opacity = 1;
        three.style.transform = 'none';
        linksHidden.style.display = 'none';
        show = true;
    }
});