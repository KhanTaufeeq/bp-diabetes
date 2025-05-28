# BP-Diabetes Tracker
A full-stack web application to help users track their blood pressure (BP) and diabetes (sugar) levels. The app allows users to register, securely log in, and manage their personal health data.

🛠 Tech Stack

## Backend 

Express.js – Web framework for Node.js

MongoDB – NoSQL database

Mongoose – MongoDB ODM

JWT – JSON Web Tokens for authentication

bcrypt – For secure password hashing

## Frontend

React.js – Frontend library for building UI

Context API – For global state management

axios – For making HTTP requests

Tailwind CSS – For styling the UI

jwt-decode – To decode and extract user data from JWTs

react-router – For routing and navigation

✨ Features

✅ User Authentication (Signup, Signin, Signout)

✅ JWT Token-based secure API access

✅ Add, View, Edit, Delete Blood Pressure Records

✅ Add, View, Edit, Delete Diabetes (Sugar) Records

✅ Secure access – users can only access their own health data

✅ Responsive and intuitive UI

🚀 Getting Started

Prerequisites

Node.js

MongoDB

Git

Clone the repository

bash

Copy

Edit

git clone https://github.com/KhanTaufeeq/bp-diabetes.git

cd bp-diabetes

Backend Setup

bash

Copy

Edit

cd backend

npm install

### create a .env file and add your MongoDB URI and JWT_SECRET

npm start

Frontend Setup

bash

Copy

Edit

cd frontend

npm install

npm start

📁 Folder Structure

Copy

Edit

bp-diabetes/

│

├── backend/

│   ├── models/

│   ├── routes/

│   ├── middleware/

│   └── controllers/

│

├── frontend/

│   ├── components/

│   ├── pages/

│   ├── context/

│   └── utils/

📌 To Do (Optional Enhancements)

Add charts/graphs for health trends

Allow users to export their data

Email notifications for abnormal readings

Mobile app version

🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License

This project is licensed under the MIT License.
