📝 Task Manager App
A full-stack MERN (MongoDB, Express.js, React, Node.js) task management application that allows users to create, update, delete, and manage their tasks efficiently. Includes user authentication and dynamic UI updates.

Features
•	User Authentication
o	Signup/Login with email and password
o	Authenticated sessions using stored user ID and JWT token
•	 CRUD Operations
o	Create a new task (title, description, status)
o	Read/view all tasks
o	Update a specific task (status, title, description)
o	Delete a task with confirmation popup
•	 UI & UX
o	Responsive, mobile-friendly UI built with Tailwind CSS
o	Popups for editing and deleting tasks
o	Toast notifications for user feedback
•	 Context API
o	AuthContext for managing global user state
•	Hooks
o	Custom hooks (useFetch, usePost, useDelete, useUpdate) to abstract API logic

Technologies Used
🔹 Frontend:
•	React.js (Functional Components + Hooks)
•	Tailwind CSS
•	Axios
•	React Router DOM
•	React Icons
•	React Toastify
🔹 Backend:
•	Node.js
•	Express.js
•	MongoDB with Mongoose
•	Bcrypt (for password hashing)
•	JSON Web Token (JWT)
•	Dotenv

API Endpoints
Tasks
•	POST /tasks – Create a new task
•	GET /tasks – Retrieve all tasks
•	GET /tasks/:id – Get a specific task by ID
•	PUT /tasks/:id – Update a task
•	DELETE /tasks/:id – Delete a task
Users
•	POST /auth/signup – Register a new user
•	POST /auth/login – Login and receive token
•	GET /users/:id – Fetch user details
