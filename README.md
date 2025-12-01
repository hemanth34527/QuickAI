# QuickAI

QuickAI is a comprehensive AI-powered platform that offers multiple AI tools for content creation, image manipulation, and document analysis. Built with React, Node.js, and integrated with Google's Gemini AI and Cloudinary services.

## ✨ Features

### AI Content Generation
- **Write Article** - Generate full-length articles based on prompts with customizable length
- **Blog Titles** - Create catchy and SEO-friendly blog titles
- **Generate Images** - Text-to-image generation using ClipDrop API

### Image Processing
- **Remove Background** - Automatically remove backgrounds from images
- **Remove Object** - Remove specific objects from images using AI

### Document Analysis
- **Resume Review** - Upload and get AI-powered feedback on your resume (PDF format, max 5MB)

### User Features
- **User Authentication** - Secure authentication powered by Clerk
- **Dashboard** - Personalized user dashboard to manage AI generations
- **Community** - Share and explore AI-generated images
- **Usage Tracking** - Free tier with 10 free generations, premium tier for unlimited access
- **Creation History** - Track all your AI-generated content

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Clerk** - User authentication and management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI SDK** - Integration with Gemini AI (via OpenAI-compatible API)
- **Cloudinary** - Image hosting and manipulation
- **Clerk Express** - Backend authentication middleware
- **Neon Database** - PostgreSQL serverless database
- **Multer** - File upload handling
- **PDF Parse** - PDF document parsing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Clerk account (for authentication)
- Google Gemini API key
- Cloudinary account
- ClipDrop API key
- Neon PostgreSQL database

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/quickai.git
cd quickai
```

### 2. Install dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd server
npm install
```

### 3. Environment Variables

#### Client (.env)
Create a `.env` file in the `client` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

#### Server (.env)
Create a `.env` file in the `server` directory:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
DATABASE_URL=your_neon_database_url
```

### 4. Database Setup

Create the necessary tables in your Neon PostgreSQL database:

```sql
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  publish BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🏃‍♂️ Running the Application

### Development Mode

#### Start the server
```bash
cd server
npm run server
```

#### Start the client
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

### Production Build

#### Build the client
```bash
cd client
npm run build
```

#### Start the server
```bash
cd server
npm start
```

## 📁 Project Structure

```
QuickAI/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, icons, and asset configurations
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Backend Node.js application
    ├── configs/           # Configuration files
    │   ├── cloudinary.js  # Cloudinary setup
    │   ├── db.js          # Database connection
    │   └── multer.js      # File upload configuration
    ├── controllers/       # Request handlers
    │   ├── aiController.js
    │   └── userController.js
    ├── middlewares/       # Custom middleware
    │   └── auth.js        # Authentication middleware
    ├── routes/            # API routes
    │   ├── aiRoutes.js
    │   └── userRoutes.js
    ├── server.js          # Server entry point
    └── package.json
```

## 🔑 Key Features Explained

### Authentication & Authorization
- Uses Clerk for user authentication
- Protected routes require authentication
- Free tier users limited to 10 generations
- Premium users have unlimited access

### AI Integration
- Uses Google's Gemini 2.0 Flash model for text generation
- ClipDrop API for text-to-image generation
- Cloudinary AI for background removal and object removal

### File Handling
- Multer for handling file uploads
- PDF parsing for resume analysis
- Image optimization via Cloudinary

## 📱 Available Routes

### Frontend Routes
- `/` - Home page
- `/ai` - Dashboard layout
  - `/ai` - Dashboard
  - `/ai/write-article` - Article generation
  - `/ai/blog-titles` - Blog title generation
  - `/ai/generate-images` - Image generation
  - `/ai/remove-background` - Background removal
  - `/ai/remove-object` - Object removal
  - `/ai/review-resume` - Resume review
  - `/ai/community` - Community gallery

### Backend API Routes
- `GET /` - Health check
- `/api/ai/*` - AI generation endpoints
- `/api/user/*` - User management endpoints

## 🔒 Security Features

- Authentication via Clerk
- Protected API routes
- File size validation (5MB limit for resumes)
- CORS configuration
- Environment variable protection

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Nidamanuri Hemanth Gopal

## 🙏 Acknowledgments

- Google Gemini AI for text generation
- ClipDrop for image generation
- Cloudinary for image processing
- Clerk for authentication
- Neon for database hosting

---

Made with ❤️ using React and Node.js
