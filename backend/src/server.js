import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

// Setup body-parser
app.use(express.json());

// If the DELAYS environment variable is set, add a one-second delay to all requests.
if (process.env.DELAYS === 'true') {

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    app.use(async (req, res, next) => {

        await sleep(1000);
        next();
    });
}

// If the RANDOM_ERRORS variable is set, fail 50% of requests with a 500 error.
if (process.env.RANDOM_ERRORS === 'true') {
    app.use((req, res, next) => {
        if (Math.random() > 0.5) {
            res.sendStatus(500);
        }
        else {
            next();
        }
    });
}

// Setup our routes.
import routes from './routes';
app.use('/', routes);

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, '../public')));

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // Make all files in that folder public
    app.use(express.static(path.join(__dirname, '../../frontend/build')));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });
}

// Start the DB running. Then, once it's connected, start the server.
mongoose.connect('mongodb://localhost:27017/cs732-se750-quiz-2022', { useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));