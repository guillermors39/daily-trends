import { IUuidGenerator } from '../../../shared/domain/contracts/app.contract';
import { IFeedCreateRepository } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedCreate } from '../../domain/types';

export class FeedCreateHandler {
  constructor(
    private readonly uuidGenerator: IUuidGenerator,
    private readonly repository: IFeedCreateRepository,
  ) {}

  async execute(dto: TFeedCreate): Promise<FeedEntity> {
    const uuid = this.uuidGenerator.execute();

    const entity = FeedEntity.create(uuid, dto);

    try {
      await this.repository.create(entity);
    } catch (error) {
      // TODO: either pattern
    }

    return entity;
  }
}
