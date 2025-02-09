import {Request, Response} from 'express';
import {prisma} from '../..';

export const profileUserid = async (req: Request, res: Response) => {
  const {id} = req.params;
  console.log(id, 'id');


  try {
    const userData = await prisma.profile.findUnique({
      where: {
        id: id as string,
      },
    });
    res.json(userData);
  } catch (e) {
    console.log(e, 'get user error');
  }
}
