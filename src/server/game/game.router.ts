import * as express from 'express';

const router: express.Router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    console.log('game.router#index');

    res.status(200).send('game.router#index');
});

router.post('/', (req: express.Request, res: express.Response) => {
    console.log('game.router#post');

    res.status(200).send('game.router#create');
});

router.get('/:gameId', (req: express.Request, res: express.Response) => {
    res.status(200).render('game', {
        title: 'game',
        gameId: req.params.id,
        initialState: JSON.stringify({}),
    });
});

router.delete('/:gameId', (req: express.Request, res: express.Response) => {
    console.log('game.router#delete: ', req.params.gameId);

    res.status(200).send('game.router#delete');
});

export const gameRouter: express.Router = router;
