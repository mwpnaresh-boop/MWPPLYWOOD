/* ================= SLIDER ================= */
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;
let index = 0;

setInterval(() => {
  index++;
  if(index >= totalSlides) index = 0;
  slides.style.transform = `translateX(-${index * 100}%)`;
}, 4000);

/* ================= TOUCH SWIPE ================= */
let startX = 0;

slides.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if(diff > 50) index++;
  else if(diff < -50) index--;

  if(index < 0) index = 0;
  if(index >= totalSlides) index = totalSlides - 1;

  slides.style.transform = `translateX(-${index * 100}%)`;
});

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
document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".scroll-up");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
    };

    const hideScrollElement = (element) => {
        // Sirf Desktop par hide karega, mobile par dikhta rahega
        if (window.innerWidth > 768) {
            element.style.opacity = "0";
            element.style.transform = "translateY(40px)";
        } else {
            element.style.opacity = "1";
            element.style.transform = "none";
        }
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    // Initial check
    scrollElements.forEach(hideScrollElement);
    
    window.addEventListener("scroll", () => { 
        handleScrollAnimation();
    });
});
