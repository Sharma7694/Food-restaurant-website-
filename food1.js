// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ===== MOBILE NAVIGATION TOGGLE =====
  const mobileToggle = document.getElementById("click");
  const navbar = document.getElementById("navbar");
  const menu = document.getElementById("menu");

  // Handle mobile menu toggle
  if (mobileToggle && menu) {
    mobileToggle.addEventListener("change", function () {
      if (this.checked) {
        menu.style.display = "flex";
      } else {
        menu.style.display = "none";
      }
    });

    // Close mobile menu when clicking on menu items
    const menuLinks = document.querySelectorAll("#menu a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.checked = false;
        menu.style.display = "none";
      });
    });
  }

  // ===== SMOOTH SCROLLING FOR NAVIGATION =====
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== NAVBAR SCROLL EFFECT =====
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.style.backgroundColor = "rgba(5, 5, 5, 0.98)";
      navbar.style.backdropFilter = "blur(15px)";
    } else {
      navbar.style.backgroundColor = "rgba(5, 5, 5, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
    }
  });

  // ===== HERO SLIDESHOW =====
  const slides = document.querySelectorAll(".img-bg-slide");
  let currentSlide = 0;

  function nextSlide() {
    if (slides.length > 0) {
      slides[currentSlide].style.opacity = "0";
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].style.opacity = "1";
    }
  }

  // Initialize first slide
  if (slides.length > 0) {
    slides[0].style.opacity = "1";
    setInterval(nextSlide, 4000);
  }

  // ===== MENU FILTERING =====
  const menuFilterLinks = document.querySelectorAll("#menu2 a");
  const menuCards = document.querySelectorAll(".card_container");

  menuFilterLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      menuFilterLinks.forEach((l) => l.classList.remove("active"));
      // Add active class to clicked link
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Show/hide cards based on category
      menuCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  });

  // ===== ORDER BUTTONS FUNCTIONALITY =====
  const orderButtons = document.querySelectorAll(".card button");
  orderButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Add to cart animation
      const originalBg = this.style.backgroundColor;
      const originalText = this.querySelector("a").textContent;

      this.style.backgroundColor = "#28a745";
      this.querySelector("a").textContent = "Added!";
      this.querySelector("a").style.color = "white";

      setTimeout(() => {
        this.style.backgroundColor = "";
        this.querySelector("a").textContent = originalText;
        this.querySelector("a").style.color = "";
      }, 1500);

      showNotification("Item added to cart!", "success");
    });
  });

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.querySelector(".contact_form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const fullName = formData.get("fullName");
      const email = formData.get("email");
      const mobile = formData.get("mobile");
      const message = formData.get("msg");

      // Basic validation
      if (!fullName || !email || !mobile || !message) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate form submission
      const submitBtn = document.getElementById("con_btn");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Message sent successfully! We will get back to you soon.",
          "success"
        );
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // ===== FAQ ACCORDION =====
  const faqDetails = document.querySelectorAll(".faq_item");
  faqDetails.forEach((detail) => {
    const summary = detail.querySelector("summary");
    if (summary) {
      summary.addEventListener("click", () => {
        // Close other open details
        faqDetails.forEach((otherDetail) => {
          if (otherDetail !== detail && otherDetail.open) {
            otherDetail.open = false;
          }
        });
      });
    }
  });

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for scroll animation
  const animateElements = document.querySelectorAll(
    ".service_card, .card_container"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // ===== UTILITY FUNCTIONS =====
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      ${
        type === "success"
          ? "background-color: #28a745;"
          : "background-color: #dc3545;"
      }
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  // ===== RESPONSIVE MENU HANDLING =====
  function handleResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth > 992) {
      if (menu) {
        menu.style.display = "flex";
      }
      if (mobileToggle) {
        mobileToggle.checked = false;
      }
    } else {
      if (menu && mobileToggle && !mobileToggle.checked) {
        menu.style.display = "none";
      }
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize(); // Initial call

  // ===== BACK TO TOP BUTTON =====
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  backToTopBtn.className = "back-to-top";
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ff4d4d;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 18px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
  `;

  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Show/hide back to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
    }
  });

  console.log("Restaurant website JavaScript loaded successfully!");
});
