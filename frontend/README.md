

## Project Overview
This project is the frontend part of the QR and FR Room Accessing System. It is built using modern web technologies to provide a seamless user experience.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/chathuradissanayake/QR-and-FR-room-accessing-system.git
    ```
2. Navigate to the frontend directory:
    ```sh
    cd QR-and-FR-room-accessing-system/frontend
    ```
3. Install the dependencies:
    ```sh
    npm install react-qr-reader --force
    npm install compressorJs --force
    npm install mqtt --save --force
    npm install
    ```

### Environment Variables
Create a `.env` file in the root of the frontend directory and add the necessary environment variables. Here is an example of what the `.env` file might look like:
```
VITE_API_URL = http://localhost:8000

VITE_API="need to add api the key"
VITE_USER="need to add username"
VITE_OTHER="need to add the value of other"


```

### Running the Application
To start the development server, run:
```sh
npm run dev
```
This will start the application on `http://localhost:5173`.

## Build
To build the application for production, run:
```sh
npm run build
```
This will create a `build` directory with the production build of your app.


