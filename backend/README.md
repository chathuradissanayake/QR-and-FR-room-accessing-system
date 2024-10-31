# Backend Project

## Overview

This is the backend for a door access system that uses QR and Facial Recognition for authentication. The project is built using Node.js, Express, and MongoDB.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **bcrypt**: Library to hash passwords.
- **cors**: Middleware to enable CORS.
- **dotenv**: Module to load environment variables from a `.env` file.
- **nodemon**: Tool to automatically restart the server during development.

## Purpose

The purpose of this project is to provide a secure backend for a door access system. It handles user authentication, including password hashing and verification, and interacts with a MongoDB database to store user data.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance running (local or cloud).

### Installation

Create a .env file in the root directory and add your MongoDB URI

```MONGO_URL=<your mongo URI>```