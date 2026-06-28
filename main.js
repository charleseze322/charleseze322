// ============ TYPEWRITER EFFECT ============
const typewriterElement = document.getElementById('typewriter');
const words = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 1000;

function typeWriter() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 100;
      setTimeout(typeWriter, 200);
      return;
    }

    setTimeout(typeWriter, deletingSpeed);
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeWriter, pauseTime);
      return;
    }

    setTimeout(typeWriter, typingSpeed);
  }
}

// Start typewriter effect when page loads
document.addEventListener('DOMContentLoaded', typeWriter);

// ============ SMOOTH SCROLLING ============
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Smooth scroll for all navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    scrollToSection(targetId);
  });
});

// ============ FORM HANDLING ============
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    alert('Thank you! Your message has been sent successfully.');

    // Reset form
    contactForm.reset();
  });
}

// ============ AI BUTTON FUNCTIONALITY ============
const aiButton = document.getElementById('aiButton');

if (aiButton) {
  aiButton.addEventListener('click', () => {
    // You can add functionality here like opening a chat or modal
    console.log('AI Assistant clicked');
    alert('AI Assistant feature coming soon!');
  });
}

// ============ ACTIVE NAV LINK ON SCROLL ============
window.addEventListener('scroll', () => {
  let current = '';

  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// ============ LAZY LOADING IMAGES ============
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.onload = () => {
          img.style.transition = 'opacity 0.3s ease-in';
          img.style.opacity = '1';
        };
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============ SCROLL TO TOP BUTTON ============
const scrollTopButton = document.createElement('button');
scrollTopButton.id = 'scrollTop';
scrollTopButton.innerHTML = '↑';
scrollTopButton.style.cssText = `
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 45px;
  height: 45px;
  background-color: #FF8539;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  font-size: 20px;
  z-index: 50;
  transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollTopButton.addEventListener('mouseover', () => {
  scrollTopButton.style.transform = 'scale(1.1)';
  scrollTopButton.style.boxShadow = '0 6px 15px rgba(255, 133, 57, 0.3)';
});

scrollTopButton.addEventListener('mouseout', () => {
  scrollTopButton.style.transform = 'scale(1)';
  scrollTopButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
});

// ============ ANIMATION ON SCROLL ============
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.6s ease-in forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe service cards and gallery items
document.querySelectorAll('.service-card, .gallery-item, .skill-badge').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Define fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ============ CONSOLE GREETING ============
console.log('%cWelcome to Webbi Portfolio!', 'color: #FF8539; font-size: 20px; font-weight: bold;');
console.log('%cLet\'s build something amazing together.', 'color: #0a9b98; font-size: 14px;');
