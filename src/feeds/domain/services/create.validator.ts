import { IFeedFindByTitleRepository } from '../contracts';
import { FeedEntity } from '../entities';
import { FeedTitleAlreadyExistsException } from '../exceptions';

export class FeedCreateValidator {
  constructor(private readonly repository: IFeedFindByTitleRepository) {}

  async validate(entity: FeedEntity): Promise<void> {
    const foundByTitle = await this.repository.findByTitle(entity.title.value);

    if (foundByTitle instanceof FeedEntity) {
      throw new FeedTitleAlreadyExistsException(foundByTitle.title.value);
    }
  }
}
