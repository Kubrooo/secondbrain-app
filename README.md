# SecondBrain API

Backend service for the SecondBrain Personal Knowledge Management application. This project is built using Node.js and Express, utilizing PostgreSQL for data persistence and Prisma as the ORM.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Testing:** Jest & Supertest
- **CI/CD:** GitHub Actions

## Prerequisites

Ensure you have the following installed locally:

- Node.js (v18 or higher)
- npm (Node Package Manager)
- PostgreSQL

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Kubrooo/secondbrain-app.git
   cd secondbrain-app

2. Install dependencies
   ```bash
   npm install

3. Environment Setup Create a .env file in the root directory and configure your database connection string:
   ```bash
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/secondbrain?schema=public"

4. Database Migration Push the schema to your local database:
   ```bash
   npx prisma migrate dev --name init

## Usage
1. Development Server
  Runs the server with nodemon for hot-reloading.
  ```bash
  npm run dev
  ```

2. Production Start
   Runs the server in standard node mode.
   ```bash
   npm start
   ```
3. Testing
   Executes the test suite using Jest.
   ```bash
   npm test
   ```
## API Endpoints

- **Health Check**
  - `GET /` - Returns a status message to verify the server is running.

- **Notes**
  - `GET /notes` - Retrieve all notes.
  - `POST /notes` - Create a new note.
    - Body: `{ "title": "String", "content": "String" }`
  - `PUT /notes/:id` - Update an existing note by ID.
    - Body: `{ "title": "String", "content": "String" }`
  - `DELETE /notes/:id` - Remove a note by ID.
 
## Project Structure

```text
secondbrain-app/
├── .github/
│   └── workflows/     # GitHub Actions CI configurations
├── prisma/
│   ├── migrations/    # SQL migration files
│   └── schema.prisma  # Database schema definition
├── .gitignore         # Git ignore rules
├── app.js             # Main application logic and routes
├── app.test.js        # Integration tests (Jest/Supertest)
├── index.js           # Server entry point
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
