# Portfolio Website - A. Issadurrofiq Jaya Utama

Modern portfolio website dengan full-stack architecture, admin panel, dan CRUD functionality. Built with Next.js 14, TypeScript, Tailwind CSS, dan NextAuth.js.

🌐 **Live Demo:** [Your Demo URL]  
📧 **Contact:** ahmadissadurrofiq17@gmail.com  
💼 **LinkedIn:** [a-issadurrofiq-jaya-utama](https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a)

---

## ✨ Features

### Frontend
- 🎨 Modern, responsive design (mobile-first)
- ⚡ Fast performance with Next.js 14 App Router
- 🎭 Smooth animations using Framer Motion
- 🎯 Component-based architecture
- 📱 Infinite scroll carousel for tech stack
- 🎠 Auto-sliding testimonials
- 🔍 Project search & filtering
- 🎨 Gradient effects & glassmorphism

### Admin Panel
- 🔐 Secure authentication with NextAuth.js
- 📊 Dashboard with project statistics
- ➕ Create, edit, and delete projects
- 🖼️ Image upload (local storage)
- 🎨 Shadcn/ui components
- 📋 Form validation
- 🔒 Protected routes with middleware

### Architecture
- 📦 Service layer for API calls
- 🎯 Centralized constants & endpoints
- 🗂️ JSON file storage (database-ready)
- 🔄 Type-safe with TypeScript
- ♻️ Reusable micro-components

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-secure-password
   ```

4. **Generate NextAuth Secret**
   ```bash
   openssl rand -base64 32
   # or
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   - Portfolio: `http://localhost:3000`
   - Admin Login: `http://localhost:3000/login`

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   └── projects/              # Projects API endpoints
│   │       ├── route.ts           # CRUD operations
│   │       └── upload/            # Image upload
│   ├── login/                     # Admin login page
│   ├── admin-dashboard/           # Admin dashboard
│   ├── settings/                  # Admin settings
│   └── page.tsx                   # Homepage
├── components/
│   ├── admin/                     # Admin components
│   │   ├── AdminSidebar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectFormDialog.tsx
│   │   └── ...
│   ├── micro/                     # Reusable micro-components
│   │   ├── ProjectCard.tsx
│   │   └── Section.tsx
│   ├── ui/                        # Shadcn/ui components
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   └── ...
├── lib/
│   ├── constants/
│   │   └── api.ts                 # API endpoints & routes
│   ├── services/
│   │   ├── auth.service.ts        # Authentication logic
│   │   └── project.service.ts     # Project CRUD
│   └── utils.ts                   # Utility functions
├── data/
│   └── projects.json              # Project data storage
├── public/
│   └── images/projects/           # Uploaded images
└── middleware.ts                  # Route protection
```

---

## 🔐 Authentication

### Login Credentials
- Default: Set in `.env.local`
- Access: `http://localhost:3000/login`

### Protected Routes
- `/admin-dashboard` - Main admin panel
- `/settings` - Account settings

### How It Works
1. User enters credentials at `/login`
2. NextAuth validates against `.env.local`
3. JWT token stored in HTTP-only cookie
4. Middleware protects admin routes
5. Unauthorized users redirected to login

---

## 📊 Admin Dashboard

### Features
- **Statistics Cards:** Total projects, technologies, views
- **Project Management:** Grid view with edit/delete actions
- **Add Project:** Modal form with image upload
- **Image Upload:** Local storage with validation (5MB max)

### Usage
1. Login at `/login`
2. Navigate to Dashboard
3. Click "Add Project" to create new project
4. Fill form: title, description, technologies, links
5. Upload image or provide URL
6. Save - automatically updates JSON file

---

## 🗂️ Data Management

### Current: JSON File Storage
- **Location:** `data/projects.json`
- **Access:** Via `/api/projects` routes
- **Images:** `public/images/projects/`

### Upgrade Path (Optional)
For production, consider:
- **Vercel Postgres** + Prisma (recommended)
- **Supabase** (PostgreSQL + storage)
- **MongoDB Atlas** (NoSQL)

---

## 🎨 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript 5.3
- Tailwind CSS 3.4
- Framer Motion 11
- Shadcn/ui + Radix UI

### Backend
- Next.js API Routes
- NextAuth.js 4.24
- File system (fs) for storage

### Development
- ESLint
- PostCSS
- Git

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Environment Variables**
   ```
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-production-secret
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-strong-password
   ```

4. **Deploy**
   - Click "Deploy"
   - Done! 🎉

---

## 🔧 Configuration

### Customize Content

#### Personal Information
Edit in components:
- `components/Hero.tsx` - Name, title, links
- `components/About.tsx` - Bio, experience
- `components/Contact.tsx` - Email, phone, location

#### Projects
- Via Admin Dashboard (recommended)
- Or edit `data/projects.json` directly

