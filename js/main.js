document.addEventListener("DOMContentLoaded", () => {
  const scrollRoot = document.querySelector(".site-shell");
  const getScrollTop = () => (scrollRoot ? scrollRoot.scrollTop : window.scrollY);
  const addScrollListener = (handler) => {
    if (scrollRoot) {
      scrollRoot.addEventListener("scroll", handler, { passive: true });
    } else {
      window.addEventListener("scroll", handler, { passive: true });
    }
  };

  const navbar = document.querySelector(".navbar");
  const syncNavbarState = () => {
    if (navbar) {
      navbar.classList.toggle("navbar-scrolled", getScrollTop() > 24);
    }
  };

  syncNavbarState();
  addScrollListener(syncNavbarState);

  if (window.AOS) {
    AOS.init({
      duration: 760,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });

    if (scrollRoot && "IntersectionObserver" in window) {
      const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
            aosObserver.unobserve(entry.target);
          }
        });
      }, {
        root: scrollRoot,
        threshold: 0.18
      });

      document.querySelectorAll("[data-aos]").forEach((item) => aosObserver.observe(item));
    }
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
    addScrollListener(() => {
      topButton.classList.toggle("show", getScrollTop() > 620);
    });

    topButton.addEventListener("click", () => {
      if (scrollRoot) {
        scrollRoot.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
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

