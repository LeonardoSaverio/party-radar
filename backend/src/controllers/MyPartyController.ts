import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Party from '../models/Party';
import myPartyView from '../views/myParty_view'

class MyPartyController {

  async index(request: Request, response: Response) {
    const user_id = request.user.id;
    const partysRepository = getRepository(Party);

    const partys = await partysRepository
      .createQueryBuilder('partys')
      .where('partys.user_id =:user_id', { user_id })
      .getMany();
    return response.status(200).json(myPartyView.renderManyMyPartys(partys));
  }


}

export default new MyPartyController();