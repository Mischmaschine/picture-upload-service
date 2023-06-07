import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file?.originalname);
    res.status(200).json({
        message: 'Bild erfolgreich hochgeladen!',
        file: req.file,
    });
});

app.get('/images/:imageName', (req, res) => {
    console.log(req.params.imageName);
    res.sendFile(path.join(__dirname, '..', 'uploads/' + req.params.imageName));
});

const port = 3000;
app.listen(port, () => console.log(`Server läuft auf Port ${port}`));