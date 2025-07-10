// server.js
const express = require('express');
const bodyParser = require('body-parser');
var cors=require("cors");
const webpush = require('web-push');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const publicVapidKey = 'BA0yb9OssLk4cja-zZRaT7_-98pk9nSc0vyCfCzE13DFKUcRDZpSUC3QRFk1Q_LCWFOZ2wO-HYXGooGq8asPnuk';
const privateVapidKey = '-oq9JupAJhs0QDXihnR0o5HQ1pLrAVFrsdsqLB2u91M';

webpush.setVapidDetails(
  'mailto:shuvosa67@yahoo.com',
  publicVapidKey,
  privateVapidKey
);

const subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/send-notification', (req, res) => {
  const { title, message } = req.body;
  const payload = JSON.stringify({ title, message });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(error => {
      console.error(error.stack);
    });
  });

  res.status(200).json({});
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
