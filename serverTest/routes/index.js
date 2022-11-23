import express from 'express';
import {userPost} from './users_router.js';

const router = express.Router();

    router.post('/save-users', (req, res) => userPost.create(req, res));


export {router};