# **Patient Health Dashboard for Prior Authorization**

The **Patient Health Dashboard for Prior Authorization** is a full-stack application designed to streamline the management of patient health data and prior authorization (PA) requests. It enables healthcare providers to view, manage, and submit prior authorization requests, while insurance payers can review and approve or deny them.

## **Objective**

Developed as a comprehensive solution, the project allows healthcare providers to manage patient health records and submit prior authorization requests through a dynamic, user-friendly dashboard. It integrates with health data APIs and provides a robust backend for managing requests, authentication, and role-based access control for both healthcare providers and insurance payers.

---

## **Technologies Used**

- **Frontend**: React.js, Tailwind CSS (for responsive design)
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT-based authentication with role-based access for Healthcare Providers and Insurance Payers
- **Database**: MongoDB (via Mongoose)

---

## **Project Structure**

The project consists of two main modules:
1. **Healthcare Providers**: Users can view patient data, submit prior authorization requests, and manage their health dashboard.
2. **Insurance Payers**: Users can review prior authorization requests, approve or deny them, and view past decisions.

---

## **Features**

### **Frontend (React.js)**
- **Patient Dashboard**: Displays a list of patients with detailed health records.
- **Prior Authorization Form**: A submission form for healthcare providers to request authorizations for treatments.
- **Search & Filter**: Easily search through patient records and authorization requests.
- **Responsive Design**: The UI is designed to be mobile-friendly.

### **Backend (Node.js, Express, MongoDB)**
- **Patient Data API**: Fetches patient data from the database and handles submission of prior authorization requests.
- **Authorization API**: Manages prior authorization requests, allowing insurance payers to approve or deny requests.
- **Role-Based Authentication**: JWT authentication with different roles for healthcare providers and insurance payers.

---

## **Project Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/rithasahmed12/Patient-Health-Dashboard-for-PA.git
```

### **2. Backend Setup**

Navigate to the server directory:

```bash
cd Server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=5000
MONGO_URI=mongodb+srv://ahmedrithas48:12345@padashboard.q97li.mongodb.net/?retryWrites=true&w=majority&appName=paDashboard
FRONTEND_URL=http://localhost:5173
JWT_SECRET=itssecretbruh
```

Run the backend server:

```bash
npm run dev
```

### **3. Frontend Setup**

Navigate to the client directory:

```bash
cd ~
cd Client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `Client` directory and add the following environment variable:

```bash
VITE_BASE_URL=http://localhost:5000/
```

Run the React app:

```bash
npm run dev
```

---

## **Usage Instructions**

1. Open your browser and go to the frontend URL: [http://localhost:5173](http://localhost:5173).
2. **Healthcare Providers** can:
    - Log in or sign up.
    - View the patient dashboard with basic information like name, age, and medical history.
    - Submit prior authorization requests through the provided form.
3. **Insurance Payers** can:
    - Log in.
    - Review, approve, or deny prior authorization requests submitted by healthcare providers.
4. Both modules have access to a clean, responsive interface designed for easy navigation and usability.

---

## **API Endpoints**

- **Patient API**
  - `GET /api/patients`: Fetch a list of patients.
  - `POST /api/patients/:id/authorization`: Submit a prior authorization request for a specific patient.
  
- **Authorization API**
  - `GET /api/authorizations`: Fetch all authorization requests.
  - `PUT /api/authorizations/:id`: Approve or deny an authorization request.

---

## **Additional Features**

- **Authentication**: JWT-based authentication with role-based access for both healthcare providers and insurance payers.
- **Performance Optimization**: Implemented with efficient data-fetching techniques for better performance.
  
---

## **Contributors**

- **Rithas Ahamed** - Full Stack Developer

---

## **License**

This project is licensed under the MIT License.

---

This README provides a comprehensive guide to setting up, running, and understanding your project. Let me know if you'd like further changes!
