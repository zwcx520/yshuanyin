document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({
      duration: 760,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }

  if (window.Swiper) {
    document.querySelectorAll(".artist-swiper").forEach((item) => {
      new Swiper(item, {
        effect: "coverflow",
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: -34,
        loop: true,
        speed: 820,
        grabCursor: true,
        autoplay: {
          delay: 3600,
          disableOnInteraction: false
        },
        coverflowEffect: {
          rotate: 0,
          stretch: -72,
          depth: 190,
          modifier: 1.05,
          scale: 0.86,
          slideShadows: false
        },
        navigation: {
          nextEl: ".artist-next",
          prevEl: ".artist-prev"
        },
        pagination: {
          el: item.querySelector(".swiper-pagination"),
          clickable: true
        },
        breakpoints: {
          768: {
            spaceBetween: -46,
            coverflowEffect: {
              rotate: 0,
              stretch: -96,
              depth: 220,
              modifier: 1.08,
              scale: 0.84,
              slideShadows: false
            }
          },
          1200: {
            spaceBetween: -56,
            coverflowEffect: {
              rotate: 0,
              stretch: -124,
              depth: 260,
              modifier: 1.1,
              scale: 0.82,
              slideShadows: false
            }
          }
        }
      });
    });
  }

  const topButton = document.querySelector(".back-to-top");
  if (topButton) {
    window.addEventListener("scroll", () => {
      topButton.classList.toggle("show", window.scrollY > 620);
    });

    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".filter-group");
      const target = button.dataset.filter;

      group.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      document.querySelectorAll("[data-category]").forEach((card) => {
        const visible = target === "all" || card.dataset.category === target;
        card.classList.toggle("d-none", !visible);
      });
    });
  });
});

