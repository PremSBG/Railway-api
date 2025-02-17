IRCTC-Like Railway Management System

This is a **Railway Management System API** that allows users to **register, login, check train availability, book seats**, and **admin** can **add trains** securely. The project is built using **Node.js, Express.js, and MySQL** with **JWT authentication and transaction-based seat booking** to prevent race conditions.

---

Features
User Registration & Login (JWT Authentication)
Role-based Access Control (User & Admin)
Admin can add trains (Protected by API Key) 
Users can check train availability  
Seat booking with race condition handling (Transaction & Row Locking)  
Retrieve booking details

---

Tech Stack
- Backend: Node.js, Express.js  
- Database: MySQL (with `mysql2` package)  
- Authentication:JWT (JSON Web Token)  
- Security: bcrypt.js (Password Hashing), API Key Protection  
- Middleware: body-parser, CORS, Helmet  

---

## **Setup & Installation**
### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/railway-api.git
cd railway-api
 
 
