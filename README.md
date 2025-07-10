# Push-Notification-in-React-and-Node-js

This project demonstrates how to implement push notifications using the Web Push API with a Node.js backend and a React frontend.
Project Structure

```
push-notification-demo/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── sw.js
│   ├── src/
│   │   └── App.js
│   └── package.json
└── README.md
```


backend/: Contains the Node.js server (server.js) that manages subscriptions and sends push notifications.
frontend/: Contains the React application that registers a service worker and subscribes to push notifications.

Prerequisites

Node.js (version 14 or higher)
npm (version 6 or higher)
A web browser that supports service workers and the Push API (e.g., Chrome, Firefox)

Installation

Clone the repository:git clone https://github.com/shuvosa/Push-Notification-in-React-and-Node-js.git


Install backend dependencies:cd push-notification-demo/backend
npm install


Install frontend dependencies:cd ../frontend
```
npm install
```


Usage

Start the backend server:
cd backend
```
node server.js
```
The server will run on http://localhost:5000.

Start the frontend application:
cd ../frontend
```
npm start
```

The React app will run on http://localhost:3000.

Open your browser and navigate to http://localhost:3000. The application will prompt for notification permissions, register the service worker, and subscribe to push notifications.
```
To send a notification, use a tool like Postman to send a POST request to http://localhost:5000/send-notification with a JSON body:
{
  "title": "Notification Title",
  "message": "Notification message body"
}

```

Service Worker
The frontend requires a service worker to handle push notifications. Create a file named sw.js in the frontend/public/ directory with the following content:
```
self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.message,
  });
});
```
This service worker listens for push events and displays notifications when received.
Configuration

VAPID Keys: The VAPID keys are hardcoded in server.js and App.js. For production, generate your own keys using npx web-push generate-vapid-keys and update the code accordingly. Keep the private key secure and avoid exposing it in the frontend.
Port: The backend server runs on port 5000. Modify the PORT variable in server.js to change it.
Subscription Storage: Subscriptions are stored in memory and will be lost on server restart. For persistence, consider using a database in a production environment.

Contributing
Open issues or submit pull requests on the GitHub repository for bugs or improvements.
License
MIT License
