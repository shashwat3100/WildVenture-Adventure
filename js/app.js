// ==========================================================================
// WildVenture Adventure Camping Platform - Main Application Controller
// ==========================================================================

const App = {
  currentRole: "user", // "user" | "contractor" | "admin"
  selectedCategory: "all",
  activeCampsiteModal: null,
  selectedGearForBooking: [],

  init: function() {
    try { this.bindRoleSwitcher(); } catch(e) { console.error(e); }
    try { this.bindNavigation(); } catch(e) { console.error(e); }
    try { this.bindFilterEvents(); } catch(e) { console.error(e); }
    try { this.bindContractorActions(); } catch(e) { console.error(e); }
    try { this.bindAdminActions(); } catch(e) { console.error(e); }
    try { this.bindBookingWidget(); } catch(e) { console.error(e); }

    // Initial render with section-level isolation
    try { this.renderCampsites(); } catch(e) { console.error("renderCampsites error:", e); }
    try { this.renderGearStore(); } catch(e) { console.error("renderGearStore error:", e); }
    try { this.renderUserBookings(); } catch(e) { console.error("renderUserBookings error:", e); }
    try { this.renderContractorDashboard(); } catch(e) { console.error("renderContractorDashboard error:", e); }
    try { this.renderAdminDashboard(); } catch(e) { console.error("renderAdminDashboard error:", e); }

    // Initialize Payment Engine
    if (window.PaymentEngine) {
      try { PaymentEngine.init(); } catch(e) { console.error(e); }
    }
  },

  // ================= ROLE SWITCHER =================
  bindRoleSwitcher: function() {
    const roleBtns = document.querySelectorAll(".role-pill");
    roleBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const role = e.currentTarget.dataset.role;
        this.switchRole(role);
      });
    });
  },

  switchRole: function(role) {
    this.currentRole = role;
    document.querySelectorAll(".role-pill").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.role === role);
    });

    // Toggle Portals
    document.querySelectorAll(".portal-view").forEach(portal => {
      portal.classList.remove("active");
    });

    const targetPortal = document.getElementById(`portal-${role}`);
    if (targetPortal) {
      targetPortal.classList.add("active");
    }

    // Update navbar active badge
    const badge = document.getElementById("active-role-indicator");
    if (badge) {
      if (role === "user") {
        badge.innerHTML = `<span class="badge badge-user"><i class="ph ph-compass"></i> Camper Explorer Mode</span>`;
      } else if (role === "contractor") {
        badge.innerHTML = `<span class="badge badge-contractor"><i class="ph ph-mountains"></i> E-Contractor / Guide Hub</span>`;
      } else if (role === "admin") {
        badge.innerHTML = `<span class="badge badge-admin"><i class="ph ph-shield-check"></i> Super Admin Portal</span>`;
      }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh view
    this.refreshPortalViews();
    showToast(`Switched to ${role.toUpperCase()} Portal`, "info");
  },

  refreshPortalViews: function() {
    try { this.renderCampsites(); } catch(e){}
    try { this.renderGearStore(); } catch(e){}
    try { this.renderUserBookings(); } catch(e){}
    try { this.renderContractorDashboard(); } catch(e){}
    try { this.renderAdminDashboard(); } catch(e){}
  },

  // ================= NAVIGATION =================
  bindNavigation: function() {
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        const target = e.currentTarget.getAttribute("href");
        if (target && target.startsWith("#")) {
          e.preventDefault();
          const targetElem = document.querySelector(target);
          if (targetElem) {
            targetElem.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("main-nav-menu");
    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });
    }
  },

  // ================= CAMPER PORTAL: SEARCH & FILTERS =================
  bindFilterEvents: function() {
    // Category pills
    document.querySelectorAll(".category-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.selectedCategory = e.currentTarget.dataset.category;
        this.renderCampsites();
      });
    });

    // Search bar inputs
    const searchBtn = document.getElementById("btn-hero-search");
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        this.renderCampsites();
        document.getElementById("campsites-section")?.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Filter controls
    document.getElementById("filter-difficulty")?.addEventListener("change", () => this.renderCampsites());
    document.getElementById("filter-price-range")?.addEventListener("input", (e) => {
      document.getElementById("price-range-label").innerText = `Max: ₹${parseInt(e.target.value).toLocaleString()}`;
      this.renderCampsites();
    });
  },

  renderCampsites: function() {
    const container = document.getElementById("campsites-grid");
    if (!container) return;

    let campsites = [];
    try {
      campsites = DB.get("campsites");
      if (!Array.isArray(campsites) || campsites.length === 0) {
        campsites = typeof INITIAL_CAMPSITES !== 'undefined' ? INITIAL_CAMPSITES : [];
      }
    } catch(e) {
      console.warn("Error fetching campsites from DB:", e);
      campsites = typeof INITIAL_CAMPSITES !== 'undefined' ? INITIAL_CAMPSITES : [];
    }

    const locationQuery = (document.getElementById("search-location")?.value || "").toLowerCase().trim();
    const difficultyQuery = document.getElementById("filter-difficulty")?.value || "all";
    const maxPrice = parseInt(document.getElementById("filter-price-range")?.value || "10000");

    const filtered = campsites.filter(camp => {
      if (!camp) return false;
      const status = (camp.status || "active").toLowerCase();
      if (status !== "active") return false;
      
      if (this.selectedCategory !== "all") {
        const sel = (this.selectedCategory || "").toLowerCase();
        const cat = (camp.category || "").toLowerCase();
        if (sel === "glamping" && !cat.includes("glamp")) return false;
        else if (sel === "wild" && !cat.includes("wild") && !cat.includes("alpine") && !cat.includes("altitude")) return false;
        else if (sel === "riverside" && !cat.includes("river") && !cat.includes("rapid")) return false;
        else if (sel === "survival" && !cat.includes("survival") && !cat.includes("bushcraft")) return false;
        else if (!["glamping", "wild", "riverside", "survival"].includes(sel) && !cat.includes(sel)) return false;
      }

      const campLoc = (camp.location || "").toLowerCase();
      const campTitle = (camp.title || "").toLowerCase();
      const campDiff = (camp.difficulty || "").toLowerCase();
      const campPrice = typeof camp.pricePerNight === 'number' ? camp.pricePerNight : 0;

      if (locationQuery && !campLoc.includes(locationQuery) && !campTitle.includes(locationQuery)) return false;
      if (difficultyQuery !== "all" && campDiff !== difficultyQuery.toLowerCase()) return false;
      if (campPrice > maxPrice) return false;
      return true;
    });

    const countElem = document.getElementById("results-count");
    if (countElem) countElem.innerText = `${filtered.length} Adventure Destination${filtered.length === 1 ? '' : 's'} Found`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card col-span-full">
          <i class="ph ph-compass empty-icon"></i>
          <h3>No camping destinations found</h3>
          <p>Try broadening your filters, choosing a different category, or searching another location.</p>
          <button class="btn btn-outline" onclick="App.resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(camp => {
      const contractorName = camp.contractor?.name || camp.contractorName || "Verified Operator";
      return `
      <div class="campsite-card" onclick="App.openCampsiteModal('${camp.id}')">
        <div class="card-img-wrap">
          <img src="${camp.image}" alt="${camp.title}" loading="lazy">
          <div class="card-badges">
            <span class="badge badge-category">${this.formatCategory(camp.category)}</span>
            ${camp.featured ? '<span class="badge badge-featured"><i class="ph ph-sparkle"></i> Featured</span>' : ''}
          </div>
          <div class="card-price-overlay">
            <span class="price-val">₹${camp.pricePerNight.toLocaleString()}</span>
            <span class="price-unit">/ night</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-meta-top">
            <span class="location"><i class="ph ph-map-pin"></i> ${camp.location}</span>
            <span class="rating"><i class="ph-fill ph-star"></i> ${camp.rating} (${camp.reviewsCount})</span>
          </div>
          <h3 class="card-title">${camp.title}</h3>
          <p class="card-tagline">${camp.tagline}</p>
          
          <div class="card-amenities-tags">
            ${(camp.amenities || []).slice(0, 3).map(a => `<span class="tag-pill">${a}</span>`).join('')}
            ${(camp.amenities || []).length > 3 ? `<span class="tag-pill">+${camp.amenities.length - 3} more</span>` : ''}
          </div>

          <div class="card-contractor-footer">
            <div class="contractor-chip">
              <i class="ph ph-shield-check text-success"></i>
              <span>${contractorName}</span>
            </div>
            <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); App.openCampsiteModal('${camp.id}')">
              Explore & Book <i class="ph ph-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `}).join('');
  },

  resetFilters: function() {
    this.selectedCategory = "all";
    document.querySelectorAll(".category-pill").forEach(p => p.classList.toggle("active", p.dataset.category === "all"));
    if (document.getElementById("search-location")) document.getElementById("search-location").value = "";
    if (document.getElementById("filter-difficulty")) document.getElementById("filter-difficulty").value = "all";
    if (document.getElementById("filter-price-range")) {
      document.getElementById("filter-price-range").value = 10000;
      document.getElementById("price-range-label").innerText = "Max: ₹10,000";
    }
    this.renderCampsites();
  },

  formatCategory: function(cat) {
    const map = {
      wild: "Wilderness Trek",
      glamping: "Luxury Glamping",
      survival: "Bushcraft Survival",
      riverside: "Riverside Eco-Camp"
    };
    return map[cat] || cat;
  },

  // ================= CAMPSITE DETAIL MODAL & BOOKING =================
  openCampsiteModal: function(campId) {
    const campsites = DB.get("campsites") || [];
    const camp = campsites.find(c => c.id === campId);
    if (!camp) return;

    this.activeCampsiteModal = camp;
    this.selectedGearForBooking = [];

    // Populate modal elements
    document.getElementById("modal-camp-title").innerText = camp.title;
    document.getElementById("modal-camp-location").innerHTML = `<i class="ph ph-map-pin"></i> ${camp.location} &bull; <i class="ph ph-navigation-arrow"></i> ${camp.coordinates || '32.2432° N, 77.1892° E'}`;
    document.getElementById("modal-camp-hero-img").src = camp.image;
    document.getElementById("modal-camp-price").innerText = `₹${camp.pricePerNight.toLocaleString()}`;
    document.getElementById("modal-camp-tagline").innerText = camp.tagline;

    // Difficulty and Specs
    document.getElementById("modal-camp-difficulty").innerText = camp.difficulty || 'Moderate';
    document.getElementById("modal-camp-altitude").innerText = camp.altitude || camp.elevation || '2,000 m';
    document.getElementById("modal-camp-season").innerText = camp.bestSeason || 'Apr - Oct';
    document.getElementById("modal-camp-slots").innerText = `${camp.availableSlots || camp.maxGuests || 15} Slots Left`;

    // Contractor Box
    const contractorName = camp.contractor?.name || camp.contractorName || 'Wilderness Expeditions';
    const leadGuide = camp.contractor?.leadGuide || camp.leadGuide || 'Certified Wilderness Guide';
    const badge = camp.contractor?.badge || 'Master Alpine Operator';
    const phone = camp.contractor?.phone || '+91 98765 43210';

    document.getElementById("modal-contractor-name").innerText = contractorName;
    document.getElementById("modal-contractor-guide").innerText = `Lead Guide: ${leadGuide}`;
    document.getElementById("modal-contractor-badge").innerText = badge;
    document.getElementById("modal-contractor-phone").innerText = phone;

    // Amenities
    const amenitiesContainer = document.getElementById("modal-camp-amenities");
    if (amenitiesContainer) {
      amenitiesContainer.innerHTML = (camp.amenities || []).map(a => `
        <div class="amenity-item">
          <i class="ph ph-check-circle"></i>
          <span>${a}</span>
        </div>
      `).join('');
    }

    // Itinerary
    const itineraryContainer = document.getElementById("modal-camp-itinerary");
    if (itineraryContainer) {
      itineraryContainer.innerHTML = (camp.itinerary || []).map(item => `
        <div class="itinerary-step">
          <div class="itinerary-badge">${item.day}</div>
          <div class="itinerary-content">
            <h4>${item.title}</h4>
            <p>${item.desc || item.detail || ''}</p>
          </div>
        </div>
      `).join('');
    }

    // Render Gear Add-ons inside booking widget
    this.renderModalGearAddons();

    // Reset booking inputs
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);
    
    document.getElementById("book-checkin").value = today.toISOString().split('T')[0];
    document.getElementById("book-checkout").value = tomorrow.toISOString().split('T')[0];
    document.getElementById("book-campers-count").value = 2;

    this.calculateModalBookingPrice();

    const modal = document.getElementById("campsite-detail-modal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeCampsiteModal: function() {
    const modal = document.getElementById("campsite-detail-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    this.activeCampsiteModal = null;
  },

  renderModalGearAddons: function() {
    const gearList = DB.get("gearCatalog") || [];
    const container = document.getElementById("modal-gear-addons-list");
    if (!container) return;

    container.innerHTML = gearList.map(gear => `
      <div class="gear-addon-item">
        <div class="gear-addon-info">
          <input type="checkbox" id="gear-chk-${gear.id}" onchange="App.toggleGearAddon('${gear.id}')">
          <label for="gear-chk-${gear.id}">
            <strong>${gear.name}</strong>
            <small>+₹${gear.pricePerDay}/day &bull; Stock: ${gear.stock}</small>
          </label>
        </div>
      </div>
    `).join('');
  },

  toggleGearAddon: function(gearId) {
    const chk = document.getElementById(`gear-chk-${gearId}`);
    const gearCatalog = DB.get("gearCatalog") || [];
    const item = gearCatalog.find(g => g.id === gearId);

    if (chk && chk.checked && item) {
      if (!this.selectedGearForBooking.find(g => g.id === gearId)) {
        this.selectedGearForBooking.push({ ...item, qty: 1 });
      }
    } else {
      this.selectedGearForBooking = this.selectedGearForBooking.filter(g => g.id !== gearId);
    }
    this.calculateModalBookingPrice();
  },

  bindBookingWidget: function() {
    document.getElementById("book-checkin")?.addEventListener("change", () => this.calculateModalBookingPrice());
    document.getElementById("book-checkout")?.addEventListener("change", () => this.calculateModalBookingPrice());
    document.getElementById("book-campers-count")?.addEventListener("input", () => this.calculateModalBookingPrice());

    document.getElementById("btn-proceed-to-pay")?.addEventListener("click", () => {
      this.proceedToCheckout();
    });
  },

  calculateModalBookingPrice: function() {
    if (!this.activeCampsiteModal) return;

    const checkInVal = document.getElementById("book-checkin")?.value;
    const checkOutVal = document.getElementById("book-checkout")?.value;
    const campersCount = parseInt(document.getElementById("book-campers-count")?.value || "1");

    let nights = 1;
    if (checkInVal && checkOutVal) {
      const d1 = new Date(checkInVal);
      const d2 = new Date(checkOutVal);
      const diffTime = d2.getTime() - d1.getTime();
      nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    const baseCost = this.activeCampsiteModal.pricePerNight * nights * campersCount;
    const gearCost = this.selectedGearForBooking.reduce((acc, g) => acc + (g.pricePerDay * g.qty * nights), 0);
    const subtotal = baseCost + gearCost;
    const taxes = Math.round(subtotal * 0.05);
    const total = subtotal + taxes;

    document.getElementById("book-calc-nights").innerText = `${nights} Night${nights > 1 ? 's' : ''}`;
    document.getElementById("book-calc-campers").innerText = `${campersCount} Camper${campersCount > 1 ? 's' : ''}`;
    document.getElementById("book-calc-base").innerText = `₹${baseCost.toLocaleString()}`;
    document.getElementById("book-calc-gear").innerText = `₹${gearCost.toLocaleString()}`;
    document.getElementById("book-calc-tax").innerText = `₹${taxes.toLocaleString()}`;
    document.getElementById("book-calc-total").innerText = `₹${total.toLocaleString()}`;
  },

  proceedToCheckout: function() {
    const customerName = document.getElementById("book-camper-name")?.value.trim();
    const customerEmail = document.getElementById("book-camper-email")?.value.trim();
    const customerPhone = document.getElementById("book-camper-phone")?.value.trim();

    if (!customerName || !customerEmail || !customerPhone) {
      showToast("Please enter your Name, Email, and Phone number to proceed.", "warning");
      return;
    }

    const checkInVal = document.getElementById("book-checkin")?.value;
    const checkOutVal = document.getElementById("book-checkout")?.value;
    const campersCount = parseInt(document.getElementById("book-campers-count")?.value || "1");

    let nights = 1;
    if (checkInVal && checkOutVal) {
      const d1 = new Date(checkInVal);
      const d2 = new Date(checkOutVal);
      nights = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));
    }

    const checkoutData = {
      campsite: this.activeCampsiteModal,
      customerName,
      customerEmail,
      customerPhone,
      checkIn: checkInVal,
      checkOut: checkOutVal,
      nights,
      campers: campersCount,
      selectedGear: this.selectedGearForBooking
    };

    this.closeCampsiteModal();
    if (window.PaymentEngine) {
      PaymentEngine.openCheckout(checkoutData);
    }
  },

  // ================= GEAR RENTAL STORE =================
  renderGearStore: function() {
    const container = document.getElementById("gear-catalog-grid");
    if (!container) return;

    const catalog = DB.get("gearCatalog") || [];
    container.innerHTML = catalog.map(gear => `
      <div class="gear-card">
        <div class="gear-img-wrap">
          <img src="${gear.image}" alt="${gear.name}" loading="lazy">
          <span class="badge badge-stock">${gear.stock} in stock</span>
        </div>
        <div class="gear-body">
          <span class="gear-contractor"><i class="ph ph-shield-check"></i> ${gear.contractorName}</span>
          <h4 class="gear-title">${gear.name}</h4>
          <p class="gear-specs">${gear.specs}</p>
          <div class="gear-footer">
            <span class="gear-price">₹${gear.pricePerDay} <small>/ day</small></span>
            <button class="btn btn-sm btn-outline" onclick="App.quickRentGear('${gear.id}')">
              <i class="ph ph-shopping-bag"></i> Rent Gear
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  quickRentGear: function(gearId) {
    const gearList = DB.get("gearCatalog") || [];
    const item = gearList.find(g => g.id === gearId);
    if (!item) return;

    showToast(`Added ${item.name} to equipment rental planner. Pick your campsite to finalize trip package!`, "info");
    document.getElementById("campsites-section")?.scrollIntoView({ behavior: 'smooth' });
  },

  // ================= USER PROFILE & BOOKINGS =================
  renderUserBookings: function() {
    const container = document.getElementById("user-bookings-list");
    if (!container) return;

    const bookings = DB.get("bookings") || [];
    if (bookings.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <i class="ph ph-ticket empty-icon"></i>
          <h3>No active adventure bookings</h3>
          <p>Explore our curated wilderness destinations and book your next outdoor escape!</p>
          <button class="btn btn-primary" onclick="App.switchRole('user')">Explore Campsites</button>
        </div>
      `;
      return;
    }

    container.innerHTML = bookings.map(b => `
      <div class="booking-ticket-card">
        <div class="ticket-left">
          <div class="ticket-header">
            <span class="ticket-id"><i class="ph ph-barcode"></i> ${b.id}</span>
            <span class="badge badge-success">${b.bookingStatus}</span>
          </div>
          <h3 class="ticket-camp-title">${b.campTitle}</h3>
          <div class="ticket-grid">
            <div>
              <span class="ticket-label">Camper Name</span>
              <span class="ticket-val">${b.customerName}</span>
            </div>
            <div>
              <span class="ticket-label">Dates</span>
              <span class="ticket-val">${b.checkIn} → ${b.checkOut} (${b.nights}N)</span>
            </div>
            <div>
              <span class="ticket-label">Party Size</span>
              <span class="ticket-val">${b.campers} Camper${b.campers > 1 ? 's' : ''}</span>
            </div>
            <div>
              <span class="ticket-label">Payment</span>
              <span class="ticket-val">₹${b.totalAmount.toLocaleString()} (${b.paymentStatus})</span>
            </div>
          </div>
          ${b.gearAddons && b.gearAddons.length > 0 ? `
            <div class="ticket-addons">
              <strong>Gear Included:</strong> ${b.gearAddons.map(g => `${g.name} (${g.qty}x)`).join(', ')}
            </div>
          ` : ''}
        </div>
        <div class="ticket-right">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=WILDVENTURE-PASS-${b.id}" class="qr-thumb" alt="QR Pass">
          <span class="qr-text">Scan for Check-in</span>
          <button class="btn btn-sm btn-outline" onclick="App.printTicket('${b.id}')">
            <i class="ph ph-printer"></i> Print Pass
          </button>
        </div>
      </div>
    `).join('');
  },

  printTicket: function(bookingId) {
    const bookings = DB.get("bookings") || [];
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return;

    if (window.PaymentEngine) {
      PaymentEngine.renderSuccessReceipt(b, "TXN-" + Math.floor(100000 + Math.random() * 900000));
    }
  },

  // ================= E-CONTRACTOR PORTAL ACTIONS =================
  bindContractorActions: function() {
    // Add Campsite Modal
    document.getElementById("btn-open-add-campsite")?.addEventListener("click", () => {
      document.getElementById("add-campsite-modal")?.classList.add("active");
    });

    document.getElementById("btn-save-campsite")?.addEventListener("click", () => {
      this.saveNewCampsite();
    });

    // Payout Request
    document.getElementById("btn-request-payout")?.addEventListener("click", () => {
      showToast("Payout request of ₹48,500 submitted to Admin for direct bank transfer.", "success");
    });
  },

  renderContractorDashboard: function() {
    const campsites = DB.get("campsites") || [];
    const bookings = DB.get("bookings") || [];
    const contractors = DB.get("contractors") || [];

    // Select active contractor (defaulting to first contractor Himalayan Ridge)
    const currentContractor = contractors[0];
    if (!currentContractor) return;

    // Contractor KPIs
    const contBookings = bookings.filter(b => b.contractorId === currentContractor.id);
    const contCamps = campsites.filter(c => c.contractor.id === currentContractor.id);
    const totalEarnings = contBookings.reduce((sum, b) => sum + (b.contractorPayout || 0), 0);

    const statListings = document.getElementById("cont-stat-listings");
    const statBookings = document.getElementById("cont-stat-bookings");
    const statRevenue = document.getElementById("cont-stat-revenue");
    const statPayout = document.getElementById("cont-stat-payout");

    if (statListings) statListings.innerText = contCamps.length;
    if (statBookings) statBookings.innerText = currentContractor.totalBookings + contBookings.length;
    if (statRevenue) statRevenue.innerText = `₹${(currentContractor.totalRevenue + totalEarnings).toLocaleString()}`;
    if (statPayout) statPayout.innerText = `₹${currentContractor.pendingPayout.toLocaleString()}`;

    // Contractor Listings Table
    const tableBody = document.getElementById("contractor-listings-table");
    if (tableBody) {
      tableBody.innerHTML = contCamps.map(c => `
        <tr>
          <td>
            <div class="d-flex align-center gap-2">
              <img src="${c.image}" class="table-thumb" alt="${c.title}">
              <div>
                <strong>${c.title}</strong>
                <div class="text-muted small">${c.location}</div>
              </div>
            </div>
          </td>
          <td>${this.formatCategory(c.category)}</td>
          <td>₹${c.pricePerNight.toLocaleString()}/N</td>
          <td><span class="badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}">${c.status}</span></td>
          <td>${c.availableSlots} Slots</td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="App.deleteCampsite('${c.id}')"><i class="ph ph-trash"></i></button>
          </td>
        </tr>
      `).join('');
    }

    // Contractor Attendee Roster Table
    const rosterBody = document.getElementById("contractor-roster-table");
    if (rosterBody) {
      rosterBody.innerHTML = contBookings.map(b => `
        <tr>
          <td><strong>${b.id}</strong></td>
          <td>${b.customerName}<br><small class="text-muted">${b.customerPhone}</small></td>
          <td>${b.campTitle}</td>
          <td>${b.checkIn} → ${b.checkOut}</td>
          <td>${b.campers}</td>
          <td><span class="badge badge-success">Paid (₹${b.contractorPayout.toLocaleString()})</span></td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="showToast('Camper ${b.customerName} checked in successfully!', 'success')">
              <i class="ph ph-check"></i> Check-in
            </button>
          </td>
        </tr>
      `).join('');
    }
  },

  saveNewCampsite: function() {
    const title = document.getElementById("new-camp-title")?.value.trim();
    const location = document.getElementById("new-camp-location")?.value.trim();
    const category = document.getElementById("new-camp-category")?.value;
    const price = parseInt(document.getElementById("new-camp-price")?.value || "0");
    const slots = parseInt(document.getElementById("new-camp-slots")?.value || "10");
    const difficulty = document.getElementById("new-camp-difficulty")?.value;
    const image = document.getElementById("new-camp-image")?.value.trim() || "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80";

    if (!title || !location || price <= 0) {
      showToast("Please fill all required fields (Title, Location, Price).", "warning");
      return;
    }

    const newCamp = {
      id: "camp-" + (Date.now()),
      title,
      tagline: "Exciting new expedition managed by verified wilderness operators.",
      category,
      location,
      coordinates: "31.1048° N, 77.1734° E",
      pricePerNight: price,
      rating: 5.0,
      reviewsCount: 1,
      difficulty,
      altitude: "2,400 m",
      bestSeason: "All Year Round",
      image,
      gallery: [image],
      contractor: {
        id: "cont-101",
        name: "Himalayan Ridge Expeditions",
        leadGuide: "Vikram Negi",
        phone: "+91 98765 43210",
        rating: 4.95,
        badge: "Certified Alpine Master",
        verified: true
      },
      amenities: ["Bonfire Pit", "Camp Kitchen", "First Aid Kit", "Thermal Tents"],
      itinerary: [
        { day: "Day 1", title: "Arrival & Orientation", desc: "Camp setup, scenic orientation hike and twilight campfire." },
        { day: "Day 2", title: "Summit Trek & Checkout", desc: "Sunrise panorama hike, camp breakfast, and checkout." }
      ],
      featured: false,
      status: "active",
      availableSlots: slots
    };

    const campsites = DB.get("campsites") || [];
    campsites.unshift(newCamp);
    DB.set("campsites", campsites);

    document.getElementById("add-campsite-modal")?.classList.remove("active");
    this.refreshPortalViews();
    showToast(`New Campsite "${title}" created and published live!`, "success");
  },

  deleteCampsite: function(campId) {
    if (!confirm("Are you sure you want to remove this campsite listing?")) return;
    let campsites = DB.get("campsites") || [];
    campsites = campsites.filter(c => c.id !== campId);
    DB.set("campsites", campsites);
    this.refreshPortalViews();
    showToast("Campsite listing removed.", "info");
  },

  // ================= ADMIN PORTAL ACTIONS =================
  bindAdminActions: function() {
    // Admin reset DB
    document.getElementById("btn-admin-reset-db")?.addEventListener("click", () => {
      if (confirm("Reset demo database back to default seed data?")) {
        DB.reset();
      }
    });
  },

  renderAdminDashboard: function() {
    const contractors = DB.get("contractors") || [];
    const campsites = DB.get("campsites") || [];
    const bookings = DB.get("bookings") || [];
    const transactions = DB.get("transactions") || [];

    // Metrics
    const totalGMV = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0) + 1200000;
    const platformCommission = Math.round(totalGMV * 0.05);
    const activeContractorsCount = contractors.filter(c => c.status === "Verified").length;

    document.getElementById("admin-stat-gmv").innerText = `₹${totalGMV.toLocaleString()}`;
    document.getElementById("admin-stat-cut").innerText = `₹${platformCommission.toLocaleString()}`;
    document.getElementById("admin-stat-contractors").innerText = contractors.length;
    document.getElementById("admin-stat-bookings").innerText = bookings.length + 420;

    // Contractor KYC Table
    const kycBody = document.getElementById("admin-contractor-kyc-table");
    if (kycBody) {
      kycBody.innerHTML = contractors.map(c => `
        <tr>
          <td>
            <strong>${c.name}</strong><br>
            <small class="text-muted">Lead: ${c.owner} &bull; ${c.phone}</small>
          </td>
          <td><code>${c.licenseNumber}</code></td>
          <td>${c.serviceRegion}</td>
          <td><span class="badge ${c.status === 'Verified' ? 'badge-success' : 'badge-warning'}">${c.status}</span></td>
          <td>${c.safetyAudit}</td>
          <td>
            ${c.status !== 'Verified' ? `
              <button class="btn btn-sm btn-success" onclick="App.approveContractor('${c.id}')"><i class="ph ph-check"></i> Approve</button>
            ` : `
              <button class="btn btn-sm btn-outline" onclick="showToast('Contractor audit report verified.', 'info')">Audit Log</button>
            `}
          </td>
        </tr>
      `).join('');
    }

    // Transactions Table
    const txBody = document.getElementById("admin-transactions-table");
    if (txBody) {
      txBody.innerHTML = transactions.map(tx => `
        <tr>
          <td><code>${tx.txId}</code></td>
          <td>${tx.bookingId}</td>
          <td>${tx.customer}</td>
          <td>${tx.date}</td>
          <td><strong>₹${tx.amount.toLocaleString()}</strong></td>
          <td>₹${tx.platformCut.toLocaleString()}</td>
          <td>${tx.gateway}</td>
          <td><span class="badge ${tx.status === 'Success' ? 'badge-success' : 'badge-danger'}">${tx.status}</span></td>
          <td>
            ${tx.status === 'Success' && tx.refundable ? `
              <button class="btn btn-sm btn-outline-danger" onclick="App.refundTransaction('${tx.txId}')">Refund</button>
            ` : `<span class="text-muted small">Processed</span>`}
          </td>
        </tr>
      `).join('');
    }

    // Campsite Moderation Table
    const modBody = document.getElementById("admin-moderation-table");
    if (modBody) {
      modBody.innerHTML = campsites.map(c => `
        <tr>
          <td><strong>${c.title}</strong></td>
          <td>${c.contractor.name}</td>
          <td>₹${c.pricePerNight}/N</td>
          <td><span class="badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}">${c.status}</span></td>
          <td>
            ${c.status === 'pending_approval' ? `
              <button class="btn btn-sm btn-success" onclick="App.approveCampsite('${c.id}')">Publish</button>
            ` : `
              <button class="btn btn-sm ${c.featured ? 'btn-warning' : 'btn-outline'}" onclick="App.toggleFeatureCampsite('${c.id}')">
                ${c.featured ? '<i class="ph-fill ph-star"></i> Featured' : '<i class="ph ph-star"></i> Feature'}
              </button>
            `}
          </td>
        </tr>
      `).join('');
    }
  },

  approveContractor: function(contId) {
    const contractors = DB.get("contractors") || [];
    const c = contractors.find(item => item.id === contId);
    if (c) {
      c.status = "Verified";
      c.safetyAudit = "Passed (A Grade)";
      DB.set("contractors", contractors);
      this.refreshPortalViews();
      showToast(`Contractor "${c.name}" KYC Approved!`, "success");
    }
  },

  approveCampsite: function(campId) {
    const campsites = DB.get("campsites") || [];
    const c = campsites.find(item => item.id === campId);
    if (c) {
      c.status = "active";
      DB.set("campsites", campsites);
      this.refreshPortalViews();
      showToast(`Campsite "${c.title}" approved and published to public marketplace!`, "success");
    }
  },

  toggleFeatureCampsite: function(campId) {
    const campsites = DB.get("campsites") || [];
    const c = campsites.find(item => item.id === campId);
    if (c) {
      c.featured = !c.featured;
      DB.set("campsites", campsites);
      this.refreshPortalViews();
      showToast(`Campsite "${c.title}" ${c.featured ? 'is now Featured' : 'unfeatured'}!`, "info");
    }
  },

  refundTransaction: function(txId) {
    if (!confirm(`Are you sure you want to initiate a full refund for transaction ${txId}?`)) return;
    
    const transactions = DB.get("transactions") || [];
    const tx = transactions.find(t => t.txId === txId);
    if (tx) {
      tx.status = "Refunded";
      tx.refundable = false;
      DB.set("transactions", transactions);

      // Update booking status
      const bookings = DB.get("bookings") || [];
      const b = bookings.find(item => item.id === tx.bookingId);
      if (b) {
        b.bookingStatus = "Cancelled & Refunded";
        b.paymentStatus = "Refunded";
        DB.set("bookings", bookings);
      }

      this.refreshPortalViews();
      showToast(`Refund of ₹${tx.amount.toLocaleString()} processed back to customer.`, "success");
    }
  }
};

// Toast Notification Helper
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "ph-info";
  if (type === "success") icon = "ph-check-circle";
  if (type === "warning") icon = "ph-warning";
  if (type === "error") icon = "ph-x-circle";

  toast.innerHTML = `
    <i class="ph ${icon}"></i>
    <div class="toast-content">${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

window.App = App;
window.showToast = showToast;

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
