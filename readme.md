Below is a README file specifically for the backend of the Leaderboard System, focusing on the Node.js (ES Modules) and MongoDB setup. It includes instructions for installation, running the server, and using MongoDB Compass for database management, as requested.



# Leaderboard System Backend

This is the backend for the Leaderboard System, built with Node.js (using ES Modules) and MongoDB. It provides a RESTful API to manage users, claim random points (1-10), maintain a leaderboard with rankings, and track claim history. The backend supports pagination and real-time ranking updates.

## Features
- **User Management**: Create and store users in a MongoDB database.
- **Point Claiming**: Assign random points (1-10) to users via API calls.
- **Leaderboard**: Retrieve sorted user rankings based on total points, with pagination.
- **Claim History**: Log all point claims with timestamps in a separate collection.
- **Real-Time Updates**: Automatically update rankings after each point claim.
- **Efficient Pagination**: Handle large datasets for leaderboard and history endpoints.

## Project Structure
```
backend/
├── config/
│   └── db.mjs
├── models/
│   ├── User.mjs
│   ├── ClaimHistory.mjs
├── routes/
│   └── leaderboard.mjs
├── controllers/
│   └── leaderboardController.mjs
├── package.json
└── server.mjs
```

## Prerequisites
- **Node.js**: Version 14.x or higher
- **MongoDB**: Version 4.x or higher (Community Edition)
- **MongoDB Compass**: Recommended for database visualization (optional, see below)
- **npm**: Comes with Node.js

## Setup Instructions

### 1. Install MongoDB
1. Download and install MongoDB Community Edition from [MongoDB's official website](https://www.mongodb.com/try/download/community).
2. Start the MongoDB server:
   - On Windows, run in a terminal:
     ```bash
     mongod
     ```
   - Alternatively, set up MongoDB as a service:
     ```bash
     mongod --config "C:\Program Files\MongoDB\Server\<version>\mongod.cfg" --install
     net start MongoDB
     ```
3. Verify MongoDB is running on `mongodb://127.0.0.1:27017`:
   ```bash
   mongo mongodb://127.0.0.1:27017
   ```

### 2. Set Up Backend
1. Clone or navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server in development mode:
   ```bash
   npm run dev
   ```
   - Uses `nodemon` to auto-restart on file changes.
   - The server runs on `http://localhost:5000`.
4. If you encounter a MongoDB connection error (`ECONNREFUSED`), ensure:
   - MongoDB is running (see step 1).
   - The connection string in `config/db.mjs` is set to `mongodb://127.0.0.1:27017/leaderboard`.

### 3. Initialize Database
- The backend automatically creates a `leaderboard` database in MongoDB.
- Add initial users by sending a POST request to `http://localhost:5000/api/leaderboard/users` with a JSON body like:
  ```json
  {"name": "Rahul"}
  ```

## API Endpoints
- **POST /api/leaderboard/users**: Add a new user.
  - Body: `{ "name": "string" }`
- **POST /api/leaderboard/claim**: Claim random points for a user.
  - Body: `{ "userId": "string" }`
- **GET /api/leaderboard/leaderboard?page=<number>&limit=<number>**: Get paginated leaderboard data.
- **GET /api/leaderboard/history?page=<number>&limit=<number>**: Get paginated claim history.

## MongoDB Compass (Recommended)
MongoDB Compass is a GUI tool for managing MongoDB databases, useful for verifying data and debugging.

### Installing MongoDB Compass
1. Download MongoDB Compass from [MongoDB's official website](https://www.mongodb.com/try/download/compass).
2. Install and launch Compass.

### Using MongoDB Compass
1. **Connect to MongoDB**:
   - Use the URI: `mongodb://127.0.0.1:27017`.
   - Click "Connect".
2. **Explore Database**:
   - Navigate to the `leaderboard` database.
   - Check the `users` collection for user data (name, totalPoints, rank).
   - Check the `claimhistories` collection for point claim records (userId, points, timestamps).
3. **Troubleshooting**:
   - If the connection fails, ensure MongoDB is running (`mongod`) and port `27017` is not blocked by a firewall.
   - Verify database and collections are created after adding users via API.

## Troubleshooting
- **MongoDB Connection Error**:
  - Ensure MongoDB is running (`mongod` or `net start MongoDB`).
  - Verify the connection string in `config/db.mjs`.
  - Check if port `27017` is in use:
    ```bash
    netstat -a -n -o | find "27017"
    ```
  - Allow MongoDB through your firewall.
- **Dependencies**:
  - Reinstall dependencies if issues occur:
    ```bash
    npm install
    ```
- **Path Issues**:
  - If using OneDrive or a synced directory, move the project to a non-synced folder (e.g., `C:\Projects\leaderboard-backend`) to avoid file access issues.

## Running the Backend
- Start MongoDB (`mongod` or as a service).
- Run the backend:
  ```bash
  npm run dev
  ```
- Test API endpoints using tools like Postman or curl:
  - Example: `curl -X POST http://localhost:5000/api/leaderboard/users -H "Content-Type: application/json" -d '{"name":"Rahul"}'`

