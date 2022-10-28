import express, { Request, Response } from 'express';

import getUserData from '@/utils/getUserData';

const route = express.Router();

route.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { users } = await getUserData();

  const matchedUser = users.filter((user) => user.email === email)[0];

  if (!matchedUser) return res.status(400).json({ message: 'Invalid Email!' });

  if (!(matchedUser.password === password))
    return res.status(400).json({ message: 'Invalid Password!' });

  return res.status(200).json({
    userURL: matchedUser.name.replace(/\s/g, ''),
    user: {
      name: matchedUser.name,
      id: matchedUser.id,
    },
  });
});

route.get('/session/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { users } = await getUserData();

  const matchedUser = users.filter((user) => user.id === parseInt(id))[0];

  if (!matchedUser) return res.status(404).json({ message: 'There\'s no such user!' });

  return res.status(200).json({
    userURL: matchedUser.name.replace(/\s/g, ''),
    user: {
      name: matchedUser.name,
      id: matchedUser.id,
    },
  });
});

export default route;
