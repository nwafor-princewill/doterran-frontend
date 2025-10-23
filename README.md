A philosophy blog frontend built with React, TypeScript, and Tailwind CSS, designed to explore existential questions like "Who am I?" and foster authentic being through essays on Ethics, Existentialism, Metaphysics, Epistemology, and Political Philosophy. Authored by Nwafor Princewill under the pseudonym Doterra, this platform invites readers to engage in philosophical dialogue and self-reflection.

🌟 Features

Blog Posts: Browse and read philosophical essays with rich formatting, featured images, and categories like Ethics and Existentialism.
Comment System: Engage in philosophical discussions via moderated comments with support for admin replies (CommentSection.tsx, CommentManagement.tsx).
Philosophy Quiz: Take an interactive quiz to discover your philosophical alignment (e.g., Utilitarianism, Existentialism) (PhilosophyQuiz.tsx).
Admin Dashboard: Create, edit, and delete blog posts with image uploads, manage comments, and send newsletters (AdminDashboard.tsx, CommentManagement.tsx, SendNewsletter.tsx).
Newsletter System: Subscribe to newsletters and manage subscriber lists with CSV export (Subscribers.tsx, SendNewsletter.tsx).
Responsive Design: Optimized for desktop and mobile with a clean, elegant UI using Tailwind CSS.
SEO Optimized: Descriptive meta tags for better search engine visibility (index.html).

🛠️ Tech Stack
Technology,  Description,
React,       JavaScript library for building user interfaces,
TypeScript,  Typed JavaScript for enhanced code reliability,
Tailwind CSS, Utility-first CSS framework for styling,
React Router, Declarative routing for React applications,
Lucide React, Icon library for consistent UI elements,
Vite,"Build tool for fast development (assumed, replace with Create React App if used)",
Axios,        HTTP client for API requests (inferred from api.ts),

🚀 Getting Started
Prerequisites

Node.js (v16 or higher)
npm or yarn
A running backend server (e.g., at https://doterran-backend.onrender.com/api) with MongoDB and Cloudinary configured.

Installation

1. Clone the Repository:
bash: git clone https://github.com/nwafor-princewill/doterran-frontend.git
cd doterran-philosophy

2. Install Dependencies:
bas: hnpm install

3. Set Up Environment Variables:
Create a .env file in the root directory and add the backend API URL:
env:  REACT_APP_API_URL=https://doterran-backend.onrender.com/api

4. Run the Development Server:
bash: npm start
The app will run at http://localhost:3000 (or the port specified by Vite/Create React App).

5. Build for Production:
bash: npm run build

Deployment
The frontend is deployed on Vercel at https://doterran-frontend.vercel.app. To deploy your own instance:

Push to GitHub:
Ensure your repository is pushed to GitHub.
bash: git add .
git commit -m "Initial commit"
git push origin main

Deploy to Vercel:

Connect your GitHub repository to Vercel.
Set the environment variable REACT_APP_API_URL in Vercel’s dashboard.
Deploy the app, and Vercel will handle the build and hosting.

📂 Project Structure
doterran-philosophy/
├── public/
│   ├── index.html          # HTML template with meta tags
│   ├── favicon.ico         # Favicon
│   ├── logo192.png         # App icon
│   └── manifest.json       # Web app manifest
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── admindashboard.tsx   # Admin dashboard for managing posts
│   │   │   ├── CommentManagement.tsx # Admin comment moderation
│   │   │   ├── SendNewsletter.tsx   # Newsletter composition and sending
│   │   │   └── Subscribers.tsx      # Subscriber list management
│   │   ├── article.tsx             # Single blog post page
│   │   ├── articles.tsx            # Blog post listing
│   │   └── home.tsx                # Homepage with intro and featured posts
│   ├── components/
│   │   └── interactive/
│   │       ├── CommentSection.tsx   # Comment system for blog posts
│   │       └── PhilosophyQuiz.tsx   # Interactive philosophy alignment quiz
│   ├── services/
│   │   └── api.ts                  # API service for backend communication
│   ├── types.ts                    # TypeScript interfaces
│   └── index.tsx                   # App entry point
├── .env                            # Environment variables
├── package.json                    # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file

🎨 Design and Styling

Theme: Uses a warm, parchment-based color palette with navy-blue backgrounds, burgundy accents, and forest-green highlights, inspired by the blog’s philosophical aesthetic.
Typography: Custom font-display and font-mono classes for elegant headings and readable content.
Icons: Lucide React icons (MessageSquare, Send, Award, etc.) for consistent, modern UI elements.
Responsive: Tailwind CSS ensures a seamless experience across devices.

🔗 API Integration
The frontend communicates with a Node.js/Express backend (deployed separately) via the apiService (src/services/api.ts). Key endpoints include:

Blog Posts: GET /posts, POST /posts, PUT /posts/:id, DELETE /posts/:id
Comments: GET /comments/post/:postId, POST /comments, PATCH /comments/:id/approve, POST /comments/:id/reply
Newsletter: POST /subscribe, POST /newsletter/send, GET /newsletter/stats
Subscribers: GET /subscribe/admin

Ensure the backend is running and REACT_APP_API_URL is correctly set in .env.

🐛 Known Issues

Image Uploads: If images fail to upload in the admin dashboard, verify:

The backend URL in api.ts matches the deployed backend.
Cloudinary credentials are correctly set in the backend’s environment variables.
File sizes are under 10MB (backend limit) and are valid image types (JPEG, PNG, etc.).


CORS: Ensure the backend’s CORS configuration allows requests from https://doterran-frontend.vercel.app.

🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m "Add YourFeature").
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

Please ensure code follows the existing TypeScript and Tailwind CSS conventions.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

🙌 Acknowledgments
Nwafor Princewill (Doterra): Creator and author of the philosophical content.
React & TypeScript: For a robust and typed frontend framework.
Tailwind CSS: For rapid, beautiful styling.
Lucide React: For elegant icons.
Vercel: For seamless deployment.

📬 Contact
For questions or feedback, reach out via the blog’s contact form or open an issue on GitHub, or send me a message in my email: nwaforprincewill21@gmail.com
