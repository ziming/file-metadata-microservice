const express = require('express');
const app = express();
app.use(express.static(__dirname + '/views'));

const multer = require('multer');
const multerOptions = {
    
    storage: multer.memoryStorage(),

    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');

        if (isPhoto) {
            // not null at 2nd value so is fine?
            next(null, true);
        } else {
            next({message: 'That filetype isn\'t allowed!'}, false);
        }
    }
};

app.get('/', (req, res) => {
    res.render('index');
    
});

app.post('/', multer(multerOptions).single('image'), (req, res, next) => {
    

    if (!req.file) {
        next(); // skip to the next middleware
        return;
    }
    
    const fileSize = req.file.size;
    
    res.json({
        msg: `File uploaded size is ${fileSize}`
    });
    
});

// To run your application run the command node server.js in your console.
// Cloud9 use port 8080
app.listen(process.env.PORT || 8080, function () {
  console.log('File Metadata App started!')
});