#### Styling
- `tailwind.config.ts` - Colors, fonts, breakpoints
- `app/globals.css` - Global styles

---

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use!

---

## 📄 License

MIT License - feel free to use this project for your own portfolio.

---

## 👤 Author

**A. Issadurrofiq Jaya Utama**
- 📧 Email: ahmadissadurrofiq17@gmail.com
- 💼 LinkedIn: [a-issadurrofiq-jaya-utama](https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a)
- 🐙 GitHub: [DevIssa-It](https://github.com/DevIssa-It)

---

## 🙏 Acknowledgments

- Next.js Team
- Shadcn/ui
- Vercel
- Open source community

---

**Made with ❤️ using Next.js & TypeScript**
# atau
pnpm install
```

### 2. Setup Environment Variables

Copy file `.env.example` ke `.env.local` dan edit dengan credentials Anda:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key
ADMI4. Access Admin Panel

Login ke admin panel: [http://localhost:3000/login](http://localhost:3000/login)

Gunakan credentials dari `.env.local` untuk login.

📖 **Baca [ADMIN_GUIDE.md](ADMIN_GUIDE.md) untuk panduan lengkap admin panel.**

### 5_EMAIL=admin@yourportfolio.com
ADMIN_PASSWORD=YourSecurePassword123!
```

**Generate secret key:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 3. Customize Content

Edit file-file berikut untuk menyesuaikan dengan informasi Anda:

- **components/Hero.tsx** - Nama, title, dan deskripsi Anda
- **components/About.tsx** - Informasi tentang Anda
- **components/Skills.tsx** - Skills dan teknologi yang Anda kuasai
- **components/Projects.tsx** - Portfolio projects Anda
- **components/Contact.tsx** - Informasi kontak Anda
- **app/layout.tsx** - Metadata SEO

## 🚀 Deployment

### Option 1: Vercel (Recommended) ⭐

Vercel adalah platform yang dibuat oleh creator Next.js. Ini adalah cara tercepat dan termudah:

1. **Push ke GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/portfolio.git
   git push -u origin main
   ```

2. **Deploy ke Vercel:**
   - Kunjungi [vercel.com](https://vercel.com)
   - Sign in dengan GitHub
   - Click "New Project"
   - Import repository Anda
   - Click "Deploy"

**Keuntungan Vercel:**
- ✅ Gratis untuk personal projects
- ✅ Automatic deployments dari GitHub
- ✅ Custom domain gratis
- ✅ SSL certificate otomatis
- ✅ Edge network global
- ✅ Zero configuration

### Option 2: Netlify

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Deploy ke Netlify:**
   - Install Netlify CLI: `npm install -g netlify-cli`
   - Login: `netlify login`
   - Deploy: `netlify deploy --prod`

Atau deploy via Netlify dashboard:
- Kunjungi [netlify.com](https://netlify.com)
- Connect repository GitHub Anda
- Set build command: `npm run build`
- Set publish directory: `.next`

### Option 3: VPS (DigitalOcean, AWS, etc.)

1. **Build production:**
   ```bash
   npm run build
   ```

2. **Setup di VPS:**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Clone repository
   git clone https://github.com/username/portfolio.git
   cd portfolio

   # Install dependencies
   npm install

   # Build
   npm run build

   # Install PM2 untuk process manager
   npm install -g pm2

   # Start aplikasi
   pm2 start npm --name "portfolio" -- start

   # Setup nginx sebagai reverse proxy
   sudo apt install nginx
   ```

3. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 4: Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Build dan Run:**
   ```bash
   docker build -t portfolio .
   docker run -p 3000:3000 portfolio
   ```

## 🎨 Customization Tips

### Mengganti Warna Theme

Edit [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  primary: '#3B82F6',    // Ganti dengan warna favorit
  secondary: '#8B5CF6',  // Ganti dengan warna sekunder
  dark: '#0F172A',
  light: '#F8FAFC',
}
```

### Menambah Section Baru

1. Buat component baru di folder `components/`
2. Import dan tambahkan di [app/page.tsx](app/page.tsx)

### Menambah Animasi

Gunakan Framer Motion:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Your content */}
</motion.div>
```

## 📱 Responsive Design

Website ini sudah fully responsive untuk semua device:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🔍 SEO Optimization

- ✅ Semantic HTML
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Sitemap ready
- ✅ Fast loading time

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 💡 Tips untuk Portfolio yang Baik

1. **Keep it simple** - Jangan terlalu ramai
2. **Show your best work** - Quality over quantity
3. **Keep it updated** - Update projects secara berkala
4. **Add analytics** - Gunakan Google Analytics
5. **Test performance** - Gunakan Lighthouse untuk cek performance
6. **Custom domain** - Beli domain untuk terlihat lebih profesional

## 🤝 Support

Jika ada pertanyaan atau butuh bantuan, silakan buat issue di repository ini.

---

Made with ❤️ using Next.js and TypeScript
