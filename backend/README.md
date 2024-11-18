# Backend for QR and FR Room Accessing System

This is the backend service for the QR and FR Room Accessing System. It handles authentication, database interactions, and other server-side logic.

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/qr-and-fr-room-accessing-system.git
    cd qr-and-fr-room-accessing-system/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the backend folder and add the following environment variables:
    ```env
    MONGO_URL = your_mongo_url
    JWT_SECRET = your_jwt_secret
    FRONTEND_URL = http://localhost:5173
    PORT = 8000
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Usage

The backend server will be running on `http://localhost:8000`. You can interact with the API using tools like Postman or through the frontend application.

