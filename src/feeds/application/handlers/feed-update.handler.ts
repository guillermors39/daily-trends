import { IHandler } from '../../../shared/domain/contracts/app.contract';
import { TUuid } from '../../../shared/domain/types';
import { IFeedUpdateRepository, IFeedValidator } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedUpdate } from '../../domain/types';

export class FeedUpdateHandler implements IHandler<TFeedUpdate, FeedEntity> {
  constructor(
    private readonly finder: IHandler<TUuid, FeedEntity>,
    private readonly validator: IFeedValidator,
    private readonly repository: IFeedUpdateRepository,
  ) {}

  async execute({ uuid, ...dto }: TFeedUpdate): Promise<FeedEntity> {
    const entity = await this.finder.execute(uuid);

    entity.update(dto);

    await this.validator.validate(entity);

    await this.repository.update(entity);

    return entity;
  }
}
