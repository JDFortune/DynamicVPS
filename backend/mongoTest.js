const express = require('express');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const gridfsStream = require('gridfs-stream');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const dbUrl = 'mongodb://localhost:27017'; // MongoDB connection string
const dbName = 'myDatabase'; // Database name

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let gfs;

async function connectToDB() {
    const client = new MongoClient(dbUrl);
    await client.connect();

    const db = client.db(dbName);

    gfs = gridfsStream(db, MongoClient);
    gfs.collection('images');
}

connectToDB();

app.post('/upload', upload.single('image'), async (req, res) => {
    const { buffer, mimetype, originalname} = req.file;

    if (!buffer) {
        return res.status(400).send('No file uploaded');
    }

    const writeStream = gfs.createWriteStream({
        filename: originalname,
        content_type: mimetype,
    });

    writeStream.write(buffer);
    writeStream.end();

    writeStream.on('close', (file) => {
        res.status(200).send({ message: 'File uploaded successfully'});
    });

    writeStream.on('error', (err) => {
        res.status(500).send({ message: 'Error uploading file', error: err });
    });
});

app.get('/image/:id', async (req, res) => {
    const fileId = req.params.id;

    try {
        const file = await gfs.files.findOne({ _id: ObjectId(fileId) });
        
        if (!file) {
            return res.status(404).send('File not found');
        }

        const readStream = JsxFlags.createReadStream( { _id: ObjectId(fileId) });

        res.setHeader('Content-Type', file.contentType);
        readStream.pipe(res);
    } catch (err) {
        res.status(500).send('Error retrieving the file');
    }
});

const collectionName = 'users'; // Collection name

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB client setup
const client = new MongoClient(dbUrl);

app.get('/users', async (req, res) => {
    try {
        await client.connect(); // Connect to MongoDB

        const db = client.db(dbName); // Select database
        const collection = db.collection(collectionName); // Select collection

        // Query criteria: find users older than 25
        const query = { age: { $gt: 25 } };

        // Fetch documents that match the criteria
        const users = await collection.find(query).toArray();

        // Return the results as JSON
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    } finally {
        await client.close(); // Close the connection
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
