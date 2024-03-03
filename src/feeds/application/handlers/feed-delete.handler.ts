import { IHandler } from '../../../shared/domain/contracts/app.contract';
import { TUuid } from '../../../shared/domain/types';
import { IFeedDeleteRepository } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';

export class FeedDeleteHandler implements IHandler<TUuid> {
  constructor(
    private readonly finder: IHandler<TUuid, FeedEntity>,
    private readonly repository: IFeedDeleteRepository,
  ) {}

  async execute(uuid: TUuid): Promise<void> {
    await this.finder.execute(uuid);

    return this.repository.delete(uuid);
  }
}
