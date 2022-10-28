import express, { Request, Response } from 'express';

import multerConfigSong from '@/config/multerConfigSong';

import getSongListData from '@/utils/getSongListData';
import setSongListData from '@/utils/setSongListData';

const route = express.Router();

route.get('/', async (req: Request, res: Response) => {
  const lists = await getSongListData();
  return res.json(lists);
});

route.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const lists = await getSongListData();
  const list = lists.filter((l) => l.playlistId === id)[0];
  
  return res.json(list.songList);
});

route.post(
  '/create',
  multerConfigSong.single('song'),
  async (req: Request, res: Response) => {
    console.log(req.file);

    const { title, author } = req.body;
    const playlistId = parseInt(req.body.playlistId);
    const userId = parseInt(req.body.userId);
    const path = `mp3/${userId}/${playlistId}/${req.file.filename}`;

    const response = await setSongListData({ playlistId, author, path, title });

    return res
      .status(response.status)
      .json({ message: response.message || response.error });
  }
);

export default route;
