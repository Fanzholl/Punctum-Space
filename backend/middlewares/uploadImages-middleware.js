import multer from 'multer';

const uploadImagesStorge = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/postsImages');
    },

    filename(req, file, cb) {
        cb(null, file.name + req.params.id.slice(1) + `.` + file.mimetype.split('/')[1]);
    },

});

const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const imagesFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}



export default multer({ storage: uploadImagesStorge, fileFilter: imagesFilter });