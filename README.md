# NeedBridge – All-in-One Community Support Platform

> **Tagline:** Connecting Needs. Empowering People.  
> **Main Motto:** *"Connecting people who need help with people who can provide help through one accessible platform."*

NeedBridge is a complete, modern, responsive full-stack community web application designed for a college-level computer science capstone project. It bridges community resource sharing by enabling users to post their needs and offer solutions across products, local services, education, jobs, donations, lost & found, healthcare contacts, and local events.

---

## 🌟 Key Highlights & Features

1. **8 Main Comprehensive Categories**:
   - **Products and Daily Essentials**: Food, groceries, clothes, books, furniture, second-hand items, and free giveaways.
   - **Education and Learning**: Tutors, study partners, notes, online courses, and skill-sharing.
   - **Jobs and Opportunities**: Full-time, part-time, internships, freelancing, and volunteer positions.
   - **Community Support**: Elderly assistance, disability support, food drives, and emergency aid.
   - **Local Services**: Electricians, plumbers, mechanics, home cleaning, and transport assistance.
   - **Lost and Found**: Documents, mobile phones, wallets, lost & found pets.
   - **Health and Care Resources**: Blood donation contacts, clinics, pharmacies, and health camps *(with prominent medical disclaimer banner prohibiting clinical diagnosis)*.
   - **Events and Announcements**: Community workshops, government schemes, and neighborhood events.

2. **Smart Need-to-Offer Matching Algorithm (100-Point Rule Engine)**:
   - **Category Match (40 pts)**: Exact subcategory match = 40 pts; same category = 30 pts.
   - **Keyword Overlap (25 pts)**: Stopword-filtered tokenization comparing need & offer titles/descriptions.
   - **Location Proximity (20 pts)**: Same city + neighborhood = 20 pts; same city = 15 pts; remote/flexible = 10 pts.
   - **Budget Suitability (15 pts)**: Free donation match = 15 pts; offer price within user budget = 15 pts; close budget = 8 pts.
   - Ranks matches from highest to lowest, displays a percentage bar, and outputs human-readable explanations.

3. **Unified Smart Search**:
   - Single omni-search bar that searches across all eight categories simultaneously.
   - Filters by keyword, type (Needs vs Offers), category, subcategory, city, neighborhood area, cost (Free/Donated vs Paid), urgency, and availability.

4. **Location-Based Discovery & Privacy Protection**:
   - Interactive OpenStreetMap and Leaflet.js map integration.
   - Visual map pins for both Needs (Red) and Offers (Teal).
   - Strict privacy safeguards: Doorstep addresses are never published; only generalized neighborhood centers are mapped.

5. **Complete Request Lifecycle Management**:
   - Multi-state request transitions: `Pending` ➔ `Accepted` / `Rejected` ➔ `In Progress` ➔ `Completed` / `Cancelled`.
   - In-app notification alerts upon status changes.
   - Requester and provider can review and track milestones.

6. **Safety, Trust & Verification**:
   - User and organization verification badge request workflow with document proof submission.
   - Ratings and reviews (1–5 stars) on completed community exchanges.
   - Listing reporting system with reason classification for admin moderation.
   - Direct private messaging with timestamps and unread counters.

7. **Multilingual-Ready Interface**:
   - Built-in live language switcher supporting English, Hindi (हिन्दी), Telugu (తెలుగు), Tamil (தமிழ்), and Spanish (Español).

8. **Protected Administrator Console (`admin.html`)**:
   - Protected route requiring `Administrator` role (cannot be self-assigned publicly).
   - Real-time 8-metric dashboard: Total Users, Active Listings, Needs, Offers, Pending Requests, Completed Requests, Pending Verifications, Reported Listings.
   - Actions: User account suspension/reactivation, verification approvals/rejections, listing deletions, and report resolution.

---

## 📂 Project Structure

```
needbridge/
├── index.html                 # Modern Landing Page with hero search, categories, stats, map
├── explore.html               # Unified Search & Discovery (Grid & Leaflet Map Views)
├── post-need.html             # Post a Need form with immediate matching suggestions
├── offer-help.html            # Offer Help form (Free donation or paid pricing)
├── listing-details.html       # Dynamic Listing Details, Request modal, Reviews, Reporting
├── dashboard.html             # User Dashboard (Needs, Offers, Requests, Matches, Saved, Profile)
├── messages.html              # Direct Private Community Messaging
├── admin.html                 # Protected Administrator Dashboard & Moderation Console
├── about.html                 # About Us, Mission, Safety Guidelines, Project Pillars
├── privacy.html               # Privacy Policy, Terms, Minor Safeguards, Medical Disclaimer
├── auth.html                  # Sign In & Registration with Demo Account Quick Switcher
│
├── css/
│   ├── styles.css             # Navy Blue (#0f2b48) & Teal (#0d9488) design system
│   └── components.css         # Cards, Hero, Chat bubbles, Map container, Badges
│
├── js/
│   ├── firebase-config.js     # Firebase credentials & initialization handler
│   ├── db.js                  # Dual-Mode Database Layer (Cloud Firestore + LocalStore DB)
│   ├── auth.js                # Auth & Session Manager (Role enforcement & login)
│   ├── matching.js            # 100-Point Rule-Based Matching Engine
│   ├── app.js                 # Universal Navbar, Notifications, Toasts, Footer
│   ├── home.js                # Homepage dynamic listings, stats & preview map
│   ├── explore.js             # Advanced search, multi-filter, and Leaflet map markers
│   ├── post-need.js           # Post Need submission & instant match popup
│   ├── offer-help.js          # Offer Help submission & validation
│   ├── listing-details.js     # Listing loader, request trigger, reviews, and reporting
│   ├── dashboard.js           # Tab controllers, request lifecycle, and match runner
│   ├── messages.js            # Chat conversation manager & real-time messaging
│   ├── admin.js               # Admin statistics, user moderation, report review
│   └── i18n.js                # Multilingual translations dictionary & switcher
│
├── assets/
│   └── logo.svg               # Vector brand logo (Hands/Bridge & Heart Apex)
│
├── firestore.rules            # Production-grade Firestore Security Rules
├── storage.rules              # Firebase Storage Security Rules
├── server.js                  # Zero-dependency local Node.js test server
└── package.json               # Package metadata and npm test scripts
```

