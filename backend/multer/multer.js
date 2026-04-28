import multer from 'multer';
import path from 'path';

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'musicImage') {
            cb(null, 'uploads/images/'); // Destination folder for image files
        } else if (file.fieldname === 'musicAudio') {
            cb(null, 'uploads/audio/'); // Destination folder for audio files
        } else {
            cb(new Error('Invalid fieldname'), null); // Reject files with invalid fieldname
        }
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext); // Set filename with a timestamp to avoid overwriting
    }
});



// Initialize Multer with configuration
 export const upload = multer({ storage: storage});

// Middleware to handle file uploads
