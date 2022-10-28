import express from 'express';
import cors from 'cors';

import errors from '@/utils/errors'

import playlistRoutes from '@routes/playlistRoutes';
import songListRoutes from '@routes/songListRoutes';
import registerRoutes from '@routes/registerRoutes';
import loginRoutes from '@routes/loginRoutes';
import profileRoutes from '@routes/profileRoutes';


const app = express();

app.use(cors());
app.use(express.static(__dirname + '/../public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/playlists', playlistRoutes);
app.use('/songs', songListRoutes);
app.use('/register', registerRoutes);
app.use('/profile', loginRoutes);
app.use('/profile', profileRoutes);

app.use(errors())

export default app;