import {Request, Response} from 'express';
import {prisma} from '../..';

export const profileUserid = async (req: Request, res: Response) => {
  const {id} = req.params;
 


  try {
    const userData = await prisma.profile.findUnique({
      where: {
        userId: id as string,
      },
    });
    res.json(userData);
  } catch (e) {
    console.log(e, 'get user error');
  }}