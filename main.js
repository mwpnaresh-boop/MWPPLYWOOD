const slider = document.querySelector(".slider-container");
const totalSlides = document.querySelectorAll(".slide").length;
let index = 0;

setInterval(() => {
    index++;
    if (index >= totalSlides) index = 0;

    // Direct scroll karega, jo CSS ki wajah se smooth hoga
    slider.scrollTo({
        left: slider.offsetWidth * index,
        behavior: 'smooth'
    });
}, 4000);
/* ================= HAMBURGER ================= */
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});
/* ===== SUB MENU MOBILE TOGGLE ===== */
document.querySelectorAll(".sub-title").forEach(title => {
  title.addEventListener("click", () => {
    title.nextElementSibling.classList.toggle("active");
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.2 // Jab 20% section dikhega tab trigger hoga
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll(".scroll-up");
    
    scrollElements.forEach((el) => {
        // Initial State set kar rahe hain JS se
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });
});
/* ================= INTERIOR GALLERY SCROLL ================= */

const gallerySection = document.querySelector('.interior-gallery');

const galleryObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      gallerySection.classList.add('show');
    }
  });
},{ threshold:0.3 });

galleryObserver.observe(gallerySection);

