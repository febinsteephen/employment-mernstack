# Employee App Backend Integration

A full-stack Employee Management Application built using the MERN stack with an Angular frontend and an Express/Node.js backend connected to MongoDB Atlas.

---

## 🚀 Features & API Endpoints

All backend endpoints are integrated into `app.js` with comprehensive error handling:

| HTTP Method | Endpoint | Description | Request Body Format |
|---|---|---|---|
| **GET** | `/api/employeelist` | Retrieve all employees from the database | None |
| **GET** | `/api/employeelist/:id` | Retrieve single employee information by ID | None |
| **POST** | `/api/employeelist` | Add a new employee to the database | `{ "name": "", "location": "", "position": "", "salary": "" }` |
| **PUT** | `/api/employeelist` | Update employee information | `{ "_id": "", "name": "", "location": "", "position": "", "salary": "" }` |
| **DELETE** | `/api/employeelist/:id` | Delete an employee by ID | None |

---

## 🛠️ Tech Stack

- **Frontend:** Angular (served from `dist/Frontend`)
- **Backend:** Node.js & Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Utilities:** `cors`, `dotenv`

---

## 📋 Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **MongoDB Atlas** account (or local MongoDB)

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <REPO_URL>
   cd mernstack
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and insert your MongoDB Atlas connection URI:
   ```bash
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/EmployeeDB?retryWrites=true&w=majority
   PORT=3000
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```
   Or:
   ```bash
   node app.js
   ```

5. **Access the App:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
