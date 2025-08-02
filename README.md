# BuildMate - Building Management System (Client-Side)

This is the client-side of "BuildMate," a full-stack, responsive web application designed as a comprehensive Building Management System. It provides distinct functionalities for regular users, members (tenants), and an administrator to manage a single building efficiently.

<div align="center">

[![Live Site](https://img.shields.io/badge/Live_Site-my--house.web.app-blue?style=for-the-badge&logo=firebase)](https://my-house-6de15.web.app/)
[![Server Repo](https://img.shields.io/badge/Server_Repo-GitHub-333?style=for-the-badge&logo=github)](https://github.com/nazmulxdev/Building-Management-system-Server)
[![Live API](https://img.shields.io/badge/Live_API-Online-blueviolet?style=for-the-badge)](https://my-house-server.vercel.app/)

</div>

---

### **Project Overview**

The objective of this project is to deliver a robust and user-friendly platform for managing building operations. This includes apartment listings, user agreements, a secure payment system, announcements, and role-based dashboards. The application is built with a modern tech stack, ensuring a seamless and responsive user experience on all devices.

---

### **Key Features**

✅ **Role-Based Access Control:**

- **User Role:** Can browse apartments and make agreement requests.
- **Member Role:** Has a dedicated dashboard to make payments, view payment history, and see announcements.
- **Admin Role:** Full control over the system, including member management, agreement approvals, coupon management, and posting announcements.

✅ **Secure Payments with Coupon System:**

- Integrates **Stripe** for secure, card-based payment processing.
- Members can apply valid coupon codes on the payment page to receive a percentage-based discount on their rent before finalizing the transaction.

✅ **Interactive Home Page:**

- A dynamic banner with auto-sliding images.
- An "About the Building" section with elegant typography.
- A dedicated section to display available coupons.
- An integrated map (Leaflet) showing the building's location.

✅ **Apartment Browsing & Agreements:**

- A paginated list of all available apartments (6 per page).
- Search functionality to filter apartments by a specific rent range.
- Users can request an agreement for an apartment, which is then sent to the admin for approval.

✅ **Secure Authentication:**

- Email/Password and Google-based login and registration system.
- Password validation (uppercase, lowercase, min. 6 characters).
- JWT-based authentication to protect private routes and user data.

✅ **Comprehensive Dashboards:**

- **User/Member:** View personal profile information and announcements.
- **Member:** Access the secure payment page and view a detailed payment history.
- **Admin:** A powerful dashboard to manage members, approve/reject agreements, create and manage coupons, and post announcements.
- **Admin Profile:** Displays key statistics like total rooms, available/unavailable room percentages, and user/member counts.

---

### **Technologies & Dependencies**

This project is built with the following technologies and packages:

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=tanstack&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

- **UI & Components:** `@mantine/core`, `daisyui`, `react-icons`, `lottie-react`
- **Data Fetching & State:** `@tanstack/react-query`, `axios`
- **Routing:** `react-router`
- **Forms:** `react-hook-form`
- **Payments:** `@stripe/react-stripe-js`, `@stripe/stripe-js`
- **Maps:** `leaflet`, `react-leaflet`
- **Charts & Visuals:** `recharts`
- **Notifications:** `react-hot-toast`, `sweetalert2`
- **Animations:** `framer-motion`

---

### **Getting Started Locally**

Follow these steps to run the client-side on your local machine:

**1. Clone the repository:**

```bash
git clone [https://github.com/nazmulxdev/Building-Management-system-Client.git](https://github.com/nazmulxdev/Building-Management-system-Client.git)
```

**2. Navigate to the project directory:**

```bash
cd b11a12-client-side-nazmulxdev
```

**3. Install NPM packages:**

```bash
npm install
```

**4. Set up environment variables:**
Create a file named `.env.local` in the root directory and add the following keys:

```.env.local
# Your Firebase configuration keys
VITE_APIKEY=your_firebase_apikey
VITE_AUTHDOMAIN=your_firebase_authdomain
VITE_PROJECTID=your_firebase_projectid
VITE_STORAGEBUCKET=your_firebase_storagebucket
VITE_MESSAGINGSENDERID=your_firebase_messagingsenderid
VITE_APPID=your_firebase_appid

# Your Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**5. Run the project:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---
