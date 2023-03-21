import express from 'express';

import homeController from '../controllers/homeController';

let router = express.Router();

const initWebRoute = (app) => {

    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:userId', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);

    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.updateUser)

    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)
    return app.use('/', router);
}

export default initWebRoute;