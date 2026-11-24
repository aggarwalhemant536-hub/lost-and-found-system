# LPU Lost & Found System
**A centralized campus belongings portal for Lovely Professional University (LPU)**

*Made by: [Your Name] | Registration No: [Your Reg No] | Section: [Section]*  
*Lovely Professional University, Phagwara, Punjab*

---

## 📌 Project Overview
The **LPU Lost & Found System** is a lightweight, frontend-only web application designed specifically for LPU students, faculty, and campus staff. It enables anyone on campus to report lost belongings, post items they found, search/filter through active listings with real-time feedback, and submit proof verification claims to recover lost items safely.

The application requires **zero external build tools, no Node.js, and no backend server**. Everything runs directly in any modern web browser using **HTML5, CSS3, vanilla JavaScript, and browser `localStorage`**.

---

## 📁 File Structure
```text
LPU Lost and found system/
│
├── index.html       # Homepage with live feed, animated stats, and multi-filter search
├── post.html        # Form to report Lost or Found items with photo upload
├── item.html        # Detailed item view with status tracking timeline & claim modal
├── admin.html       # Admin moderation panel to verify claims, return items & delete spam
├── login.html       # Student login with registration number
├── style.css        # Shared LPU orange & dark grey responsive stylesheet
├── script.js        # Main JavaScript business logic and DOM manipulation
├── data.js          # Pre-loaded realistic sample campus items & notifications
└── README.md        # Documentation and running guide
```

---

## ✨ Key Features

1. **Post an Item (`post.html`)**:
   - Easy toggle between **Lost** (red) and **Found** (green).
   - Item name, category selection, campus location dropdown (Block 32, Block 34, Block 38, Unipolis, Uni Mall, Library, Ground, Food Court, Hostel, Other).
   - Photo upload with immediate preview, converted and stored as Base64 in `localStorage` (with automatic fallback to clean category SVG art if no photo is attached).
   - Comprehensive client-side form validation with descriptive error messages.

2. **Browse, Search & Multi-Filter (`index.html`)**:
   - **Live instant search bar** filtering title, description, category, and location as you type.
   - Filter simultaneously by **Type** (Lost / Found), **Category**, **Campus Location**, and **Status**.
   - Sort by **Newest First** or **Oldest First**.
   - Empty-state message with a one-click reset button when no results match.

3. **Status Tracking & Lifecycle (`item.html`)**:
   - Items progress through four clear lifecycle stages:  
     `Open` ➔ `Claim Pending` ➔ `Verified` ➔ `Returned`.
   - Visual numbered progress timeline tracker on each item page.

4. **Claim Request & Proof Verification Modal**:
   - Students can claim an item by answering security verification questions (e.g. describing secret marks, stickers, PIN/lock details, or contents).
   - Submissions automatically set item status to **Claim Pending** and notify the admin and owner.

5. **Admin Moderation Panel (`admin.html`)**:
   - Simple admin login:
     - **Username**: `admin`
     - **Password**: `admin123`
   - Moderate all posts, review claimant verification answers, approve or reject claims, mark items as returned, or delete spam posts.
   - Includes a **"Reset Sample Data"** button for quick re-testing.

6. **Notification System**:
   - Interactive notification bell in the navigation bar with an unread badge counter.
   - Dropdown showing recent campus updates (new posts, claims received, returned items) with a "Mark read" button.

7. **Animated Homepage Statistics**:
   - Animated number counters on initial page load:
     - Total Items Reported
     - Belongings Returned
     - Active Search Items

8. **Toast Popups & Student Identity**:
   - Clean, non-intrusive toast popups for all user actions instead of browser `alert()`.
   - Student session management using LPU registration number, pre-filling contact info across forms.

---

## 🚀 How to Run the Project

1. **Option 1: Direct File Opening (Easiest)**
   - Double-click `index.html` or right-click `index.html` and choose **Open With > Google Chrome** (or Edge / Firefox / Safari).
   - Everything will work instantly with 10 realistic sample campus items pre-loaded!

2. **Option 2: Using VS Code Live Server (Optional)**
   - Open the project folder in VS Code.
   - Right-click `index.html` and select **"Open with Live Server"**.
   - Access the app at `http://127.0.0.1:5500/index.html`.

---

## 🔐 Credentials for Testing

- **Admin Moderation Portal (`admin.html`)**:
  - Username: `admin`
  - Password: `admin123`
- **Student Login (`login.html`)**:
  - Click the **"Auto Fill"** demo button to test with sample student *Aman Sharma (Reg No: 12214582)*, or type your own registration number.

---

## 🔮 Future Improvements
For future semesters or production deployment, the following enhancements are planned:
- **Backend Database**: Integration with Node.js/Express and MongoDB/PostgreSQL to sync data across all campus devices.
- **University Email & SMS Alerts**: Automated email/SMS notifications via the LPU UMS / SMS Gateway when an item matching a student's report is posted.
- **QR Code Belonging Tags**: Generating printable QR code stickers that students can stick onto calculators, water bottles, and laptops. Scanning the QR code immediately opens a lost/found report for that item.
- **Automated Image Matching**: AI-assisted image similarity detection to automatically match newly uploaded found items with existing lost reports.