---

## 🚀 How to Run Locally

### Option 1: Using the Built-In Node Server (Recommended)
You do not need any external npm packages! Simply run:
```bash
node server.js
```
Then open your browser and navigate to:
```
http://localhost:3000
```

### Option 2: Direct File Open / Live Server
Because NeedBridge uses standard modular JavaScript and CDN libraries (Bootstrap 5, Leaflet.js, Firebase Compat), you can also simply double-click `index.html` or open the folder with VS Code **Live Server** (`npx serve .`).

---

## 🔑 Demo Accounts for Evaluation

To make testing and demonstration effortless for college evaluators and teachers, the app includes pre-seeded accounts accessible via the **"Demo Role"** dropdown button in the top navigation bar:

| Role | Email | Password | Perspective |
| :--- | :--- | :--- | :--- |
| **Regular User** | `user@needbridge.org` | `password123` | Priya Sharma (Student & Volunteer; has posted needs & offers) |
| **Service Provider** | `provider@needbridge.org` | `password123` | Ramesh Kumar (Licensed Electrician; has requests & services) |
| **Organization** | `org@needbridge.org` | `password123` | Hope Community Foundation (Verified NGO running food relief) |
| **Administrator** | `admin@needbridge.org` | `password123` | NeedBridge Admin (Has full access to `admin.html` console) |

*You can also register brand-new accounts on the `auth.html` page.*

---

## 🔥 Firebase Setup Instructions

NeedBridge is built to work in **Dual-Mode**:
1. **Out-of-the-Box Mode**: If Firebase credentials are left as placeholders, the platform runs on a high-fidelity, persistent database engine (`localStorage` + mock collections) so evaluators can test 100% of the functionality immediately.
2. **Production Firebase Mode**: Connects directly to Google Cloud Firestore, Firebase Auth, and Storage.

### Steps to Connect Live Firebase:
1. Visit the [Firebase Console](https://console.firebase.google.com/) and create a project named `needbridge`.
2. Navigate to **Authentication** ➔ Click **Get Started** ➔ Enable the **Email/Password** provider.
3. Navigate to **Firestore Database** ➔ Click **Create Database** ➔ Start in test mode or production mode.
4. Copy the contents of `firestore.rules` from this repository into the **Rules** tab in the Firebase Firestore Console and click **Publish**.
5. Navigate to **Storage** ➔ Enable Firebase Storage ➔ Paste the contents of `storage.rules` into the **Rules** tab and click **Publish**.
6. In **Project Settings** ➔ **General** ➔ Under **Your apps**, click the **Web icon (`</>`)** to register a web app.
7. Copy the `firebaseConfig` object and paste it into `js/firebase-config.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:..."
   };
   ```
8. Save the file. NeedBridge will automatically detect the real API key and connect to live Google Cloud Firebase services!

---

## 🗄️ Database Schema & Collections

| Collection | Key Fields | Description |
| :--- | :--- | :--- |
| `users` | `uid`, `name`, `email`, `phone`, `city`, `area`, `role`, `bio`, `isVerified`, `isSuspended`, `avatar`, `createdAt` | Registered members, providers, and admins |
| `categories` | `id`, `name`, `icon`, `color`, `description`, `subcategories` | 8 main community categories and subcategories |
| `needs` | `id`, `userId`, `userName`, `title`, `description`, `category`, `subcategory`, `location`, `budget`, `isFree`, `urgency`, `requiredDate`, `imageUrl`, `status` | Needs posted by community members |
| `offers` | `id`, `userId`, `userName`, `title`, `description`, `category`, `subcategory`, `location`, `price`, `isFree`, `availability`, `imageUrl`, `status` | Offered goods, tutoring, services, and donations |
| `requests` | `id`, `listingId`, `listingTitle`, `requesterId`, `providerId`, `message`, `neededDate`, `status`, `createdAt` | Formal transaction lifecycle between users |
| `conversations` | `id`, `participants`, `participantDetails`, `lastMessage`, `lastMessageAt`, `unreadCounts` | Private chat threads between pairs of users |
| `messages` | `id`, `conversationId`, `senderId`, `senderName`, `text`, `timestamp`, `read` | Individual encrypted chat messages |
| `reviews` | `id`, `listingId`, `targetUserId`, `reviewerId`, `reviewerName`, `rating`, `comment`, `createdAt` | 1–5 star community feedback and reviews |
| `reports` | `id`, `listingId`, `listingTitle`, `reportedBy`, `reason`, `details`, `status`, `createdAt` | Content moderation flags reviewed in Admin panel |
| `notifications` | `id`, `userId`, `title`, `message`, `link`, `type`, `read`, `createdAt` | Bell dropdown notifications for requests and matches |
| `verificationRequests` | `id`, `userId`, `userName`, `orgName`, `docType`, `notes`, `status`, `createdAt` | Verification applications reviewed by admin |

---

## 🌐 Deployment Instructions

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set public directory to '.' (current directory)
# Configure as a single-page app: No
firebase deploy
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

## 🎓 Academic Integrity & Disclaimer
This application is created as a complete full-stack web development demonstration for academic computer science evaluation. All health listings are for demonstration and community public awareness only; NeedBridge does not provide clinical medical diagnosis or treatment.
