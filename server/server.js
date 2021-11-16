require('dotenv').config();

const express = require('express');
const cors = require('cors');
const webpush = require('web-push');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use(cors());

webpush.setVapidDetails(
    `mailto:${ process.env.EMAIL_ADDRESS }`,
    process.env.PUBLIC_KEY,
    process.env.PRIVATE_KEY
);

app.get('/', (_req, res) => {
    res.send('Server is up!!!');
});

app.post('/notifications/subscribe', async ({ body }, res) => {
    const { title, description, icon, subscription } = body;

    const payload = JSON.stringify({ title, description, icon });
    const result = await webpush.sendNotification(subscription, payload);
    console.log(result.headers.date);

    res.status(200).json({ 'success': true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${ PORT }`));