import * as express from 'express';
import {userController} from './user.controller';

const router: express.Router = express.Router();

// router.get('/', userController.getProfileList);
router.post('/create', userController.createProfile);
router.get('/', userController.getProfile);
router.put('/update', userController.updateProfile);
router.delete('/delete', userController.destroyProfile);

export const UserRouteController: express.Router = router;
