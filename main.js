<script>
// 1. Loader Logic (Pehle jaisa hi)
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 3000); // 3000ms = 3 seconds
});
// 2. Counter Logic (Pehle jaisa hi)
const counters = document.querySelectorAll('.counter');
const speed = 100;
const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + (target > 100 ? "+" : "");
            }
        };
        updateCount();
    });
};

// 3. Scroll Observer (Fix for 2-second delay)
const observerOptions = {
  threshold: 0,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Scroll-up animation
    if (entry.target.classList.contains('scroll-up')) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }

    // Counter section
    if (entry.target.classList.contains('adve-section')) {
      startCounters();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ❌ product-card yahan se hata diya
document
  .querySelectorAll('.scroll-up, .adve-section')
  .forEach(el => observer.observe(el));

</script>
<script>
const slides = document.querySelector('#slides');
const slider = document.querySelector('.slider');
const slideCount = slides.children.length;

let currentIndex = 0;
let slideInterval;

// NEXT slide
function showNextSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  updateSlide();
}

// PREVIOUS slide
function showPrevSlide() {
  currentIndex = (currentIndex - 1 + slideCount) % slideCount;
  updateSlide();
}

// Apply transform
function updateSlide() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto slide
function startInterval() {
  slideInterval = setInterval(showNextSlide, 3000);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

// Click control (left / right)
slider.addEventListener('click', (e) => {
  const sliderWidth = slider.clientWidth;

  if (e.clientX < sliderWidth / 2) {
    showPrevSlide();
  } else {
    showNextSlide();
  }

  resetInterval();
});

// Start slider
startInterval();
</script>
<script>
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      const headerOffset = 110; // header height
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});
</script>
<script>
window.addEventListener("load", () => {

  // ✅ Agar loader pehle hi dikh chuka hai
  if (sessionStorage.getItem("loaderShown")) {
    document.body.classList.add("loaded");
    return;
  }

  // ❌ Pehli baar load hone par loader dikhega
  setTimeout(() => {
    document.body.classList.add("loaded");

    // 🔐 Flag set kar do (session ke liye)
    sessionStorage.setItem("loaderShown", "true");
  }, 3000); // loader duration (3 sec – aap change kar sakte ho)

});
</script>
<script>
// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});
</script>
  <script>
  // Mobile dropdown toggle
document.querySelectorAll('.dropdown > a').forEach(drop => {
  drop.addEventListener('click', function(e) {
    const screenWidth = window.innerWidth;
    if(screenWidth <= 900){ // mobile only
      e.preventDefault(); // link ko follow na kare
      const parent = this.parentElement;
      parent.classList.toggle('active'); // CSS me .active > .dropdown-menu { display:block }
    }
  });
});

// Mobile sub-dropdown toggle
document.querySelectorAll('.dropdown-sub > a').forEach(subDrop => {
  subDrop.addEventListener('click', function(e){
    const screenWidth = window.innerWidth;
    if(screenWidth <= 900){
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle('active'); // CSS me .active > .dropdown-submenu { display:block }
    }
  });
});
</script>
<script>
/* =====================================
   SAFE SMOOTH SCROLL (MOBILE FRIENDLY)
===================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function () {

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const headerOffset = 110;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});
</script>
  <script>
/* ===============================
   MOBILE NAV – FINAL FIX
================================ */

const nav = document.querySelector('nav');
const hamburger = document.getElementById('hamburger');

// Hamburger toggle
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// MAIN dropdown (Our Product Range)
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', function (e) {

    if (window.innerWidth > 900) return;

    e.preventDefault(); // page scroll rokna
    this.parentElement.classList.toggle('active');

  });
});

// SUB dropdown (Plywood, Veneers)
document.querySelectorAll('.dropdown-sub > a').forEach(link => {
  link.addEventListener('click', function (e) {

    if (window.innerWidth > 900) return;

    e.preventDefault();
    this.parentElement.classList.toggle('active');

  });
});

// REAL LINKS – scroll + close menu
document.querySelectorAll('nav a[href^="#"], nav a[href$=".html"]').forEach(link => {
  link.addEventListener('click', function (e) {

    if (window.innerWidth > 900) return;

    const href = this.getAttribute('href');

    // Dropdown headers ko ignore karo
    if (this.closest('.dropdown') && href === '#products') return;
    if (this.closest('.dropdown-sub') && href === '#') return;

    // ✅ MENU CLOSE
    nav.classList.remove('active');
    document.querySelectorAll('.dropdown, .dropdown-sub')
      .forEach(el => el.classList.remove('active'));

    // ✅ SMOOTH SCROLL
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const headerOffset = 110;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

  });
});
</script>
