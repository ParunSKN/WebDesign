// Common JavaScript functionality for all pages

// Hamburger menu functionality
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const hamburgerDropdown = document.getElementById('hamburgerDropdown');
  
  if (hamburgerBtn && hamburgerDropdown) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      hamburgerDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !hamburgerDropdown.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        hamburgerDropdown.classList.remove('active');
      }
    });
    
    // Close dropdown when a link is clicked
    hamburgerDropdown.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        hamburgerBtn.classList.remove('active');
        hamburgerDropdown.classList.remove('active');
      }
    });
  }
}

// Custom cursor functionality
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function updateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      followerX += (mouseX - followerX) * 0.05;
      followerY += (mouseY - followerY) * 0.05;
      
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      
      cursorFollower.style.left = followerX - 4 + 'px';
      cursorFollower.style.top = followerY - 4 + 'px';
      
      requestAnimationFrame(updateCursor);
    }
    updateCursor();
  }
}

// Hover effects
function initHoverEffects() {
  // Common hover elements selector - pages can add specific selectors
  const commonSelectors = 'a, button, .hamburger-btn, .nav-item';
  const pageSpecificSelectors = getPageSpecificHoverSelectors();
  const allSelectors = pageSpecificSelectors ? `${commonSelectors}, ${pageSpecificSelectors}` : commonSelectors;
  
  const hoverElements = document.querySelectorAll(allSelectors);
  const cursor = document.querySelector('.cursor');
  
  if (cursor) {
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  }
}

// Page-specific hover selectors (to be overridden by each page)
function getPageSpecificHoverSelectors() {
  // Default implementation - pages can override this
  return '.overlap-group-wrapper, .ellipse, .image-2';
}

// Parallax effect for floating elements
function initParallaxEffect() {
  document.addEventListener('mousemove', (e) => {
    const floatingElements = document.querySelectorAll('.floating-element');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.5;
      const xMove = (x - 0.5) * speed * 50;
      const yMove = (y - 0.5) * speed * 50;
      
      element.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
  });
}

// Initialize all common functionality
function initCommonFeatures() {
  initHamburgerMenu();
  initCustomCursor();
  initHoverEffects();
  initParallaxEffect();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommonFeatures);
} else {
  initCommonFeatures();
}