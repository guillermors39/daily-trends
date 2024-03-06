import { IHandler } from '../../../shared/domain/contracts/app.contract';
import { TUuid } from '../../../shared/domain/types';
import { IFeedDeleteRepository, IFeedValidator } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';

export class FeedDeleteHandler implements IHandler<TUuid> {
  constructor(
    private readonly finder: IHandler<TUuid, FeedEntity>,
    private readonly validator: IFeedValidator,
    private readonly repository: IFeedDeleteRepository,
  ) {}

  async execute(uuid: TUuid): Promise<void> {
    const entity = await this.finder.execute(uuid);

    this.validator.validate(entity);

    return this.repository.delete(uuid);
  }
}
