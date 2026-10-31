
// Open and close mobile menu

document.querySelector("#menu-open-button").addEventListener("click", () => {
    document.body.classList.add("show-mobile-menu");
});

document.querySelector("#menu-close-button").addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
});


// Testimonial carousel

const testimonialList = document.querySelector(".testimonial-list");
const testimonialItems = document.querySelectorAll(".testimonial-item");

const nextButton = document.querySelector(".testimonial-arrow.next");
const prevButton = document.querySelector(".testimonial-arrow.prev");

const paginationDots = document.querySelectorAll(".pagination-dot");

let currentIndex = 0;


// Number of visible testimonials

function getVisibleItems() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}


// Calculate maximum position

function getMaxIndex() {
    return Math.max(0, testimonialItems.length - getVisibleItems());
}


// Update active pagination dot

function updateDots() {
    paginationDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}


// Slide testimonials

function slideTestimonials() {
    if (testimonialItems.length === 0) return;

    const item = testimonialItems[0];

    const gap = parseFloat(getComputedStyle(testimonialList).gap) || 0;
    const itemWidth = item.getBoundingClientRect().width;

    testimonialList.style.transform =
        `translateX(-${currentIndex * (itemWidth + gap)}px)`;

    updateDots();
}


// Next button

nextButton.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex > getMaxIndex()) {
        currentIndex = 0;
    }

    slideTestimonials();
});


// Previous button

prevButton.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = getMaxIndex();
    }

    slideTestimonials();
});


// Pagination dot click

paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        if (index > getMaxIndex()) return;

        currentIndex = index;
        slideTestimonials();
    });
});


// Handle screen resizing

window.addEventListener("resize", () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    slideTestimonials();
});


// Initial setup

slideTestimonials();
// Touch swipe functionality

let touchStartX = 0;
let touchEndX = 0;

const sliderContainer = document.querySelector(".slider-container");

if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;

    // Minimum swipe distance
    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance > 0) {
        // Swipe left = next testimonial
        currentIndex++;

        if (currentIndex > getMaxIndex()) {
            currentIndex = 0;
        }
    } else {
        // Swipe right = previous testimonial
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = getMaxIndex();
        }
    }

    slideTestimonials();
}


// Close mobile menu when clicking any navigation link

const navLinks = document.querySelectorAll(".nav-menu .nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });
});
