import express, { Request, Response } from 'express';

import getPlaylistsData from '@/utils/getPlaylistsData';
import setPlaylistData from '@/utils/setPlaylistData';

import multerConfigPlaylist from '@/config/multerConfigPlaylist';

const route = express.Router();

route.get('/', async (req: Request, res: Response) => {
  const userId = (req.query as any).userId
  const lists = await getPlaylistsData();
  if(userId) {
    return res.json(lists.filter((list) => list.userId === parseInt(userId)));
  }
  
  return res.json(lists.filter((list) => list.userId === undefined));
});

route.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const lists = await getPlaylistsData();
  const list = lists.filter((l) => l.id === id)[0];
  return res.json(list);
});

route.post(
  '/create',
  multerConfigPlaylist.single('cover'),
  async (req: Request, res: Response) => {
    console.log(req.file);
    const { playlistName } = req.body;
    const userId = parseInt(req.body.userId);
    const cover = `cover/${req.file.filename}`;

    const newPlaylist = {
      userId,
      cover,
      playlistName,
    };

    const response = await setPlaylistData(newPlaylist);

    return res
      .status(response.status)
      .json({ message: response.message || response.error });
  }
);

route.put(
  '/:id',
  multerConfigPlaylist.single('cover'),
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { playlistName } = req.body

    const playlists = await getPlaylistsData();

    const playlistToEdit = playlists.filter( p => p.id === id)[0];

    
  }
);

export default route;
