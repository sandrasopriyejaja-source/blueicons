/**
 * BLUE_ICONS GLOBAL LIMITED — Interactive Application Logic
 * Clean, lightweight vanilla JavaScript matching Figma functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initWhoWeAreCarousel();
  initVehicleDetail();
  initVehicleEnquiryForm();
  initContactForm();
  initScrollAnimations();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.site-header nav, .home-hero-nav nav');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = nav.classList.toggle('mobile-open');
    menuBtn.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
      nav.style.display = 'block';
      nav.style.position = 'absolute';
      nav.style.top = '84px';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.backgroundColor = '#ffffff';
      nav.style.padding = '24px 32px';
      nav.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
      nav.style.zIndex = '999';
      const ul = nav.querySelector('.nav-links');
      if (ul) {
        ul.style.display = 'flex';
        ul.style.flexDirection = 'column';
        ul.style.gap = '16px';
      }
    } else {
      nav.style.display = '';
      nav.style.position = '';
      nav.style.top = '';
      nav.style.left = '';
      nav.style.width = '';
      nav.style.backgroundColor = '';
      nav.style.padding = '';
      nav.style.boxShadow = '';
      nav.style.zIndex = '';
      const ul = nav.querySelector('.nav-links');
      if (ul) {
        ul.style.display = '';
        ul.style.flexDirection = '';
        ul.style.gap = '';
      }
    }
  });
}

// 1b. Who We Are Mobile Horizontal Scroll (Slow, smooth continuous auto-scroll that pauses on interaction and smoothly resets)
function initWhoWeAreCarousel() {
  const scrollArea = document.querySelector('.home-checkerboard-grid');
  if (!scrollArea) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = motionQuery.matches;
  motionQuery.addEventListener('change', (e) => {
    prefersReducedMotion = e.matches;
  });

  let isInteracting = false;
  let isTouching = false;
  let isResetting = false;
  let pauseTimer = null;
  let resetTimer = null;
  let animationId = null;
  let currentScroll = scrollArea.scrollLeft;
  const speed = 0.35; // Very slow, calm auto-scroll (~21px/sec at 60fps)

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function tick() {
    if (isMobile() && !isInteracting && !isTouching && !isResetting && !prefersReducedMotion) {
      const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
      if (maxScroll > 10) {
        if (scrollArea.scrollLeft >= maxScroll - 1) {
          // Reached the end: pause comfortably so user can view Card 04, then reset smoothly
          isResetting = true;
          if (resetTimer) clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            if (!isInteracting && !isTouching && isMobile()) {
              scrollArea.scrollTo({ left: 0, behavior: 'smooth' });
              // Wait for smooth scroll back to 0 to complete, pause at start, then resume
              setTimeout(() => {
                currentScroll = 0;
                isResetting = false;
              }, 1600);
            } else {
              isResetting = false;
            }
          }, 2400);
        } else {
          currentScroll += speed;
          scrollArea.scrollLeft = currentScroll;
        }
      }
    }
    animationId = requestAnimationFrame(tick);
  }

  function handleInteractionStart() {
    isTouching = true;
    isInteracting = true;
    if (resetTimer) clearTimeout(resetTimer);
    if (pauseTimer) clearTimeout(pauseTimer);
    isResetting = false;
    currentScroll = scrollArea.scrollLeft;
  }

  function handleInteractionEnd() {
    isTouching = false;
    currentScroll = scrollArea.scrollLeft;
    if (pauseTimer) clearTimeout(pauseTimer);
    // Resume shortly after the user lets go
    pauseTimer = setTimeout(() => {
      if (!isTouching) {
        currentScroll = scrollArea.scrollLeft;
        isInteracting = false;
      }
    }, 2200);
  }

  // Touch & Pointer events
  scrollArea.addEventListener('touchstart', handleInteractionStart, { passive: true });
  scrollArea.addEventListener('touchmove', () => {
    currentScroll = scrollArea.scrollLeft;
  }, { passive: true });
  scrollArea.addEventListener('touchend', handleInteractionEnd, { passive: true });
  scrollArea.addEventListener('touchcancel', handleInteractionEnd, { passive: true });

  scrollArea.addEventListener('pointerdown', handleInteractionStart, { passive: true });
  scrollArea.addEventListener('pointerup', handleInteractionEnd, { passive: true });
  scrollArea.addEventListener('pointercancel', handleInteractionEnd, { passive: true });

  // Native manual scroll listener (tracks user fling or scrollbar gesture)
  scrollArea.addEventListener('scroll', () => {
    if (isInteracting || isTouching) {
      currentScroll = scrollArea.scrollLeft;
    }
  }, { passive: true });

  scrollArea.addEventListener('wheel', () => {
    handleInteractionStart();
    handleInteractionEnd();
  }, { passive: true });

  scrollArea.addEventListener('mouseenter', () => {
    isInteracting = true;
  });
  scrollArea.addEventListener('mouseleave', () => {
    handleInteractionEnd();
  });

  // Handle window resize cleanly
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      isInteracting = true;
      scrollArea.scrollLeft = 0;
      currentScroll = 0;
    } else {
      isInteracting = false;
      currentScroll = scrollArea.scrollLeft;
    }
  });

  // Start the animation loop
  animationId = requestAnimationFrame(tick);
}

// 2. Vehicle Catalog Data
const VEHICLE_CATALOG = {
  'land-cruiser': {
    name: 'Toyota Land Cruiser',
    heroTitle: 'Land Cruisers',
    breadcrumbVehicle: 'LAND CRUISERS',
    heroSubheading: 'Explore the vehicle, view its interior and share your travel requirements with our team.',
    gallerySubheading: 'Explore the different angles of the vehicle to get a better feel for the vehicle.',
    category: 'Full-Size Luxury SUV',
    capacity: '7 Passengers',
    transmission: 'Automatic 4x4',
    specs: '4x4 Automatic · 7 Seats',
    photoCountText: '8 supplied photographs',
    images: [
      'assets/vehicles/land-cruiser/thumb-1.jpeg',
      'assets/vehicles/land-cruiser/thumb-2.jpeg',
      'assets/vehicles/land-cruiser/thumb-3.jpeg',
      'assets/vehicles/land-cruiser/thumb-4.jpeg',
      'assets/vehicles/land-cruiser/thumb-5.jpeg',
      'assets/vehicles/land-cruiser/thumb-6.jpeg',
      'assets/vehicles/land-cruiser/thumb-7.jpeg',
      'assets/vehicles/land-cruiser/thumb-8.jpeg'
    ]
  },
  'prado': {
    name: 'Toyota Prado SUVs',
    heroTitle: 'Toyota Prado SUVs',
    breadcrumbVehicle: 'TOYOTA PRADO SUVS',
    heroSubheading: 'Explore the vehicle, view its interior and share your travel requirements with our team.',
    gallerySubheading: 'Explore the different angles of the vehicle to get a better feel for the vehicle.',
    category: 'Executive SUV',
    capacity: '7 Passengers',
    transmission: 'Automatic 4x4',
    specs: '4x4 Automatic · 7 Seats',
    photoCountText: '8 supplied photographs',
    images: [
      'assets/vehicles/prado/thumb-1.jpeg',
      'assets/vehicles/prado/thumb-2.jpeg',
      'assets/vehicles/prado/thumb-3.jpeg',
      'assets/vehicles/prado/thumb-4.jpeg',
      'assets/vehicles/prado/thumb-5.jpeg',
      'assets/vehicles/prado/thumb-6.jpeg',
      'assets/vehicles/prado/thumb-7.jpeg',
      'assets/vehicles/prado/thumb-8.jpeg'
    ]
  },
  'hilux': {
    name: 'Toyota Hilux',
    heroTitle: 'Toyota Hilux',
    breadcrumbVehicle: 'TOYOTA HILUX',
    heroSubheading: 'Explore the vehicle, view its interior and share your travel requirements with our team.',
    gallerySubheading: 'Explore the different angles of the vehicle to get a better feel for the vehicle.',
    category: 'Security & Utility Truck',
    capacity: '5 Passengers',
    transmission: 'Automatic / Manual 4x4',
    specs: '4x4 Manual / Auto · 5 Seats',
    photoCountText: '8 supplied photographs',
    images: [
      'assets/vehicles/hilux/thumb-1.jpeg',
      'assets/vehicles/hilux/thumb-2.jpeg',
      'assets/vehicles/hilux/thumb-3.jpeg',
      'assets/vehicles/hilux/thumb-4.jpeg',
      'assets/vehicles/hilux/thumb-5.jpeg',
      'assets/vehicles/hilux/thumb-6.jpeg',
      'assets/vehicles/hilux/thumb-7.jpeg',
      'assets/vehicles/hilux/thumb-8.jpeg'
    ]
  },
  'hiace': {
    name: 'Toyota Hiace Buses',
    heroTitle: 'Toyota Hiace Buses',
    breadcrumbVehicle: 'TOYOTA HIACE BUSES',
    heroSubheading: 'Explore the vehicle, view its interior and share your travel requirements with our team.',
    gallerySubheading: 'Explore the different angles of the vehicle to get a better feel for the vehicle.',
    category: 'Passenger Van',
    capacity: '14 - 16 Passengers',
    transmission: 'Manual / Automatic',
    specs: 'Automatic · 14-16 Seats',
    photoCountText: '8 supplied photographs',
    images: [
      'assets/vehicles/hiace/thumb-1.jpeg',
      'assets/vehicles/hiace/thumb-2.jpeg',
      'assets/vehicles/hiace/thumb-3.jpeg',
      'assets/vehicles/hiace/thumb-4.jpeg',
      'assets/vehicles/hiace/main.jpeg',
      'assets/vehicles/hiace/thumb-1.jpeg',
      'assets/vehicles/hiace/thumb-2.jpeg',
      'assets/vehicles/hiace/thumb-3.jpeg'
    ]
  },
  'coaster': {
    name: 'Coaster Buses',
    heroTitle: 'Coaster Buses',
    breadcrumbVehicle: 'COASTER BUSES',
    heroSubheading: 'Explore the vehicle, view its interior and share your travel requirements with our team.',
    gallerySubheading: 'Explore the different angles of the vehicle to get a better feel for the vehicle.',
    category: 'Executive Bus',
    capacity: '30 Passengers',
    transmission: 'Manual Diesel',
    specs: 'Manual Diesel · 30 Seats',
    photoCountText: '8 supplied photographs',
    images: [
      'assets/vehicles/coaster/thumb-1.jpeg',
      'assets/vehicles/coaster/thumb-2.jpeg',
      'assets/vehicles/coaster/thumb-3.jpeg',
      'assets/vehicles/coaster/thumb-4.jpeg',
      'assets/vehicles/coaster/main.jpeg',
      'assets/vehicles/coaster/thumb-1.jpeg',
      'assets/vehicles/coaster/thumb-2.jpeg',
      'assets/vehicles/coaster/thumb-3.jpeg'
    ]
  },
  'escalade': {
    name: 'Cadillac Escalades',
    heroTitle: 'Cadillac Escalades',
    breadcrumbVehicle: 'CADILLAC ESCALADES',
    heroSubheading: 'Explore the vehicle, view its interior and share your travel requirements with our team.',
    gallerySubheading: 'Explore the different angles of the vehicle to get a better feel for the vehicle.',
    category: 'Ultra-Luxury VIP SUV',
    capacity: '7 Passengers',
    transmission: 'Automatic',
    specs: 'Automatic · 7 Seats',
    photoCountText: '8 supplied photographs',
    images: [
      'assets/vehicles/escalade/thumb-1.jpeg',
      'assets/vehicles/escalade/thumb-2.jpeg',
      'assets/vehicles/escalade/thumb-3.jpeg',
      'assets/vehicles/escalade/thumb-4.jpeg',
      'assets/vehicles/escalade/thumb-5.jpeg',
      'assets/vehicles/escalade/thumb-6.jpeg',
      'assets/vehicles/escalade/thumb-7.jpeg',
      'assets/vehicles/escalade/thumb-8.jpeg'
    ]
  }
};

// 3. Vehicle Detail Page Dynamic Loader
function initVehicleDetail() {
  const detailBody = document.querySelector('[data-page="vehicle-detail"]');
  if (!detailBody) return;

  const urlParams = new URLSearchParams(window.location.search);
  const vehicleKey = urlParams.get('vehicle') || 'land-cruiser';
  const data = VEHICLE_CATALOG[vehicleKey] || VEHICLE_CATALOG['land-cruiser'];

  const vehicleDisplayName = data.heroTitle || data.name;

  // Update document title
  document.title = `${vehicleDisplayName} — BLUE_ICONS GLOBAL LIMITED`;

  // Hero Section Dynamic Binding (Desktop & Mobile)
  const heroCrumbEl = document.getElementById('hero-breadcrumb-vehicle');
  const heroTitleEl = document.getElementById('hero-vehicle-title');
  const heroSubEl = document.getElementById('hero-vehicle-subheading');
  const mobSpecs = document.getElementById('mobile-vehicle-specs');

  if (heroCrumbEl) {
    heroCrumbEl.textContent = data.breadcrumbVehicle || vehicleDisplayName.toUpperCase();
  }
  if (heroTitleEl) {
    heroTitleEl.textContent = vehicleDisplayName;
  }
  if (heroSubEl) {
    heroSubEl.textContent = data.heroSubheading;
  }
  if (mobSpecs && data.specs) {
    const parts = data.specs.split('·').map(s => s.trim());
    if (parts.length >= 2) {
      mobSpecs.innerHTML = `<span>${parts[0]}</span><span class="bullet">&bull;</span><span>${parts[1]}</span>`;
    } else {
      mobSpecs.textContent = data.specs;
    }
  }

  // Gallery Caption Section Dynamic Binding
  const gallerySubEl = document.getElementById('vehicle-subheading');
  const photoCountEl = document.getElementById('gallery-photos-count');

  if (gallerySubEl) {
    gallerySubEl.textContent = data.gallerySubheading || data.subheading;
  }
  if (photoCountEl) {
    photoCountEl.textContent = data.photoCountText || `${data.images.length} supplied photographs`;
  }

  // Keep the exact design background vehicle image specified in Figma Node 104:32
  const enquiryBg = document.getElementById('enquiryVehicleBg');
  if (enquiryBg && !enquiryBg.getAttribute('src')) {
    enquiryBg.src = 'assets/images/enquiry-vehicle-design.jpeg';
  }
  const waLink = document.getElementById('whatsappVehicleLink');
  if (waLink) {
    waLink.href = `https://wa.me/2349123127277?text=${encodeURIComponent(`Hello BLUE_ICONS, I would like to enquire about renting the ${vehicleDisplayName}.`)}`;
  }

  // Populate gallery images
  for (let i = 1; i <= 8; i++) {
    const imgEl = document.getElementById(`gallery-img-${i}`);
    if (imgEl && data.images[i - 1]) {
      imgEl.src = data.images[i - 1];
      imgEl.alt = `${vehicleDisplayName} Angle ${i}`;
      
      // Interactive swap: clicking any thumbnail promotes it to main frame
      if (i > 1) {
        imgEl.style.cursor = 'pointer';
        imgEl.addEventListener('click', () => {
          const mainImg = document.getElementById('gallery-img-1');
          if (mainImg) {
            const tempSrc = mainImg.src;
            mainImg.src = imgEl.src;
            imgEl.src = tempSrc;
          }
        });
      }
    }
  }
}

// Helper to set minimum date on date inputs to today (YYYY-MM-DD)
function setupDatePickers() {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = today;
    input.addEventListener('click', function () {
      if (typeof this.showPicker === 'function') {
        try {
          this.showPicker();
        } catch (err) {
          // ignore if user gesture restricted
        }
      }
    });
  });
}

// Helper to sanitize and bound input strings safely
function cleanStr(val, maxLen = 200) {
  if (!val) return '';
  return String(val)
    .trim()
    .slice(0, maxLen)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
}

// 4. Vehicle-Specific Enquiry Form Handler (Figma Node 104:32)
function initVehicleEnquiryForm() {
  const form = document.getElementById('vehicleEnquiryForm');
  if (!form) return;

  setupDatePickers();

  let isSubmitting = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const urlParams = new URLSearchParams(window.location.search);
    const vehicleKey = urlParams.get('vehicle') || 'land-cruiser';
    const vehicleData = VEHICLE_CATALOG[vehicleKey] || VEHICLE_CATALOG['land-cruiser'];
    const vehicleName = vehicleData.heroTitle || vehicleData.name;

    const fullName = cleanStr(form.querySelector('#vFullName')?.value, 100) || 'Client';
    const phone = cleanStr(form.querySelector('#vPhone')?.value, 30);
    const pickupState = cleanStr(form.querySelector('#vPickup')?.value, 60);
    const destState = cleanStr(form.querySelector('#vDestination')?.value, 60);
    const date = cleanStr(form.querySelector('#vDate')?.value, 20);
    const duration = cleanStr(form.querySelector('#vDuration')?.value, 100);
    const details = cleanStr(form.querySelector('#vDetails')?.value, 2000);

    const lines = [
      `*BLUE_ICONS Vehicle Rental Enquiry*`,
      ``,
      `*Vehicle:* ${vehicleName}`,
      `*Full Name:* ${fullName}`,
      `*Phone Number:* ${phone}`,
      `*Pickup State:* ${pickupState || 'Not specified'}`,
      `*Destination State:* ${destState || 'Not specified'}`,
      `*Preferred Date:* ${date || 'Flexible'}`,
      `*Rental Duration / Distance:* ${duration || 'Not specified'}`
    ];

    if (details) {
      lines.push(`*Additional Details:* ${details}`);
    }
    lines.push(``);
    lines.push(`_Sent via BLUE_ICONS Website_`);

    const messageText = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/2349123127277?text=${messageText}`;

    isSubmitting = true;
    window.open(whatsappUrl, '_blank');

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Enquiry Sent to WhatsApp!</span>`;
      submitBtn.style.backgroundColor = '#1f6d4a';
      submitBtn.style.color = '#ffffff';
      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
        isSubmitting = false;
      }, 3000);
    } else {
      setTimeout(() => { isSubmitting = false; }, 3000);
    }
  });
}

// 5. Contact Form / Service Inquiry Form Handler
function initContactForm() {
  const form = document.querySelector('form[data-whatsapp-form]');
  if (!form) return;

  setupDatePickers();

  const serviceSelect = document.getElementById('serviceSelect');
  const conditionalContainers = form.querySelectorAll('.service-conditional-fields');

  function updateServiceFields(selectedService) {
    conditionalContainers.forEach(container => {
      const match = container.getAttribute('data-service') === selectedService;
      if (match) {
        container.classList.remove('is-hidden');
      } else {
        container.classList.add('is-hidden');
      }
    });
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      updateServiceFields(serviceSelect.value);
    });

    // Handle URL query parameter ?service=...
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');

    if (serviceParam) {
      if (serviceParam === 'security') serviceSelect.value = 'Security Personnel & Escorts';
      else if (serviceParam === 'events') serviceSelect.value = 'Event Ushers & Protocol';
      else if (serviceParam === 'mobility') serviceSelect.value = 'Executive Car Rental';
      else if (serviceParam === 'chauffeur') serviceSelect.value = 'Chauffeur Services';
      else if (serviceParam === 'logistics') serviceSelect.value = 'Logistics Support';
    }

    if (serviceSelect.value) {
      updateServiceFields(serviceSelect.value);
    }
  }

  let isSubmitting = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const name = cleanStr(form.querySelector('#fullName')?.value, 100) || 'Client';
    const email = cleanStr(form.querySelector('#emailAddr')?.value, 100);
    const phone = cleanStr(form.querySelector('#phoneNumber')?.value, 30);
    const service = cleanStr(serviceSelect?.value, 80) || 'General Inquiry';
    const notes = cleanStr(form.querySelector('#moreDetails')?.value, 2000);

    const lines = [
      `*BLUE_ICONS Global Service Enquiry*`,
      ``,
      `*Client Name:* ${name}`,
      `*Email Address:* ${email}`,
      `*Phone Number:* ${phone}`,
      `*Service Required:* ${service}`
    ];

    // Conditional details by selected service
    if (service === 'Chauffeur Services') {
      const date = cleanStr(form.querySelector('#chauffeurDate')?.value, 20);
      const duration = cleanStr(form.querySelector('#chauffeurDuration')?.value, 100);
      const pickupState = cleanStr(form.querySelector('#chauffeurPickupState')?.value, 60);
      const pickupDetails = cleanStr(form.querySelector('#chauffeurPickupDetails')?.value, 200);
      const destState = cleanStr(form.querySelector('#chauffeurDestState')?.value, 60);
      const destDetails = cleanStr(form.querySelector('#chauffeurDestDetails')?.value, 200);

      if (date) lines.push(`*Preferred Date:* ${date}`);
      if (duration) lines.push(`*Duration / Distance:* ${duration}`);
      if (pickupState) lines.push(`*Pickup State:* ${pickupState}`);
      if (pickupDetails) lines.push(`*Pickup Address / Details:* ${pickupDetails}`);
      if (destState) lines.push(`*Destination State:* ${destState}`);
      if (destDetails) lines.push(`*Destination Details:* ${destDetails}`);
    } else if (service === 'Logistics Support') {
      const cargo = cleanStr(form.querySelector('#logisticsCargo')?.value, 200);
      const date = cleanStr(form.querySelector('#logisticsDate')?.value, 20);
      const duration = cleanStr(form.querySelector('#logisticsDuration')?.value, 100);
      const pickupState = cleanStr(form.querySelector('#logisticsPickupState')?.value, 60);
      const pickupAddress = cleanStr(form.querySelector('#logisticsPickupAddress')?.value, 200);
      const deliveryState = cleanStr(form.querySelector('#logisticsDeliveryState')?.value, 60);
      const deliveryAddress = cleanStr(form.querySelector('#logisticsDeliveryAddress')?.value, 200);

      if (cargo) lines.push(`*Cargo / Items to Transport:* ${cargo}`);
      if (date) lines.push(`*Preferred Date / Timeline:* ${date}`);
      if (duration) lines.push(`*Distance / Duration:* ${duration}`);
      if (pickupState) lines.push(`*Pickup State:* ${pickupState}`);
      if (pickupAddress) lines.push(`*Pickup Address / Facility:* ${pickupAddress}`);
      if (deliveryState) lines.push(`*Delivery State:* ${deliveryState}`);
      if (deliveryAddress) lines.push(`*Delivery Address / Destination:* ${deliveryAddress}`);
    } else if (service === 'Event Ushers & Protocol') {
      const eventType = cleanStr(form.querySelector('#eventType')?.value, 100);
      const date = cleanStr(form.querySelector('#eventDate')?.value, 20);
      const state = cleanStr(form.querySelector('#eventState')?.value, 60);
      const venue = cleanStr(form.querySelector('#eventVenue')?.value, 200);
      const guests = cleanStr(form.querySelector('#eventGuests')?.value, 100);
      const ushers = cleanStr(form.querySelector('#eventUshers')?.value, 100);

      if (eventType) lines.push(`*Event Type:* ${eventType}`);
      if (date) lines.push(`*Event Date:* ${date}`);
      if (state) lines.push(`*Event State:* ${state}`);
      if (venue) lines.push(`*Venue / Address:* ${venue}`);
      if (guests) lines.push(`*Expected Guest Count:* ${guests}`);
      if (ushers) lines.push(`*Ushers / Protocol Needed:* ${ushers}`);
    } else if (service === 'Security Personnel & Escorts') {
      const secType = cleanStr(form.querySelector('#securityType')?.value, 100);
      const count = cleanStr(form.querySelector('#securityPersonnelCount')?.value, 100);
      const date = cleanStr(form.querySelector('#securityDate')?.value, 20);
      const duration = cleanStr(form.querySelector('#securityDuration')?.value, 100);
      const state = cleanStr(form.querySelector('#securityState')?.value, 60);
      const location = cleanStr(form.querySelector('#securityLocation')?.value, 200);

      if (secType) lines.push(`*Security Service Type:* ${secType}`);
      if (count) lines.push(`*Number of Personnel:* ${count}`);
      if (date) lines.push(`*Preferred Start Date:* ${date}`);
      if (duration) lines.push(`*Duration:* ${duration}`);
      if (state) lines.push(`*Location State:* ${state}`);
      if (location) lines.push(`*Site / Route Details:* ${location}`);
    } else if (service === 'Executive Car Rental') {
      const vehicle = cleanStr(form.querySelector('#rentalVehicle')?.value, 100);
      const date = cleanStr(form.querySelector('#rentalDate')?.value, 20);
      const duration = cleanStr(form.querySelector('#rentalDuration')?.value, 100);
      const chauffeur = cleanStr(form.querySelector('#rentalChauffeur')?.value, 60);
      const pickupState = cleanStr(form.querySelector('#rentalPickupState')?.value, 60);
      const destState = cleanStr(form.querySelector('#rentalDestState')?.value, 60);

      if (vehicle) lines.push(`*Vehicle Preference:* ${vehicle}`);
      if (date) lines.push(`*Preferred Date:* ${date}`);
      if (duration) lines.push(`*Rental Duration / Distance:* ${duration}`);
      if (chauffeur) lines.push(`*Chauffeur Option:* ${chauffeur}`);
      if (pickupState) lines.push(`*Pickup State:* ${pickupState}`);
      if (destState) lines.push(`*Destination State:* ${destState}`);
    } else if (service === 'General Inquiry') {
      const date = cleanStr(form.querySelector('#generalDate')?.value, 20);
      const state = cleanStr(form.querySelector('#generalState')?.value, 60);
      if (date) lines.push(`*Preferred Date:* ${date}`);
      if (state) lines.push(`*Location State:* ${state}`);
    }

    if (notes) {
      lines.push(`*Additional Details:* ${notes}`);
    }
    lines.push(``);
    lines.push(`_Sent via BLUE_ICONS Website_`);

    const messageText = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/2349123127277?text=${messageText}`;

    isSubmitting = true;
    window.open(whatsappUrl, '_blank');

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Enquiry Sent to WhatsApp!</span>`;
      submitBtn.style.backgroundColor = '#1f6d4a';
      submitBtn.style.color = '#ffffff';
      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
        isSubmitting = false;
      }, 3000);
    } else {
      setTimeout(() => { isSubmitting = false; }, 3000);
    }
  });
}

// 6. Subtle Motion & Scroll-Triggered Entrance Animations
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scrollTargets = document.querySelectorAll('.anim-appear, .anim-slide-left, .anim-slide-right, .anim-stagger-group, .anim-img-reveal, .scroll-reveal');
  const heroTargets = document.querySelectorAll('.anim-hero-stagger');

  if (!scrollTargets.length && !heroTargets.length) return;

  // Add activation class to html only after verifying observer support and reduced-motion preference
  document.documentElement.classList.add('has-motion-anim', 'has-scroll-anim');

  // Trigger Hero Load-in Animations after initial render tick
  if (heroTargets.length) {
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroTargets.forEach(hero => hero.classList.add('is-hero-loaded'));
      }, 60);
    });
  }

  // IntersectionObserver for scroll-triggered elements
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
        entry.target.classList.add('is-in-view', 'is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  scrollTargets.forEach(el => {
    observer.observe(el);
    el.addEventListener('transitionend', (e) => {
      if (e.target === el) {
        el.style.transform = 'none';
        el.style.willChange = 'auto';
      }
    }, { once: true });
  });

  // Fallback safeguard: guarantee no content ever stays hidden if observer stalls
  setTimeout(() => {
    scrollTargets.forEach(el => {
      if (!el.classList.contains('is-in-view')) {
        el.classList.add('is-in-view', 'is-visible');
      }
    });
    heroTargets.forEach(hero => {
      if (!hero.classList.contains('is-hero-loaded')) {
        hero.classList.add('is-hero-loaded');
      }
    });
  }, 3000);
}
