# Full-Stack Real Estate Website

This project is a full-featured real estate website built with the MERN stack (React, Node.js) and TypeScript.

## ✅ Features

- **Responsive Layout**: Clean, modern UI for real estate listings.
- **Property Listings**: Browse properties with details.
- **Filtering**: Filter properties by price range, location, and type (house/apartment).
- **Search**: Search for properties by title.
- **Google Maps Mock**: Placeholder map for each property location.
- **Contact Agent Modal**: A form to contact the property agent.
- **Routing**: Navigate between Home, Property Details, and Contact pages using React Router.
- **Mock User Authentication**: Basic user login/signup page.

## ✅ Tech Stack

- **Frontend**: React, TypeScript, React Router, CSS Modules
- **Backend**: Node.js, TypeScript (using core `http` module)
- **Database**: Static JSON file (no database setup required)

## 🚀 Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your computer.

### 1. Backend Setup

First, let's get the backend server running.

```bash
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# 3. Start the development server (runs on http://localhost:3001)
npm run dev
```

The server will provide the API for the frontend application.

### 2. Frontend Setup

Now, let's get the frontend React application running. Open a **new terminal window** for this step.

```bash
# 1. Navigate to the client directory
cd client

# 2. Install dependencies
npm install

# 3. Start the React development server (opens in your browser at http://localhost:3000)
npm start
```

The website should now be running in your browser.

## Notes

- All styling is done using CSS Modules. No third-party styling libraries are used.
- The project is configured for TypeScript on both the frontend and backend.
- The backend uses Node.js's core `http` module, with no external frameworks like Express, to adhere to the project constraints.
- Linter errors in your IDE for the `client` directory should resolve after running `npm install`. 