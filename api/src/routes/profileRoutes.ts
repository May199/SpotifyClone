import express, { Request, Response } from 'express';

import profileValidation from '@/middleware/profileValidation';
import getUserData from '@/utils/getUserData';
import updateUserData from '@/utils/updateUserData';

const route = express.Router();

route.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { users } = await getUserData();

  const matchedUser = users.filter( user => user.id === parseInt(id))[0]

  if(!matchedUser) return res.status(404).json({ message: 'User not found!' }) ;

  matchedUser.password = ''
  matchedUser.birth = matchedUser.birth.substr(0, 10)
  
  res.status(200).json(matchedUser);
})

route.put(
  '/update/:id',
  profileValidation.update(),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

   const result = await updateUserData(parseInt(id), data)

   if(result.error)
    return res.status(result.status).json({ message: result.error });

    return res.status(200).json({ message: result.message });
  }
);

export default route