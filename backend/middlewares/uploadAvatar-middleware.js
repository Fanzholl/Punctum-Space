import multer from 'multer';

const uploadsAvatarStorge = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/avatars');
    },

    filename(req, file, cb) {
        cb(null, file.fieldname + req.params.id.slice(1) + `.` + file.mimetype.split('/')[1]);
    },

});

const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const avatarFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}



export default multer({ storage: uploadsAvatarStorge, fileFilter: avatarFilter });