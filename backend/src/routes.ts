import { Router } from 'express';

import authMiddleware from './middlewares/authMiddleware';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import PartyController from './controllers/PartyController';
import FavoriteController from './controllers/FavoriteController';
import MyPartyController from './controllers/MyPartyController';

const router = Router();

router.post('/users', UserController.store);
router.post('/auth', AuthController.authenticate);

router.post('/partys', authMiddleware, PartyController.store);
router.get('/partys',  PartyController.index);
router.get('/partys/:id', PartyController.show);
router.delete('/partys/:id', authMiddleware, PartyController.destroy);

router.get('/myPartys', authMiddleware, MyPartyController.index);

router.post('/favorites', authMiddleware, FavoriteController.store);
router.get('/favorites', authMiddleware, FavoriteController.index);
router.get('/favorites/:id', authMiddleware, FavoriteController.show);
router.delete('/favorites/:id', authMiddleware, FavoriteController.destroy);


export default router;
