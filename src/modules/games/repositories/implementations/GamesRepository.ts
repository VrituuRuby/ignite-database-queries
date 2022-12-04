import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    const games = this.repository.createQueryBuilder("game")
      .where('game.title ILIKE  :title', {title: `%${param}%`})
      .getMany()
    return games
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    const counter = await this.repository.query("SELECT COUNT(title) FROM games");
    return counter;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const users = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.games', 'game')
      .where('game.id = :gameId', {gameId: id})
      .getMany()

    return users
  }

}
