// ==========================================================================
// WildVenture Adventure Camping Platform - Interactive Payment Gateway Engine
// ==========================================================================

const PaymentEngine = {
  currentCheckout: null,
  activeCoupon: null,
  coupons: {
    "ADVENTURE20": { discountPercent: 20, description: "20% Adventure Explorer Discount" },
    "WILD10": { discountPercent: 10, description: "10% Early Bird Wilderness Pass" },
    "CAMPING500": { flatDiscount: 500, description: "₹500 Off First Campout" }
  },
  qrTimerInterval: null,

  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    // Payment method tab switching
    document.querySelectorAll(".payment-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const method = e.currentTarget.dataset.method;
        this.switchMethod(method);
      });
    });

    // Card Input Live Preview bindings
    const cardNumberInput = document.getElementById("pay-card-number");
    const cardHolderInput = document.getElementById("pay-card-name");
    const cardExpInput = document.getElementById("pay-card-exp");
    const cardCvvInput = document.getElementById("pay-card-cvv");

    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        e.target.value = formatted;
        
        const previewNumber = document.getElementById("card-preview-number");
        if (previewNumber) {
          previewNumber.innerText = formatted.padEnd(19, '•');
        }

        // Detect card type
        const cardTypeElem = document.getElementById("card-type-icon");
        if (val.startsWith("4")) {
          cardTypeElem.innerHTML = '<i class="ph ph-credit-card"></i> Visa';
        } else if (val.startsWith("5")) {
          cardTypeElem.innerHTML = '<i class="ph ph-credit-card"></i> Mastercard';
        } else if (val.startsWith("3")) {
          cardTypeElem.innerHTML = '<i class="ph ph-credit-card"></i> Amex';
        } else {
          cardTypeElem.innerHTML = '<i class="ph ph-credit-card"></i> Card';
        }
      });
    }

    if (cardHolderInput) {
      cardHolderInput.addEventListener("input", (e) => {
        const previewHolder = document.getElementById("card-preview-name");
        if (previewHolder) {
          previewHolder.innerText = e.target.value.toUpperCase() || "YOUR FULL NAME";
        }
      });
    }

    if (cardExpInput) {
      cardExpInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
          e.target.value = val.substring(0, 2) + '/' + val.substring(2);
        } else {
          e.target.value = val;
        }
        const previewExp = document.getElementById("card-preview-exp");
        if (previewExp) {
          previewExp.innerText = e.target.value || "MM/YY";
        }
      });
    }

    if (cardCvvInput) {
      cardCvvInput.addEventListener("focus", () => {
        document.getElementById("interactive-card")?.classList.add("flipped");
      });
      cardCvvInput.addEventListener("blur", () => {
        document.getElementById("interactive-card")?.classList.remove("flipped");
      });
      cardCvvInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        e.target.value = val;
        const previewCvv = document.getElementById("card-preview-cvv");
        if (previewCvv) previewCvv.innerText = val || "•••";
      });
    }

    // Coupon Apply
    document.getElementById("btn-apply-coupon")?.addEventListener("click", () => {
      this.applyCoupon();
    });

    // Pay now trigger
    document.getElementById("btn-process-payment")?.addEventListener("click", () => {
      this.initiatePayment();
    });

    // OTP Verify
    document.getElementById("btn-verify-otp")?.addEventListener("click", () => {
      this.verifyOtpAndComplete();
    });
  },

  openCheckout: function(bookingData) {
    this.currentCheckout = bookingData;
    this.activeCoupon = null;
    document.getElementById("coupon-input").value = "";
    document.getElementById("coupon-message").innerHTML = "";

    this.renderSummary();
    this.switchMethod("card");
    
    const modal = document.getElementById("payment-modal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeCheckout: function() {
    const modal = document.getElementById("payment-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    if (this.qrTimerInterval) clearInterval(this.qrTimerInterval);
  },

  switchMethod: function(method) {
    document.querySelectorAll(".payment-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.method === method);
    });

    document.querySelectorAll(".payment-method-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === `pay-panel-${method}`);
    });

    if (method === "upi") {
      this.startQrTimer();
    } else if (this.qrTimerInterval) {
      clearInterval(this.qrTimerInterval);
    }
  },

  startQrTimer: function() {
    let timeLeft = 300; // 5 minutes
    const timerElem = document.getElementById("qr-countdown");
    if (this.qrTimerInterval) clearInterval(this.qrTimerInterval);

    this.qrTimerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(this.qrTimerInterval);
        if (timerElem) timerElem.innerText = "QR Expired. Please refresh.";
        return;
      }
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      if (timerElem) {
        timerElem.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }, 1000);
  },

  applyCoupon: function() {
    const input = document.getElementById("coupon-input");
    const code = input.value.trim().toUpperCase();
    const msgElem = document.getElementById("coupon-message");

    if (!code) {
      msgElem.innerHTML = `<span class="text-danger">Please enter a promo code.</span>`;
      return;
    }

    if (this.coupons[code]) {
      this.activeCoupon = { code, ...this.coupons[code] };
      msgElem.innerHTML = `<span class="text-success"><i class="ph ph-check-circle"></i> "${code}" applied! ${this.activeCoupon.description}</span>`;
      this.renderSummary();
    } else {
      msgElem.innerHTML = `<span class="text-danger"><i class="ph ph-warning-circle"></i> Invalid coupon code. Try ADVENTURE20 or WILD10</span>`;
    }
  },

  calculateTotals: function() {
    if (!this.currentCheckout) return { base: 0, gear: 0, discount: 0, taxes: 0, total: 0 };

    const { campsite, campers, nights, selectedGear } = this.currentCheckout;
    const baseTotal = campsite.pricePerNight * nights * campers;
    
    let gearTotal = 0;
    if (selectedGear && selectedGear.length > 0) {
      gearTotal = selectedGear.reduce((sum, g) => sum + (g.pricePerDay * g.qty * nights), 0);
    }

    let subtotal = baseTotal + gearTotal;
    let discount = 0;

    if (this.activeCoupon) {
      if (this.activeCoupon.discountPercent) {
        discount = Math.round((subtotal * this.activeCoupon.discountPercent) / 100);
      } else if (this.activeCoupon.flatDiscount) {
        discount = Math.min(subtotal, this.activeCoupon.flatDiscount);
      }
    }

    const taxableAmount = Math.max(0, subtotal - discount);
    const taxesAndSafetyFee = Math.round(taxableAmount * 0.05); // 5% GST & Forest Safety Levy
    const grandTotal = taxableAmount + taxesAndSafetyFee;

    return {
      base: baseTotal,
      gear: gearTotal,
      discount,
      subtotal,
      taxes: taxesAndSafetyFee,
      total: grandTotal
    };
  },

  renderSummary: function() {
    const { campsite, campers, nights, checkIn, checkOut, selectedGear } = this.currentCheckout;
    const totals = this.calculateTotals();

    document.getElementById("summary-camp-title").innerText = campsite.title;
    document.getElementById("summary-dates").innerText = `${checkIn} to ${checkOut} (${nights} Night${nights > 1 ? 's' : ''})`;
    document.getElementById("summary-campers").innerText = `${campers} Camper${campers > 1 ? 's' : ''}`;
    
    document.getElementById("summary-base-rate").innerText = `₹${campsite.pricePerNight.toLocaleString()} × ${nights}N × ${campers}P`;
    document.getElementById("summary-base-amount").innerText = `₹${totals.base.toLocaleString()}`;

    const gearRow = document.getElementById("summary-gear-row");
    if (totals.gear > 0) {
      gearRow.style.display = "flex";
      document.getElementById("summary-gear-amount").innerText = `₹${totals.gear.toLocaleString()}`;
    } else {
      gearRow.style.display = "none";
    }

    const discountRow = document.getElementById("summary-discount-row");
    if (totals.discount > 0) {
      discountRow.style.display = "flex";
      document.getElementById("summary-discount-amount").innerText = `-₹${totals.discount.toLocaleString()}`;
    } else {
      discountRow.style.display = "none";
    }

    document.getElementById("summary-tax-amount").innerText = `₹${totals.taxes.toLocaleString()}`;
    document.getElementById("summary-grand-total").innerText = `₹${totals.total.toLocaleString()}`;
    document.getElementById("btn-pay-amount-label").innerText = `Pay ₹${totals.total.toLocaleString()}`;

    // Update UPI QR Code Amount text
    const upiAmountText = document.getElementById("upi-amount-display");
    if (upiAmountText) upiAmountText.innerText = `₹${totals.total.toLocaleString()}`;
  },

  initiatePayment: function() {
    // Validate inputs based on active tab
    const activeMethodBtn = document.querySelector(".payment-tab-btn.active");
    const method = activeMethodBtn ? activeMethodBtn.dataset.method : "card";

    if (method === "card") {
      const num = document.getElementById("pay-card-number").value.replace(/\s+/g, '');
      const name = document.getElementById("pay-card-name").value.trim();
      const exp = document.getElementById("pay-card-exp").value.trim();
      const cvv = document.getElementById("pay-card-cvv").value.trim();

      if (num.length < 15 || !name || exp.length < 5 || cvv.length < 3) {
        showToast("Please enter valid card details (Name, 16-digit card, MM/YY, CVV)", "error");
        return;
      }
    } else if (method === "upi") {
      const upiId = document.getElementById("pay-upi-id")?.value.trim();
      // allow scan & pay or UPI ID
    }

    // Show simulated 3D-Secure OTP modal
    document.getElementById("otp-phone-last4").innerText = (this.currentCheckout.customerPhone || "98765").slice(-4);
    const otpModal = document.getElementById("otp-modal");
    otpModal.classList.add("active");
  },

  verifyOtpAndComplete: function() {
    const otpInput = document.getElementById("otp-input").value.trim();
    if (!otpInput || otpInput.length < 4) {
      showToast("Please enter the 6-digit OTP (Try: 123456)", "warning");
      return;
    }

    // Process payment success animation
    const btn = document.getElementById("btn-verify-otp");
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Authorizing with Gateway...`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `Verify & Complete Booking`;
      btn.disabled = false;
      document.getElementById("otp-modal").classList.remove("active");
      this.finalizeBooking();
    }, 1200);
  },

  finalizeBooking: function() {
    const totals = this.calculateTotals();
    const activeMethodBtn = document.querySelector(".payment-tab-btn.active");
    const method = activeMethodBtn ? activeMethodBtn.dataset.method : "card";

    let paymentMethodLabel = "Credit Card (Visa ****4242)";
    if (method === "upi") paymentMethodLabel = "UPI Instant Transfer";
    else if (method === "netbanking") paymentMethodLabel = "Net Banking (HDFC Bank)";
    else if (method === "wallet") paymentMethodLabel = "Apple / Google Pay";

    const bookingId = "WV-" + Math.floor(10000 + Math.random() * 90000);
    const txnId = "TXN-" + Math.floor(100000 + Math.random() * 900000);

    const newBooking = {
      id: bookingId,
      campId: this.currentCheckout.campsite.id,
      campTitle: this.currentCheckout.campsite.title,
      customerName: this.currentCheckout.customerName || "Shashwat Explorer",
      customerEmail: this.currentCheckout.customerEmail || "camper@wildventure.io",
      customerPhone: this.currentCheckout.customerPhone || "+91 98765 00112",
      checkIn: this.currentCheckout.checkIn,
      checkOut: this.currentCheckout.checkOut,
      nights: this.currentCheckout.nights,
      campers: this.currentCheckout.campers,
      gearAddons: this.currentCheckout.selectedGear || [],
      totalAmount: totals.total,
      platformFee: Math.round(totals.total * 0.05),
      contractorPayout: Math.round(totals.total * 0.95),
      paymentMethod: paymentMethodLabel,
      paymentStatus: "Completed",
      bookingStatus: "Confirmed",
      contractorId: this.currentCheckout.campsite.contractor.id,
      contractorName: this.currentCheckout.campsite.contractor.name,
      createdAt: new Date().toISOString()
    };

    const newTxn = {
      txId: txnId,
      bookingId: bookingId,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      customer: newBooking.customerName,
      amount: totals.total,
      platformCut: newBooking.platformFee,
      gateway: paymentMethodLabel,
      status: "Success",
      refundable: true
    };

    // Save to Database
    const bookings = DB.get("bookings");
    bookings.unshift(newBooking);
    DB.set("bookings", bookings);

    const transactions = DB.get("transactions");
    transactions.unshift(newTxn);
    DB.set("transactions", transactions);

    // Update contractor stats
    const contractors = DB.get("contractors");
    const contractor = contractors.find(c => c.id === newBooking.contractorId);
    if (contractor) {
      contractor.totalBookings = (contractor.totalBookings || 0) + 1;
      contractor.totalRevenue = (contractor.totalRevenue || 0) + newBooking.contractorPayout;
      contractor.pendingPayout = (contractor.pendingPayout || 0) + newBooking.contractorPayout;
      DB.set("contractors", contractors);
    }

    this.closeCheckout();
    this.renderSuccessReceipt(newBooking, txnId);
    showToast("Payment Successful! Your adventure is booked 🎉", "success");
    
    // Refresh any open dashboards
    if (window.App) {
      App.refreshPortalViews();
    }
  },

  renderSuccessReceipt: function(booking, txnId) {
    const successModal = document.getElementById("success-ticket-modal");
    
    document.getElementById("ticket-booking-id").innerText = booking.id;
    document.getElementById("ticket-camp-title").innerText = booking.campTitle;
    document.getElementById("ticket-customer-name").innerText = booking.customerName;
    document.getElementById("ticket-dates").innerText = `${booking.checkIn} → ${booking.checkOut} (${booking.nights}N)`;
    document.getElementById("ticket-campers").innerText = `${booking.campers} Camper${booking.campers > 1 ? 's' : ''}`;
    document.getElementById("ticket-contractor").innerText = booking.contractorName;
    document.getElementById("ticket-payment-method").innerText = booking.paymentMethod;
    document.getElementById("ticket-amount").innerText = `₹${booking.totalAmount.toLocaleString()}`;
    document.getElementById("ticket-txnid").innerText = txnId;

    // Generate Check-In QR representation
    const qrPlaceholder = document.getElementById("ticket-qr-code");
    if (qrPlaceholder) {
      qrPlaceholder.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WILDVENTURE-PASS-${booking.id}-${encodeURIComponent(booking.customerName)}`;
    }

    successModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

window.PaymentEngine = PaymentEngine;
