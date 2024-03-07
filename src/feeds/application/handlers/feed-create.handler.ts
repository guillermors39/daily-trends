import {
  IHandler,
  IUuidGenerator,
} from '../../../shared/domain/contracts/app.contract';
import { IFeedCreateRepository, IFeedValidator } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedCreate } from '../../domain/types';

export class FeedCreateHandler implements IHandler<TFeedCreate, FeedEntity> {
  constructor(
    private readonly uuidGenerator: IUuidGenerator,
    private readonly validator: IFeedValidator,
    private readonly repository: IFeedCreateRepository,
  ) {}

  async execute(dto: TFeedCreate): Promise<FeedEntity> {
    const uuid = this.uuidGenerator.execute();

    const entity = FeedEntity.create(uuid, dto);

    await this.validator.validate(entity);

    await this.repository.create(entity);

    return entity;
  }
}
