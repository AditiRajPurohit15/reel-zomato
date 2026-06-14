# 🍔 Reel Zomato — Backend

> Backend services powering the Reel Zomato platform.

This repository contains the **backend** of **Reel Zomato**, built using **Node.js, Express.js, MongoDB, and Mongoose**. It provides secure authentication, role-based authorization, REST APIs, and data management for users and food partners.

## 🌐 Links

**Frontend Repository:**(https://github.com/AditiRajPurohit15/reel-zomato-client)
**Frontend Demo:** (https://reel-zomato-client-abfc.vercel.app/login)

**Backend API:** (https://reel-zomato-1.onrender.com)

---

# ✨ Features

## Authentication

* User Registration
* User Login
* Google OAuth
* Food Partner Registration
* Food Partner Login
* JWT Authentication
* Logout

---

## Food APIs

* Upload food reels
* Fetch reels
* Delete uploaded reels

---

## Likes & Saves

* Toggle Like
* Toggle Save
* Optimistic count support

---

## Comment System

* Create comments
* Nested replies
* Delete comments
* Delete replies
* Cascade deletion
* Comment count tracking

---

## Security

* JWT Authentication
* Role-based Authorization
* Protected Routes
* Middleware-based access control

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer

---

# 📂 Backend Structure

```text
backend
│
├── controllers
├── db
├── middleware
├── models
├── routes
└── services
```

---

# 🚀 Installation

```bash
git clone <https://github.com/AditiRajPurohit15/reel-zomato>

cd server

npm install

npm run dev
```

---

# 🏗️ Architecture Highlights

* RESTful API design
* Role-based authentication
* Modular controller-service architecture
* Parent-child relationship for nested comments
* Optimistic update support
* Cascade deletion for comment threads
* Derived counters for likes, saves, and comments

---

# 👩‍💻 Author

**Aditi Raj Purohit**

This backend was built to learn production-style backend engineering, focusing on authentication, authorization, scalable APIs, and database design rather than simply implementing CRUD functionality.
