process.env.UV_THREAD_POOL_SIZE = 1;

import cluster from 'cluster';
import express from  'express';
import crypto from 'crypto';

// Checks if the file being executed is in master mode
if (cluster.isPrimary) {
    // Executes the index.js file again but in child mode
    cluster.fork();
} else {
    // Child process that will act as the server and do noting else
    const app = express();

    /**
     * This will a work that will be processed depending on the given duration.
     * @param {int} duration 
     */
    function doWork(duration) {
        const start = Date.now();

        while (Date.now() - start < duration) {

        }
    }

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there!');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!');
    });

    app.listen(3000);
}