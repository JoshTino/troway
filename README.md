# 🚛 TroWay - Waste Management & Reporting System

TroWay is a full-stack waste management platform that enables citizens to report waste-related issues while allowing administrators to monitor reports, assign cleanup tasks, and visualize waste locations on an interactive map.

Built with the MERN stack, TroWay aims to improve environmental sanitation through efficient reporting, tracking, and management of waste incidents.

---

## ✨ Features

### 👤 User Features

- User registration and authentication
- Secure login using JWT
- Report illegal dumpsites or waste issues
- Upload images with reports
- Select waste category
- Automatically capture or specify report location
- Track submitted reports
- Responsive user interface

### 🛠 Admin Features

- Secure admin dashboard
- View all submitted reports
- Assign cleanup tasks to field workers
- Manage users
- Monitor report statistics
- View reports on an interactive map
- Track task assignments

---

## 🗺 Interactive Mapping

TroWay integrates Leaflet to visualize reported waste locations.

Features include:

- Interactive map
- Marker clustering
- Location-based reporting
- Easy identification of waste hotspots

Libraries used:

- React Leaflet
- React Leaflet Cluster
- Leaflet

---

## 🖼 Image Upload

Users can upload images when submitting reports, allowing administrators to better understand each incident.

---

## 🔐 Authentication

Authentication is implemented using:

- JSON Web Tokens (JWT)
- Protected API routes
- Password hashing
- Role-based authorization

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- React Leaflet
- React Leaflet Cluster

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Upload)

---

## 📂 Project Structure

```
troway/
│
├── frontend/
|   ├── components/
│   ├── constants/
│   ├── helpers/
│   ├── protected routes/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── multer/
│   ├── seeders/
│   ├── uploads/
│   └── package.json
│
└── README.md
```

---

## ⚙ Installation

### Clone the repository

```bash
git clone https://github.com/JoshTino/troway.git
```

Navigate into the project

```bash
cd troway
```

---

### Install Backend

```bash
cd server
npm install
```

Start the server

```bash
npm run dev
```

---

### Install Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server folder.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

## 📸 Screenshots

Add screenshots of:

- Login Page
  <img width="1080" height="2408" alt="Screenshot_20260720_033529_Chrome" src="https://github.com/user-attachments/assets/1f7cbc20-d3ca-4eea-9753-37d1a284d46a" />

- Waste Report Form
  <img width="1080" height="2408" alt="Screenshot_20260720_054704_Chrome" src="https://github.com/user-attachments/assets/7a58633f-a9d5-49a7-aebb-fe822722291e" />

- Interactive Map
  <img width="1080" height="2408" alt="Screenshot_20260720_033630_Chrome" src="https://github.com/user-attachments/assets/93669f17-592f-4815-8fac-0dd57983b736" />

- Admin Dashboard
  <img width="1080" height="2408" alt="Screenshot_20260720_033613_Chrome" src="https://github.com/user-attachments/assets/b821489e-9dcf-4e77-9d13-42ed859ce3fd" />


---

## 🚀 Future Improvements

- Email notifications
- Push notifications
- Real-time report updates
- Mobile application
- AI-based waste classification
- Route optimization for waste collection
- Analytics dashboard

---

## 📚 Learning Objectives

TroWay demonstrates practical implementation of:

- RESTful API development
- Authentication & Authorization
- CRUD Operations
- File uploads
- Interactive maps
- Geolocation
- Role-based access control
- MERN Stack architecture

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the project
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Joshua Dangana**

Full Stack Web Developer

GitHub: https://github.com/JoshTino
