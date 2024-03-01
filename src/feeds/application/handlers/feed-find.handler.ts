import { IHandler } from '../../../shared/domain/contracts/app.contract';
import { TUuid } from '../../../shared/domain/types';
import { IFeedFindRepository } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';

export class FeedFindHandler implements IHandler<TUuid, FeedEntity | null> {
  constructor(private readonly repository: IFeedFindRepository) {}

  async execute(uuid: TUuid): Promise<FeedEntity | null> {
    const entity = this.repository.find(uuid);

    return entity;
  }
}
