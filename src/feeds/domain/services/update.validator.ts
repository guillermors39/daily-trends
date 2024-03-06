import { ValidationException } from '../../../shared/domain/exceptions';
import { IFeedFindByTitleRepository } from '../contracts';
import { FeedEntity } from '../entities';
import { FeedTitleAlreadyExistsException } from '../exceptions';

export class FeedUpdateValidator {
  constructor(private readonly repository: IFeedFindByTitleRepository) {}

  async validate(entity: FeedEntity): Promise<void> {
    const foundByTitle = await this.repository.findByTitle(entity.title.value);

    if (entity.source.code.isExternal()) {
      throw new ValidationException('Cannot modify external feeds');
    }

    if (
      foundByTitle instanceof FeedEntity &&
      entity.uuid !== foundByTitle.uuid
    ) {
      throw new FeedTitleAlreadyExistsException(foundByTitle.title.value);
    }
  }
}
