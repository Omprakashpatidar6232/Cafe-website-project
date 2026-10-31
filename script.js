
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 1. MOBILE MENU
    // =========================

    const menuOpenButton = document.querySelector("#menu-open-button");
    const menuCloseButton = document.querySelector("#menu-close-button");

    if (menuOpenButton && menuCloseButton) {

        menuOpenButton.addEventListener("click", () => {
            document.body.classList.add("show-mobile-menu");
        });

        menuCloseButton.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });

    }


    // =========================
    // 2. TESTIMONIAL CAROUSEL
    // =========================

    const testimonialList = document.querySelector(".testimonial-list");
    const testimonialItems = document.querySelectorAll(".testimonial-item");

    const nextButton = document.querySelector(".testimonial-arrow.next");
    const prevButton = document.querySelector(".testimonial-arrow.prev");

    const paginationDots = document.querySelectorAll(".pagination-dot");

    const sliderContainer = document.querySelector(".slider-container");

    let currentIndex = 0;


    // Check whether carousel elements exist
    if (!testimonialList || testimonialItems.length === 0) {
        return;
    }


    // Number of visible testimonials
    function getVisibleItems() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }


    // Maximum possible slide index
    function getMaxIndex() {
        return Math.max(
            0,
            testimonialItems.length - getVisibleItems()
        );
    }


    // Update pagination dots
    function updateDots() {
        paginationDots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }


    // Move carousel
    function slideTestimonials() {

        const itemWidth = testimonialItems[0].getBoundingClientRect().width;

        const gap = parseFloat(
            getComputedStyle(testimonialList).columnGap
        ) || 0;

        testimonialList.style.transform =
            `translateX(-${currentIndex * (itemWidth + gap)}px)`;

        updateDots();
    }


    // Next button
    if (nextButton) {
        nextButton.addEventListener("click", () => {

            if (currentIndex >= getMaxIndex()) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }

            slideTestimonials();
        });
    }


    // Previous button
    if (prevButton) {
        prevButton.addEventListener("click", () => {

            if (currentIndex <= 0) {
                currentIndex = getMaxIndex();
            } else {
                currentIndex--;
            }

            slideTestimonials();
        });
    }


    // Pagination dots
    paginationDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {

            if (index > getMaxIndex()) return;

            currentIndex = index;
            slideTestimonials();
        });
    });


    // =========================
    // 3. TOUCH SWIPE
    // =========================

    let touchStartX = 0;

    if (sliderContainer) {

        sliderContainer.addEventListener("touchstart", (event) => {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });


        sliderContainer.addEventListener("touchend", (event) => {

            const touchEndX = event.changedTouches[0].screenX;
            const swipeDistance = touchStartX - touchEndX;

            // Ignore small movements
            if (Math.abs(swipeDistance) < 50) return;

            if (swipeDistance > 0) {
                // Swipe left: next
                currentIndex =
                    currentIndex >= getMaxIndex()
                        ? 0
                        : currentIndex + 1;

            } else {
                // Swipe right: previous
                currentIndex =
                    currentIndex <= 0
                        ? getMaxIndex()
                        : currentIndex - 1;
            }

            slideTestimonials();

        }, { passive: true });

    }


    // =========================
    // 4. WINDOW RESIZE
    // =========================

    window.addEventListener("resize", () => {

        currentIndex = Math.min(currentIndex, getMaxIndex());

        slideTestimonials();

    });


    // Initial setup
    slideTestimonials();

});
