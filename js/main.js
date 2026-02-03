document.addEventListener('DOMContentLoaded', () => {

  function initMenu() {
    const burgerBtn = document.querySelector('.header__catalog-btn');
    const mobileMenu = document.querySelector('.menu-navigation');
    
    if (burgerBtn && mobileMenu) {
      burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        document.body.classList.toggle('no-scroll');

        if (burgerBtn.classList.contains('is-active')) {
          burgerBtn.innerHTML = '<i class="icon-nameclose"></i> Згорнути';
        } else {
          burgerBtn.innerHTML = '<i class="icon-nameproducts"></i> Продукти';
        }
      });
    }
  }

  initMenu();

  function initMobileSubmenu() {
    const menuItems = document.querySelectorAll('.mobile-menu__item');

    menuItems.forEach(item => {
      const submenu = item.querySelector('.mobile-menu__submenu');
      if (submenu) {
        const link = item.querySelector('.mobile-menu__link');
        
        if (link) {
          const arrow = document.createElement('span');
          arrow.className = 'mobile-menu__arrow';
          arrow.innerHTML = '<i class="icon-namechevron-down"></i>';
          link.appendChild(arrow);
          
          link.classList.add('has-submenu');

          link.addEventListener('click', (e) => {
            e.preventDefault();
            link.classList.toggle('is-active');
            submenu.classList.toggle('is-open'); // Toggle visibility
          });
        }
      }
    });
  }
  
  initMobileSubmenu();

  function initMobileContacts() {
    const contactsBlock = document.querySelector('.mobile-contacts');
    if (!contactsBlock) return;

    const mainPhone = contactsBlock.querySelector('.mobile-contacts__main-phone');
    const list = contactsBlock.querySelector('.mobile-contacts__list');

    if (mainPhone && list) {
      // Add arrow
      const arrow = document.createElement('span');
      arrow.className = 'mobile-menu__arrow'; // Reuse existing class for style
      arrow.innerHTML = '<i class="icon-namechevron-down"></i>';
      mainPhone.appendChild(arrow);
      
      mainPhone.classList.add('has-submenu'); // Reuse or add specific class

      // Styling needs to handle flex for 'has-submenu' or similar
      // Since specific class usage might vary, let's keep it simple
      mainPhone.style.display = 'flex';
      mainPhone.style.justifyContent = 'space-between';
      mainPhone.style.alignItems = 'center';

      mainPhone.addEventListener('click', (e) => {
        e.preventDefault();
        mainPhone.classList.toggle('is-active');
        list.classList.toggle('is-open');
      });
    }
  }
  
  initMobileContacts();

  // --- Desktop Catalog Tabs (Navigation) ---
  function initDesktopTabs() {
    // Only run if desktop structure exists
    const tabs = document.querySelectorAll('.menu-navigation__tab');
    const panels = document.querySelectorAll('.menu-navigation__panel');

    if (tabs.length === 0 || panels.length === 0) return;

    function activateTab(index) {
      // Deactivate all
      tabs.forEach(t => t.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));

      // Activate specific
      if (tabs[index]) tabs[index].classList.add('is-active');
      if (panels[index]) panels[index].classList.add('is-active');
    }

    // Default: Activate first
    activateTab(0);

    // Hover listeners
    tabs.forEach((tab, index) => {
      tab.addEventListener('mouseenter', () => {
        activateTab(index);
      });
    });
  }

  initDesktopTabs();
  
  // --- Responsive Layout Check (Hide Content if Wraps) ---
  function checkLayoutWrap() {
    const desktop = document.querySelector('.menu-navigation__desktop');
    const sidebar = document.querySelector('.menu-navigation__sidebar');
    const content = document.querySelector('.menu-navigation__content');

    if (!desktop || !sidebar || !content) return;

    // Reset override to check natural flow
    content.style.display = '';

    // Only run if desktop view is active
    if (window.getComputedStyle(desktop).display === 'none') return;

    const sidebarRect = sidebar.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    // If content top is significantly different from sidebar top, it likely wrapped
    if (Math.abs(contentRect.top - sidebarRect.top) > 50) {
       content.style.display = 'none';
    } 
  }

  // Check on load and resize
  window.addEventListener('resize', checkLayoutWrap);
  setTimeout(checkLayoutWrap, 100); // Initial check after render

  // --- Desktop Menu Arrows & Hover Logic ---
  if (window.matchMedia("(min-width: 992px)").matches) {
    const menuItems = document.querySelectorAll('.header__menu-item');

    menuItems.forEach(item => {
      const submenu = item.querySelector('.header__submenu');
      if (submenu) {
        // Add arrow if not present
        const link = item.querySelector('.header__menu-link');
        if (link && !link.querySelector('.header__menu-arrow')) {
          const arrow = document.createElement('span');
          arrow.className = 'header__menu-arrow';
          arrow.innerHTML = '<i class="icon-namechevron-down"></i>';
          link.appendChild(arrow);
          link.classList.add('has-submenu');
        }

        item.addEventListener('mouseenter', () => {
          submenu.classList.add('is-open');
          const arrow = item.querySelector('.header__menu-arrow');
          if (arrow) arrow.style.transform = 'rotate(180deg)';
        });
        
        item.addEventListener('mouseleave', () => {
          submenu.classList.remove('is-open');
          const arrow = item.querySelector('.header__menu-arrow');
          if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
      }
    });
  }

  const header = document.querySelector('.header');
  const scrollThreshold = 50;

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('header--scroll');
      } else {
        header.classList.remove('header--scroll');
      }
    });
  }

  // --- Hero Slider ---
  const heroSlider = document.querySelector('.hero__slider');
  if (heroSlider) {
    new Swiper(heroSlider, {
      loop: true,
      spaceBetween: 16,
      slidesPerView: 'auto',
      centeredSlides: true,
      navigation: {
        nextEl: '.hero__button-next',
        prevEl: '.hero__button-prev',
      },

      breakpoints: {
        1280: {
          spaceBetween: 24,
        }
      },
      // Optional: Add autoplay or effective attributes if needed
      grabCursor: true, // Shows hand cursor
      touchEventsTarget: 'container', // Allows touch events
    });
  }

  // --- Direction Video Hover (Desktop) ---
  if (window.matchMedia("(min-width: 1280px)").matches) {
    const directionItems = document.querySelectorAll('.direction__body-item');
    
    directionItems.forEach(item => {
      const videoContainer = item.querySelector('.direction__body-item-video');
      const video = videoContainer ? videoContainer.querySelector('video') : null;
      const image = item.querySelector('.direction__body-item-image');

      if (video && image) {
        video.muted = true;
        
        item.addEventListener('mouseenter', () => {
          if (video.hideTimeout) clearTimeout(video.hideTimeout);
          
          item.classList.add('is-playing');
          video.play().catch(e => console.log('Autoplay prevented:', e));
        });

        item.addEventListener('mouseleave', () => {
          item.classList.remove('is-playing');

          // Delay stopping to match CSS transition
          video.hideTimeout = setTimeout(() => {
            video.pause();
            video.load(); // Reset to poster
          }, 500); 
        });
      }
    });
  }

  // --- Results Tabs ---
  function initResultsTabs() {
    const tabs = document.querySelectorAll('.results__tab-btn');
    const contents = document.querySelectorAll('.results__content');
    const loadMoreBtn = document.querySelector('.results__load-more');

    // Configuration
    function getInitialCount() {
       return window.matchMedia("(min-width: 1280px)").matches ? 3 : 4;
    }
    
    function getLoadMoreCount() {
      // 3 items for desktop (>=1280), 2 items for smaller screens
      return window.matchMedia("(min-width: 1280px)").matches ? 3 : 2;
    }

    // Helper: Update visibility
    function updateVisibility(container, updateButton = true) {
       const items = Array.from(container.children);
       
       // If no data-visible attribute, init it
       if (!container.dataset.visibleCount) {
         container.dataset.visibleCount = getInitialCount();
       }

       const visibleCount = parseInt(container.dataset.visibleCount);
       
       items.forEach((item, index) => {
         if (index < visibleCount) {
           item.style.display = 'flex'; // Or block/grid depending on layout
         } else {
           item.style.display = 'none';
         }
       });

       // Hide "Load More" if all items visible
       // Only update button if this is the active container being updated
       if (loadMoreBtn && updateButton) {
         if (visibleCount >= items.length) {
            loadMoreBtn.style.display = 'none';
         } else {
            loadMoreBtn.style.display = 'flex';
         }
       }
    }

    // Init Logic
    if (tabs.length && contents.length) {
      // 1. Initialize items visibility for ALL containers (without touching button yet)
      contents.forEach(content => updateVisibility(content, false));
      
      // 2. Find currently visible container (or default to first) and update button for it
      const activeContent = Array.from(contents).find(c => window.getComputedStyle(c).display !== 'none') || contents[0];
      if (activeContent) {
        updateVisibility(activeContent, true);
      }

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          // Tabs toggle
          tabs.forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');

          // Content toggle
          contents.forEach(content => {
            content.style.display = 'none';
          });
          
          if (contents[index]) {
            contents[index].style.display = 'flex'; // Use block to respect CSS grid/flex defined in class
            // Update items visibility within the active tab AND update button
            updateVisibility(contents[index], true);
          }
        });
      });
    }

    // --- Load More Logic ---
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        // Find visible content container
        const activeContent = Array.from(contents).find(c => c.style.display !== 'none' && c.offsetParent !== null);
        
        if (activeContent) {
          const currentCount = parseInt(activeContent.dataset.visibleCount || 4);
          const increment = getLoadMoreCount();
          
          activeContent.dataset.visibleCount = currentCount + increment;
          updateVisibility(activeContent);
        }
      });
    }
  }

  initResultsTabs();

  // --- Equipment Show More ---
  function initEquipmentShowMore() {
    const btn = document.querySelector('.equipment-btn');
    const container = document.querySelector('.equipment .container-hidden');
    
    if (!btn || !container) return;

    btn.addEventListener('click', () => {
      container.classList.toggle('is-expanded');
      const isExpanded = container.classList.contains('is-expanded');
      
      if (isExpanded) {
        btn.innerHTML = `Згорнути <i class="icon-namechevron-down"></i>`;
        const icon = btn.querySelector('i');
        if (icon) icon.style.transition = 'transform 0.3s ease';
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        btn.innerHTML = `Розгорнути все <i class="icon-namechevron-down"></i>`;
        const icon = btn.querySelector('i');
        if (icon) icon.style.transition = 'transform 0.3s ease';
        if (icon) icon.style.transform = '';
      }
    });
  }
  
  initEquipmentShowMore();

});
