# IRCTC-Like Railway Management System 🚆  

This is a **Railway Management System API** that allows users to:  
- ✅ **Register & Login** (JWT Authentication)  
- ✅ **Check Train Availability**  
- ✅ **Book Seats with Transaction Handling** (Preventing Race Conditions)  
- ✅ **Admin Panel to Add Trains** (Protected by API Key)  

---

## **Features**  
- **User Authentication**: JWT-based Login & Registration  
- **Role-based Access Control**: Users & Admins  
- **Admin Controls**: Add/Update Train Details (API Key Protected)  
- **Train Availability**: Search for trains based on source, destination & date  
- **Secure Seat Booking**: Transaction-based, with Row Locking to prevent overbooking  
- **Booking History**: Retrieve past bookings  

---

## **Tech Stack**  
- 🚀 **Backend**: Node.js, Express.js  
- 🛢️ **Database**: MySQL (with `mysql2` package)  
- 🔐 **Authentication**: JWT (JSON Web Token)  
- 🔒 **Security**: `bcrypt.js` (Password Hashing), API Key Protection  
- 🛠 **Middleware**: `body-parser`, `CORS`, `Helmet`  

---

## **Setup & Installation**  

### **1. Clone the Repository**  
```sh
git clone https://github.com/your-username/railway-api.git
cd railway-api
