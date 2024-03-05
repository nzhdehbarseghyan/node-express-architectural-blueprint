import app from './app.js';
import mongoose from './config/database.js';

mongoose(process.env.DATABASE_URL);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
