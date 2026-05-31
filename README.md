# 🌾 Agri-Tech - Smart Farming Management System

A full-stack web application designed to empower farmers with modern digital tools for efficient farm management, crop tracking, weather forecasting, and agricultural resource optimization. Built using the **MVC architecture** with **Role-Based Access Control** for seamless interaction between Farmers and Administrators.

![Status](https://img.shields.io/badge/Status-Complete-success)
![License](https://img.shields.io/badge/License-MIT-blue)

---

##  Overview

Agri-Tech bridges the gap between traditional farming and modern technology by providing a scalable, user-friendly platform for agricultural productivity. The system simplifies daily farm operations through centralized dashboards, real-time weather integration, crop lifecycle tracking, and a digital marketplace for seeds, fertilizers, and equipment.

The backend follows the **Model-View-Controller (MVC)** pattern for modularity and maintainability, while the frontend leverages **React + Vite** for a fast, responsive user experience. Secure JWT authentication ensures role-specific access, allowing Farmers to manage their operations and Administrators to oversee platform content, users, and analytics.

---

## ✨ Key Features

### 👨🌾 Farmer Module
- ** Farm Dashboard** – Centralized overview of farm statistics, quick actions, and activity tracking.
- **🌱 Crop Management** – Add crops, link them to specific farms, and track growth stages (`Planted → Growing → Flowering → Ready → Harvested`).
- **️ Weather Forecasting** – Real-time weather data via OpenWeatherMap API (city search & auto-location).
- **📚 Crop Information Database** – Detailed agricultural guides for 12+ common crops (sowing/harvest times, soil needs, fertilizers, pesticides).
- ** Resource Marketplace** – Browse, filter, and purchase agricultural products with live stock tracking.
- **📦 Order Management** – Track purchase history, quantities, prices, and delivery statuses (`Pending → Shipped → Delivered`).
- **👥 Role-Based Navigation** – Clean, intuitive interface tailored specifically to farming workflows.

### ‍💼 Admin Module
- ** Analytics Dashboard** – Interactive charts (Recharts) visualizing total users, farms, products, and orders.
- **👥 User Management** – View, edit, or remove farmer/admin accounts.
- **🛍️ Product Management** – Add, edit, or remove marketplace resources with image URLs, pricing, and stock levels.
- **📋 Order Oversight** – Monitor all platform orders and manually update shipping/delivery statuses.
- **🔒 Secure Authentication** – JWT-based session management with protected routes and middleware validation.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18 + Vite** | Fast, modern SPA development |
| **React Router DOM** | Client-side routing & protected paths |
| **Axios** | HTTP client with JWT interceptor |
| **Recharts** | Data visualization & analytics |
| **React Icons** | Consistent UI iconography |
| **Custom CSS3** | Responsive design system (no heavy frameworks) |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | RESTful API framework |
| **MongoDB** | NoSQL document database |
| **Mongoose** | ODM for schema validation & modeling |
| **JWT + Bcrypt** | Secure authentication & password hashing |
| **dotenv + cors** | Environment management & cross-origin support |

### External Services
- **OpenWeatherMap API** – Real-time meteorological data
- **Postman** – API testing & debugging
- **Git & GitHub** – Version control & collaboration

---

## 💻 System Requirements

| Category | Specification |
|----------|---------------|
| **OS** | Windows 10/11, macOS, or Linux |
| **Node.js** | v16.0 or higher |
| **npm** | v8.0 or higher |
| **MongoDB** | v5.0+ (Local or MongoDB Atlas) |
| **RAM** | 8 GB minimum (16 GB recommended) |
| **Storage** | ≥ 1 GB free space |
| **Display** | 1366×768 or higher |
| **Browser** | Chrome, Firefox, Edge, or Safari (latest) |

---

## 📥 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/GravityDefied4/agritech.git
cd agritech
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Database Setup
- Ensure MongoDB is running locally (`mongod`), or create a free cluster on **MongoDB Atlas**.
- Update your `.env` file with the correct connection string.

---

## ⚙️ Configuration
Create a `.env` file in the backend/ directory:
```env
# Server
PORT=8000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/agritech

# Security
JWT_SECRET=your_super_secure_random_string_here

# External APIs
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### 🔑 Getting OpenWeatherMap API Key:
1. Sign up at **OpenWeatherMap**
2. Go to **API Keys** in your dashboard
3. Copy the key and paste it into .env

## Running the Application
Open two terminal windows/tabs:
### Terminal 1: Backend
```bash
cd backend
npm run dev
# Server starts on http://localhost:8000
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# App starts on http://localhost:3000
```

### 🔐 First-Time Setup:
1. Navigate to **http://localhost:3000**
2. Click **Register** and choose whether to create a farmer account or admin account
3. Log in to access the Dashboard

## 📁 Project Structure
```
agritech/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Business logic (Auth, Farm, Crop, Order, Product, Admin)
│   ├── middleware/      # JWT auth & role verification
│   ├── models/          # Mongoose schemas (User, Farm, Crop, Product, Order)
│   ├── routes/          # API endpoint definitions
│   ├── .env             # Environment variables (gitignored)
│   ├── index.js         # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── crops/       # Local crop images
│   ├── src/
│   │   ├── components/  # Reusable UI (Navbar)
│   │   ├── pages/       # Route views (Dashboard, Login, Admin, etc.)
│   │   ├── services/    # Axios API instance
│   │   ├── App.jsx      # Router configuration
│   │   ├── index.css    # Global styling & design tokens
│   │   └── main.jsx     # React entry point
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints
### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | ❌ No |
| POST | `/api/users/login` | User login & get JWT token | ❌ No |

### Farms (Protected)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/farms` | Get all farms for logged-in user | ✅ Yes |
| POST | `/api/farms` | Create a new farm | ✅ Yes |

### Crops (Protected)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/crops` | Get all crops for logged-in user | ✅ Yes |
| POST | `/api/crops` | Add a new crop | ✅ Yes |
| PUT | `/api/crops/:id/status` | Update crop growth stage | ✅ Yes |

### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all marketplace products | ❌ No |
| POST | `/api/products` | Add new product (Admin only) | ✅ Admin |
| PUT | `/api/products/:id` | Update product (Admin only) | ✅ Admin |
| DELETE | `/api/products/:id` | Delete product (Admin only) | ✅ Admin |

### Orders (Protected)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders` | Create a new order/purchase | ✅ Yes |
| GET | `/api/orders/my-orders` | Get current user's orders | ✅ Yes |
| GET | `/api/orders` | Get all orders (Admin only) | ✅ Admin |
| PUT | `/api/orders/:id/status` | Update order status (Admin only) | ✅ Admin |

### Admin (Admin Only)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/analytics` | Get system analytics & stats | ✅ Admin |
| GET | `/api/admin/users` | Get all registered users | ✅ Admin |
| PUT | `/api/admin/users/:id` | Update user details | ✅ Admin |
| DELETE | `/api/admin/users/:id` | Delete a user | ✅ Admin |

### Weather
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/weather?city={city}` | Get weather by city name | ❌ No |
| GET | `/api/weather?lat={lat}&lon={lon}` | Get weather by coordinates | ❌ No |

**Notes:**
- All protected routes require a valid JWT token in the Authorization header: `Bearer <token>`
- Admin routes require the user to have `role: "admin"` in their JWT token
- Replace `:id` with the actual MongoDB document ID

## 👥 Creator & Credits
**Developed by**: Zedekiah Heteroza  
**Course**: Bachelor of Science in Information Technology  
**Institution**: Universidad de Dagupan  
**Year**: 2026

## 📄 License
This project is licensed under the **MIT License** for academic and demonstration purposes.  
© 2026 Agri-Tech. All rights reserved.