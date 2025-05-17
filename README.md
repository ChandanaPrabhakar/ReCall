# 📝 ReCall

ReCall is a full-stack note-taking application built using **React (Vite)** for the frontend and **Node.js + Express + TypeScript** for the backend. It allows users to register, log in, create, edit, delete, pin, and search notes in a modern, responsive UI.

## 🔗 Demo

👉 [Try ReCall Live](https://recall-note.netlify.app)

## 🚀 Features

- 🔐 User authentication (Sign up & Login)
- 🗂 Create, edit, delete, and pin notes
- 🔍 Search notes by content or title
- ✅ Toast notifications for user actions
- 📦 REST API with Express & TypeScript
- 🧼 Clean, responsive React UI using modular components

---

## 🖥 Tech Stack

### Frontend
- React (with Vite)
- Axios
- React Router
- Tailwind CSS
- React Modal

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB 
- JWT 

---

## 📁 Project Structure

### Frontend (`/frontend/ReCall`)

src/

    ├── components/ # Reusable UI components like Navbar, Cards, SearchBar, Toasts
    ├── pages/ # Pages: Home, Login, Signup   
    ├── utils/ # Axios instance, constants, helpers
    ├── assets/ # Images & icons
    ├── App.jsx # Main app routing
    ├── main.jsx # Entry point


### Backend (`/backend`)

src/
    ├── controllers/ # Logic for notes & auth
    ├── models/ # Database models
    ├── routes/ # API endpoints
    ├── services/ # Business logic layer
    ├── utils/ # Helper functions (e.g., token auth)
    ├── index.ts # Express server entry
    

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ChandanaPrabhakar/ReCall.git
cd ReCall

```

### 2. Setup Backend

```bash

cd backend
npm install
cp .env.example .env    # Add MongoDB URI, JWT secrets, etc.
npm run dev            

```

### 3. Setup Frontend

```bash

cd frontend/ReCall
npm install
npm run dev             # Runs on http://localhost:5173

```
---

## 🌐 API Endpoints (Protected by JWT)

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| POST   | `/signup`                        | Register new user        |
| POST   | `/login`                         | Login user               |
| GET    | `/get-user`                      | Fetch authenticated user |
| POST   | `/add-note`                      | Add a new note           |
| PUT    | `/edit-note/noteId/:noteId`      | Edit a note              |
| PUT    | `/update-note-pinned/noteId/:id` | Pin/unpin a note         |
| GET    | `/get-all-notes`                 | Fetch all notes          |
| DELETE | `/delete-note/noteId/:id`        | Delete a note            |
| GET    | `/search-note?query=term`        | Search notes             |

---

## ✨ UI Features

- Responsive grid of notes with pinning support

- Add/Edit Modal for note creation/updating

- Empty state visuals when no notes or search results

- Toast notifications for actions like delete/pin

---

## 🤝 Contributing

Feel free to fork the repo, open issues, and submit pull requests. Bug fixes, enhancements, or new features are all welcome!

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Chandana Prabhakar

cp.devang@gmail.com
