// src/App.js
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker Registered');
          return registration.pushManager.getSubscription()
            .then(subscription => {
              if (subscription) return subscription;

              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BA0yb9OssLk4cja-zZRaT7_-98pk9nSc0vyCfCzE13DFKUcRDZpSUC3QRFk1Q_LCWFOZ2wO-HYXGooGq8asPnuk')
              });
            });
        })
        .then(subscription => {
          fetch('http://localhost:5000/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        });
    }
  }, []);

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return (
    <div className="App">
      <h1>Push Notification Demo</h1>
    </div>
  );
}

export default App;
