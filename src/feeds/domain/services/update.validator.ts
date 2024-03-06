import { ValidationException } from '../../../shared/domain/exceptions';
import { IFeedAsyncValidator, IFeedFindByTitleRepository } from '../contracts';
import { FeedEntity } from '../entities';
import { FeedTitleAlreadyExistsException } from '../exceptions';

export class FeedUpdateValidator implements IFeedAsyncValidator {
  constructor(private readonly repository: IFeedFindByTitleRepository) {}

  async validate(entity: FeedEntity): Promise<void> {
    const foundByTitle = await this.repository.findByTitle(entity.title.value);

    if (entity.source.code.isExternal()) {
      throw new ValidationException('Cannot modify external feeds');
    }

    if (
      foundByTitle instanceof FeedEntity &&
      entity.uuid.value !== foundByTitle.uuid.value
    ) {
      throw new FeedTitleAlreadyExistsException(foundByTitle.title.value);
    }
  }
}
