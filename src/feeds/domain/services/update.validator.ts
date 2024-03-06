import { IFeedFindByTitleRepository, IFeedValidator } from '../contracts';
import { FeedEntity } from '../entities';
import {
  FeedCannotModifyExternal,
  FeedTitleAlreadyExistsException,
} from '../exceptions';

export class FeedUpdateValidator implements IFeedValidator {
  constructor(private readonly repository: IFeedFindByTitleRepository) {}

  async validate(entity: FeedEntity): Promise<void> {
    const foundByTitle = await this.repository.findByTitle(entity.title.value);

    if (entity.source.code.isExternal()) {
      throw new FeedCannotModifyExternal();
    }

    if (
      foundByTitle instanceof FeedEntity &&
      entity.uuid.value !== foundByTitle.uuid.value
    ) {
      throw new FeedTitleAlreadyExistsException(foundByTitle.title.value);
    }
  }
}
