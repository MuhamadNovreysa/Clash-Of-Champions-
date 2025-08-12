document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const navbarToggle = document.getElementById("navbar-toggle")
  const navbarMenu = document.getElementById("navbar-menu")

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("active")
    })
  }

  // Smooth scrolling for navigation links (only for sambutan and sejarah)
  const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navbarMenu.classList.contains("active")) {
          navbarMenu.classList.remove("active")
        }
      }
    })
  })

  // Active navigation highlighting for 2 sections only
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("#sambutan, #sejarah")
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]')

    let current = "sambutan" // Default to sambutan

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120
      const sectionHeight = section.offsetHeight

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })

  // Enhanced intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe timeline items with staggered animation
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`
    observer.observe(item)
  })

  // Observe stats items with staggered animation
  const statItems = document.querySelectorAll(".stat-item")
  statItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`
    observer.observe(item)
  })

  // Animate numbers in stats
  const animateNumbers = () => {
    const statNumbers = document.querySelectorAll(".stat-number")

    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.textContent.replace(/\D/g, ""))
      const suffix = stat.textContent.replace(/\d/g, "")
      let current = 0
      const increment = target / 50

      const updateNumber = () => {
        if (current < target) {
          current += increment
          stat.textContent = Math.floor(current) + suffix
          requestAnimationFrame(updateNumber)
        } else {
          stat.textContent = target + suffix
        }
      }

      // Start animation when stat becomes visible
      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateNumber()
            statObserver.unobserve(entry.target)
          }
        })
      })

      statObserver.observe(stat.parentElement)
    })
  }

  // Initialize number animations
  animateNumbers()

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
      navbarMenu.classList.remove("active")
    }
  })
})
