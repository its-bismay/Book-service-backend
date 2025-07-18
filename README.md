# 📚 BookStore Backend API

Welcome to the **BookStore Backend**! This is a robust RESTful API built with Node.js, Express, and MongoDB, designed to manage users and books, including secure authentication, image uploads, and more.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 📖 **Book Management** (CRUD)
- ☁️ **Image Uploads** (Cloudinary integration)
- 🛡️ **Protected Routes**
- ⏰ **Scheduled Tasks** (keep-alive cron job)
- 📦 **RESTful API** with pagination

---

## 🛠️ Tech Stack

- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **JWT** for authentication
- **Cloudinary** for image storage
- **dotenv** for environment management
- **cron** for scheduled jobs

---

## 📂 Project Structure

```text
Backend/
├── src/
│   ├── index.js              # Main server entry
│   ├── lib/
│   │   ├── cloudinary.js     # Cloudinary config
│   │   ├── cron.js           # Cron job
│   │   └── db.js             # MongoDB connection
│   ├── middleware/
│   │   └── auth.middleware.js# Auth middleware
│   ├── models/
│   │   ├── Book.js           # Book schema
│   │   └── User.js           # User schema
│   └── Routes/
│       ├── authRoute.js      # Auth endpoints
│       └── bookRoute.js      # Book endpoints
├── package.json
├── vercel.json
└── README.md
```

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   API_URL=https://your-deployment-url.com
   ```
4. **Run the server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

---

## 🔑 Environment Variables

| Variable                | Description                        |
| ----------------------- | ---------------------------------- |
| `PORT`                  | Server port (default: 3000)        |
| `MONGO_URI`             | MongoDB connection string          |
| `JWT_SECRET`            | Secret for JWT signing             |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name              |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                 |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret              |
| `API_URL`               | Public API URL for keep-alive cron |

---

## 📚 API Endpoints

### 👤 Auth

- **POST** `/api/auth/register` — Register a new user
  - Body: `{ email, username, password }`
- **POST** `/api/auth/login` — Login user
  - Body: `{ email, password }`

### 📖 Books _(Protected: Bearer Token required)_

- **POST** `/api/books/create` — Add a new book
  - Body: `{ title, caption, rating, image (base64 or URL) }`
- **GET** `/api/books/all-books?page=1&limit=5` — List all books (paginated)
- **GET** `/api/books/my-books` — List books added by the authenticated user
- **DELETE** `/api/books/delete/:id` — Delete a book by ID

> **Note:** All book routes require an `Authorization: Bearer <token>` header.

---

## 🗄️ Data Models

### User

```js
{
  username: String,
  email: String,
  password: String (hashed),
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Book

```js
{
  title: String,
  caption: String,
  image: String (Cloudinary URL),
  rating: Number (1-5),
  user: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⏰ Scheduled Tasks

- Every 10 minutes, a keep-alive GET request is sent to `API_URL` to prevent the server from sleeping (useful for free hosting platforms).

---

## 🚀 Deployment

- **Vercel:** The project includes a `vercel.json` for custom rewrites.
- **Environment:** Ensure all environment variables are set in your deployment platform.

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[ISC](LICENSE)

---

## 💡 Author

- **Name:** Bibhabasu Bismay Kumar Naik
- **Email:** [bismaybibhabasu33@gmail.com](mailto:bismaybibhabasu33@gmail.com)
- <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" width="18"/> [Instagram](https://www.instagram.com/bismay_11)
- <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg" alt="X" width="18"/> [X (Twitter)](https://x.com/RewatchRoom)

---

> Made with ❤️ for book lovers!
