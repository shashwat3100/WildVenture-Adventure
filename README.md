# 🏕️ WildVenture - Enterprise Adventure Camping & E-Contractor Ecosystem

> **Internship Project Submission**  
> **Topic**: Adventure Camping Web Application with E-Contractors, Admin Portal, User Explorer, and Interactive Payment Gateway.

---

## 🌟 Executive Summary

**WildVenture** is a full-featured web platform built for wilderness adventure camping, glamping, and survival expeditions. The platform operates as a multi-role marketplace connecting **Campers (Users)**, **E-Contractors (Outdoor Guides/Vendors)**, and **Platform Administrators**, powered by a **PCI-DSS style Interactive Payment Gateway**.

---

## 🚀 Key Modules & Architecture

### 1. 🧭 Camper / User Portal
- **Discovery & Search**: Live destination search by region, dates, party size, and difficulty rating.
- **Dynamic Category Filtering**: Wilderness Treks, Luxury Glamping, Riverside Rapids, and Bushcraft Survival.
- **Expedition Detail Views**: Interactive itinerary timelines, contractor safety certifications, high-altitude specs, and included amenities.
- **Expedition Gear Vault**: Direct add-on gear rental (ultralight tents, sub-zero bags, solar generators) supplied by contractors.
- **Digital Passes & Entry Tickets**: Real-time QR code check-in passes, order history, and downloadable/printable PDF receipts.

### 2. 🏔️ E-Contractor / Guide Hub
- **Vendor KYC & Verification**: Contractor registration, certified lead guide badges, and safety compliance status.
- **Listing Management**: Add new campsites, customize pricing, seasonal schedules, and max camper slots.
- **Attendee Roster**: Live attendee manifest synced with payment gateway, one-click basecamp check-in gate.
- **Financial Analytics**: Net earnings ledger, 5% platform commission calculation, and instant bank payout requests.

### 3. 🛡️ Super Admin Control Center
- **Platform KPIs**: Real-time Gross Merchandise Value (GMV), net platform fee revenue, active verified vendors, and booking count.
- **Contractor KYC Queue**: Review vendor license numbers, verify safety audit reports, and grant instant verification badges.
- **Listing Moderation**: Moderate campsite submissions, toggle featured listings, or unpublish non-compliant tours.
- **Payment Master Ledger**: Inspect every gateway transaction, audit payment methods, and execute one-click customer refunds.

### 4. 💳 Interactive Payment Gateway Engine
- **Multi-Method Support**:
  - **Credit/Debit Card**: 3D interactive flipping card with real-time card number masking, CVV flip, and Luhn card-type detection (Visa/Mastercard/Amex).
  - **UPI / QR Code Simulator**: Scan & pay with 5-minute active countdown timer.
  - **Net Banking & Digital Wallets**: Major banks selector (HDFC, ICICI, SBI, Axis, Kotak) & Apple/Google Pay.
- **Promo Code Engine**: Try `ADVENTURE20` for 20% off or `WILD10` for 10% off.
- **3D-Secure Two-Factor Authentication**: Simulated OTP modal (`123456`) with automatic verification and instant ticket generation.

---

## 🛠️ Technology Stack

- **Frontend Structure**: Semantic HTML5 with accessibility attributes and clean DOM hierarchy.
- **Styling & Design System**: Modern Vanilla CSS with customized HSL/Hex variables, responsive grid/flexbox layouts, card lift micro-interactions, glassmorphism overlays, and 3D card perspective.
- **Application Logic**: Vanilla JavaScript ES6+ (Modular Object pattern, Event delegation, Real-time calculations).
- **State & Data Persistence**: `localStorage` synchronized database with pre-populated seed data for instant testing.
- **Icons & Typography**: Google Fonts (`Syne` + `Plus Jakarta Sans`), Phosphor Icons web fonts.

---

## 💻 How to Run Locally

### Option 1: Direct Browser Launch
Simply double click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local Web Server (VS Code / Live Server / Node)
```bash
# Using npx serve
npx -y serve .

# Or using Python 3
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## 🧪 Demo & Testing Guide

| Role / Feature | How to Test |
| :--- | :--- |
| **Role Switcher** | Click the **User**, **E-Contractor**, or **Admin** pills at the top bar to instantly switch views. |
| **User Booking Flow** | Select any campsite card (e.g. *Pine Ridge Haven*) -> pick dates & add gear -> click **Proceed to Payment Gateway**. |
| **Payment & OTP** | Enter promo code `ADVENTURE20` -> Click **Pay Now** -> Enter OTP `123456` -> View instant entry pass with QR code. |
| **Contractor Check-In** | Switch to **E-Contractor** role -> Check the Attendee Roster -> Click **Check-in** on your newly created booking. |
| **Admin Moderation & Refunds** | Switch to **Admin** role -> Review GMV -> Approve pending contractors or click **Refund** on the master transaction ledger. |

---

## 📁 Project Structure

```text
├── index.html          # Main application interface and modal containers
├── css/
│   └── style.css       # Complete design system, 3D card styles, responsive media queries
├── js/
│   ├── data.js         # Mock database with localStorage persistence and seed records
│   ├── payment.js      # Interactive payment gateway engine, UPI timer, coupon validator, OTP
│   └── app.js          # Main application controller, role switcher, filter engine, modals
└── README.md           # Comprehensive project documentation
```

---
*Developed for Internship Evaluation & Showcase.*
