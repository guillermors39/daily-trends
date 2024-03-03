import { IHandler } from '../../../shared/domain/contracts/app.contract';
import { TUuid } from '../../../shared/domain/types';
import { IFeedFindRepository } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { FeedNotFoundException } from '../../domain/exceptions';

export class FeedFindHandler implements IHandler<TUuid, FeedEntity> {
  constructor(private readonly repository: IFeedFindRepository) {}

  async execute(uuid: TUuid): Promise<FeedEntity> {
    const entity = await this.repository.find(uuid);

    if (!entity) {
      throw new FeedNotFoundException(uuid);
    }

    return entity;
  }
}
