import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            cb(null, 'public/img');
        } catch (err) {
            console.error(`Multer: ${err}`)
        }
    },
    filename: function (req, file, cb) {
        try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        } catch (err) {
            console.error(`Multer: ${err}`)
        }
    }
})
const upload = multer({ storage: storage});

export { upload };