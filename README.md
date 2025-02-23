# Waldoverse

An interactive web-based game where players search for popular game and anime characters hidden across various maps. It features a leaderboard to track high scores.

<p align="center">
  <img src="https://res.cloudinary.com/dy0av590l/image/upload/v1738121641/196shots_so_1_pdy82k.png" alt="Waldoverse Map Selection Screen" width="800"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma Badge"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge"/>
</p>

👉 [Live Demo](https://waldoverse.vercel.app/) 👈

## 🎯 Goals

This project was developed to practice and showcase skills in modern web development technologies. The core challenge was building a game where the coordinates of hidden characters are securely stored server-side, and player interactions (clicks) are validated via server actions.

## 🌟 Features

- **Interactive Maps**: Explore three different maps.
- **Leaderboard**: Compete and track high scores.
- **Server Actions**: Efficient server-side processing with Next.js.
- **Database**: PostgreSQL managed with Prisma.
- **Styling**: Responsive design using Tailwind CSS.

## 🔧 Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/SamuelFerfort/waldoverse.git
   cd waldoverse

   ```

2. **Install Dependencies**

   ```bash
   npm install

   ```

3. **Configure Environment Variables:** Create a .env file in the root directory and add the following variables:

   ```bash
   DATABASE_URL=your_database_url_here
   JWT_TOKEN=your_jwt_token_here

   ```

4. **Run the Development Server:**

   ```bash

   npm run dev

   ```
