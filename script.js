/* =========================
   MOBILE NAV TOGGLE
========================= */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
if(navToggle && navLinks){
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
  });
}

/* =========================
   DROPDOWNS (DESKTOP + MOBILE)
========================= */
document.querySelectorAll(".dropdown").forEach(dropdown => {
  const menu = dropdown.querySelector(".dropdown-menu");

  // Desktop hover
  dropdown.addEventListener("mouseenter", () => {
    if(window.innerWidth > 768 && menu) menu.style.display = "block";
  });
  dropdown.addEventListener("mouseleave", () => {
    if(window.innerWidth > 768 && menu) menu.style.display = "none";
  });

  // Mobile click for main dropdown
  const dropdownBtn = dropdown.querySelector(".dropdown-btn");
  if(dropdownBtn){
    dropdownBtn.addEventListener("click", e => {
      if(window.innerWidth <= 768 && menu){
        e.preventDefault();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      }
    });
  }

  // Submenu buttons (mobile)
  dropdown.querySelectorAll(".submenu-btn").forEach(btn => {
    const submenu = btn.nextElementSibling;
    btn.addEventListener("click", e => {
      if(window.innerWidth <= 768 && submenu){
        e.preventDefault();
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
      }
    });
  });
});

/* =========================
   DARK MODE TOGGLE
========================= */
const darkModeBtn = document.getElementById("dark-mode-toggle");
if(darkModeBtn){
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}

/* =========================
   HERO SLIDESHOW
========================= */
const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;
function showSlide(index){
  slides.forEach((slide,i)=>{
    slide.style.opacity = (i === index) ? '1' : '0';
  });
}
if(slides.length){
  showSlide(currentSlide);
  setInterval(()=>{
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  },5000);
}

/* =========================
   SCROLL REVEAL
========================= */
const reveals = document.querySelectorAll(".fade-in-up");
function revealOnScroll() {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 120) el.classList.add("active");
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   STATS COUNTER
========================= */
document.querySelectorAll(".counter").forEach(counter => {
  counter.innerText = "0";
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 200;
    if(current < target){
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 20);
    } else counter.innerText = target;
  };
  updateCounter();
});

/* =========================
   TESTIMONIALS
========================= */
const testimonials = document.querySelectorAll(".testimonial");
let testimonialIndex = 0;
function showTestimonial(index){
  testimonials.forEach((t,i)=> t.classList.toggle("active", i===index));
}
if(testimonials.length){
  showTestimonial(testimonialIndex);
  setInterval(()=>{
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  },5000);
}

/* =========================
   FOOTER YEAR
========================= */
const yearSpan = document.getElementById("year");
if(yearSpan) yearSpan.textContent = new Date().getFullYear();

/* =========================
   GALLERY LIGHTBOX
========================= */
const galleryImages = document.querySelectorAll(".gallery-item");
if(galleryImages.length){
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  Object.assign(lightbox.style,{
    position:"fixed",
    inset:"0",
    background:"rgba(0,0,0,0.9)",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    opacity:"0",
    visibility:"hidden",
    transition:"0.3s",
    zIndex:"10000"
  });

  const img = document.createElement("img");
  img.style.maxWidth="90%";
  img.style.maxHeight="90%";
  img.style.borderRadius="10px";
  lightbox.appendChild(img);

  galleryImages.forEach(image=>{
    image.addEventListener("click",()=>{
      img.src=image.src;
      lightbox.style.opacity="1";
      lightbox.style.visibility="visible";
    });
  });

  lightbox.addEventListener("click", e=>{
    if(e.target !== img){
      lightbox.style.opacity="0";
      setTimeout(()=>lightbox.style.visibility="hidden",300);
    }
  });
}
