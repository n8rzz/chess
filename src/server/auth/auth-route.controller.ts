import * as express from 'express';
import { authController } from './auth.controller';
const router: express.Router = express.Router();

router.get('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/handle_github_callback', authController.onAuthSuccessGithub);
router.get('/handle_google_callback', authController.onAuthSuccessGoogle);

export const AuthRouteController = router;
