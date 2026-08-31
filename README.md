# 🏏 Cricbuzz

A production-grade Cricket Management & Live Scoring Platform built using modern web technologies.

## Project Overview

Cricbuzz is a full-stack application that provides:
 
* Cricket Series Management
* Team & Squad Management
* Player Management
* Match Management
* Playing XI Selection
* Live Score Updates
* Ball-by-Ball Commentary
* Real-Time Updates using Socket.IO
* Admin Dashboard
* Public Cricket APIs

---

# Project Structure

```txt
cricbuzz/
│
├── frontend/
│
├── backend/
│
└── README.md
```

---

# Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT
* Zod

---

# Architecture

Backend follows a Modular Monolith Architecture.

```txt
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
```

Each module contains its own:

```txt
module/
├── route
├── controller
├── service
├── repository
├── model
├── validator
├── dto
└── interface
```

---

# Git Workflow

## Main Branches

```txt
main
develop
feature/*
```

### Rules

* Never push directly to `main`
* Create a feature branch before starting work
* Open a Pull Request before merging
* Keep commits meaningful

Example:

```bash
git checkout -b feature/auth-module
```

---

# Getting Started

## Clone Repository

```bash
git clone <repository-url>
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm run dev
```

---

# Team Guidelines

* Follow project architecture
* Do not modify another module without discussion
* Write clean and readable code
* Use meaningful commit messages
* Test before pushing code
* Keep pull requests focused on a single feature

---

# Current Deadline

📅 Project Submission: **16 June 2026**

---

# Project Lead

Harshit Raghuwanshi
