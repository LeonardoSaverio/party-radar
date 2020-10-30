import { Request, Response } from 'express';
import { AdvancedConsoleLogger, getRepository } from 'typeorm';
import Party from '../models/Party';
import partyView from '../views/party_view';
import { validate } from 'class-validator'

class PartyController {

  async index(request: Request, response: Response) {
    const partysRepository = getRepository(Party);
    const partys = await partysRepository.find();
    return response.status(200).json(partyView.renderManyPartys(partys));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const partysRepository = getRepository(Party);
    const party = await partysRepository.findOneOrFail(id);
    return response.status(200).json(partyView.renderDetail(party));
  }

  async store(request: Request, response: Response) {
    const { whatsapp,
      uf,
      city,
      party_name,
      type_party,
      description,
      date_time,
      latitude,
      longitude,
      user = request.user.id
    } = request.body;

    const partysRepository = getRepository(Party);

    const party = partysRepository.create({
      whatsapp,
      uf,
      city,
      party_name,
      type_party,
      description,
      date_time,
      latitude,
      longitude,
      user
    });


    const errors = await validate(party)
    if (errors.length > 0) {
      return response.status(400).json(errors.map(err => err.constraints))
    }

    await partysRepository.save(party);

    return response.status(201).json(party);

  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;
    const partysRepository = getRepository(Party);

    try {
      const partyExists = await partysRepository.findOne({ where: { id } });
      if (!partyExists) {
        console.log('party não existe')
        return response.sendStatus(404);
      }

      await partysRepository.delete(id);

      return response.sendStatus(204);

    } catch(err) {
      console.error(err);
      return response.sendStatus(404);
    }
  }

}

export default new PartyController();