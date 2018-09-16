import * as express from 'express';
import {ProfileController} from './profile.controller';

const router: express.Router = express.Router();

router.get('/', ProfileController.getProfile);
router.put('/:profileId/update', ProfileController.updateProfile);
router.delete('/:profileId/delete', ProfileController.destroyProfile);

export const ProfileRouteController: express.Router = router;
