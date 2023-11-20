# Case Study Application - Backend

This is the backend part of an application created for a case study during an application process. It's built using Node.js, Express, and MongoDB, and it supports the frontend by handling user authentication, data processing, and serving API endpoints.

[![Frontend Repository](https://img.shields.io/badge/Repository-Frontend-red)](https://github.com/TobiasAschenbrenner/case-study-frontend)

## Features

- User Authentication and Authorization
- Role Management
- CRUD operations for user data

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/)

### Installation

1. Clone the repository:
   `git clone https://github.com/TobiasAschenbrenner/case-study-backend.git`
2. Navigate to the project directory:
   `cd case-study-backend`
3. Install dependencies:
   `npm install`

### Environment Setup

Create a `.env` file in the root of the project with the following variables:

```
MONGO_URL = [Your MongoDB URL]
JWT_SECRET = [Your JWT Secret Key]
LIVE_URL = [Your Frontend Live URL]
AUTH_USER = [Your Email for Nodemailer]
AUTH_PASS = [Your Password for Nodemailer]
```

Replace the bracketed sections with your own configurations.

### Starting the Development Server

You can start the development server with:

`npm start`

The server will run on http://localhost:8800

### Usage

The backend server can be accessed via API calls from the [frontend](https://github.com/TobiasAschenbrenner/case-study-frontend) application or tools like [Postman](https://www.postman.com/) for testing.

## Contributing

Feel free to fork the repository and contribute by submitting pull requests for any improvements or bug fixes.
