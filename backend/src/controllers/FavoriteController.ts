import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Favorite from '../models/Favorite';
import favoriteView from '../views/favorite_view'

class FavoriteController {
  async index(request: Request, response: Response) {
    const user_id = request.user.id;
    const favoritesRepository = getRepository(Favorite);

    const favorites = await favoritesRepository.find({ relations: ['party'], where: { user: user_id } });
    return response.status(200).json(favoriteView.renderMany(favorites));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const favoritesRepository = getRepository(Favorite);
    const favorite = await favoritesRepository.findOne({ relations: ['party'], where: { party: id } });
    // @ts-ignore
    return response.status(200).json(favoriteView.render(favorite));
  }


  async store(request: Request, response: Response) {
    const user_id = request.user.id;
    const {
      user = user_id,
      party,
      isFavorited
    } = request.body;
    const favoritesRespository = getRepository(Favorite);
    const favorite = favoritesRespository.create({
      isFavorited,
      user,
      party
    })

    const errors = await validate(favorite)
    if (errors.length > 0) {
      return response.status(400).json(errors.map(err => err.constraints))
    }

    await favoritesRespository.save(favorite);
    return response.status(201).json(favorite);
  }


  async destroy(request: Request, response: Response) {

    const { id } = request.params;
    const favoritesRepository = getRepository(Favorite);

    try {
      const favoriteExists = await favoritesRepository.findOne(id);
      if (!favoriteExists) {
        return response.sendStatus(404);
      }

      await favoritesRepository.delete(id)

      return response.sendStatus(204);

    } catch (err) {
      console.error(err);
      return response.sendStatus(404);
    }

  }


}

export default new FavoriteController();