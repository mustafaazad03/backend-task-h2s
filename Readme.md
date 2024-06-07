# Task Management API - Express.js & MongoDB Assignment

A backend API developed using Express.js and MongoDB to manage tasks and subtasks for users. This API allows users to perform CRUD operations (Create, Retrieve, Update, Delete) on tasks and subtasks. It also supports soft deletion, ensuring deleted tasks and subtasks are excluded from GET API responses without affecting CRUD operations.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Manual Testing with Postman](#manual-testing-with-postman)
- [Swagger Documentation](#swagger-documentation)

## Features

- **User Management**: Create and update user information.
- **Task Management**: Perform CRUD operations on tasks.
- **Subtask Management**: Perform CRUD operations on subtasks within a task.
- **Soft Deletion**: Mark tasks and subtasks as deleted without removing them from the database.
- **Error Handling**: error handling for all API endpoints.
- **Environment Configuration**: Configuration using dotenv.
- **API Documentation**: Integrates Swagger for detailed API documentation and testing.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mustafaazad03/backend-task-h2s.git
   cd backend-task-h2s
   ```

2. **Install dependencies**

   ```bash
   npm install or yarn install or pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```
   MONGO_URI=mongodb://localhost:27017/your-database
   NODE_ENV=development
   PORT=4004
   ```

4. **Start the server**

   ```bash
   npm start or yarn start or pnpm start
   ```

## Usage

Once the server is running, you can use tools like Postman or ThunderClient to interact with the API. Below are the available endpoints.

## API Endpoints

### User Endpoints

- **Create User**

  ```
  POST /api/user
  ```

  Request Body:

  ```json
  {
  	"name": "John Doe",
  	"email": "john@example.com"
  }
  ```

- **Update User**

  ```
  PUT /api/user/:userId
  ```

  Request Body:

  ```json
  {
  	"name": "John Doe",
  	"email": "john@example.com"
  }
  ```

### Task Endpoints

- **List Tasks**

  ```
  GET /api/tasks?userId=<userId>
  ```

- **Create Task**

  ```
  POST /api/tasks
  ```

  Request Body:

  ```json
  {
  	"userId": "userId",
  	"subject": "New Task",
  	"deadline": "2024-12-31T23:59:59Z",
  	"status": "Pending"
  }
  ```

- **Update Task**

  ```
  PUT /api/tasks/:taskId
  ```

  Request Body:

  ```json
  {
  	"userId": "userId",
  	"subject": "Updated Task",
  	"deadline": "2024-12-31T23:59:59Z",
  	"status": "Completed"
  }
  ```

- **Delete Task**

  ```
  DELETE /api/tasks/:taskId
  ```

  Request Body:

  ```json
  {
  	"userId": "userId"
  }
  ```

### Subtask Endpoints

- **List Subtasks**

  ```
  GET /api/tasks/:taskId/subtasks?userId=<userId>
  ```

- **Update Subtasks**

  ```
  PUT /api/tasks/:taskId/subtasks
  ```

  Request Body:

  ```json
  {
  	"userId": "userId",
  	"subtasks": [
  		{
  			"subject": "Subtask 1",
  			"deadline": "2024-12-31T23:59:59Z",
  			"status": "Pending"
  		},
  		{
  			"subject": "Subtask 2",
  			"deadline": "2024-12-31T23:59:59Z",
  			"status": "Completed"
  		}
  	]
  }
  ```

## Environment Variables

The application uses the following environment variables:

- `MONGO_URI`: The MongoDB connection string.
- `NODE_ENV`: The environment in which the application is running (development, production, etc.).
- `PORT`: The port on which the server will run.

## Project Structure

```
├── /app
│
├── /config
│   └── db.js
│   └── swager.js
│
│├── /controllers
││   ├── taskController.js
││   ├── subtaskController.js
││   └── userController.js
││
│├── /middlewares
││   └── errorHandler.js
││
│├── /models
││   └── User.js
││
│├── /routes
││   ├── taskRoutes.js
││   ├── subtaskRoutes.js
││   └── userRoutes.js
││
│├── /services
││   ├── taskService.js
││   ├── subtaskService.js
││   └── userService.js
││
├── index.js
├── package.json
├── .env
└── README.md
```

## Testing

To run the tests, use the following command:

```bash
npm test
```

### Manual Testing with Postman

You can manually test the API using Postman by creating requests for each endpoint. Ensure to cover edge cases such as:

- Creating a user with missing fields.
- Updating a task with an invalid task ID.
- Deleting a task that does not exist.
- Listing subtasks for a task marked as deleted.

## Swagger Documentation

The API documentation is available at `http://localhost:4004/api-docs` once the server is running. You can use Swagger to test the API endpoints and view detailed documentation.

```bash
http://localhost:4004/api-docs
```
