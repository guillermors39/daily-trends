import { IFeedValidator } from '../contracts';
import { FeedEntity } from '../entities';
import { FeedCannotModifyExternal } from '../exceptions';

export class FeedDeleteValidator implements IFeedValidator {
  validate(entity: FeedEntity): void {
    if (entity.source.code.isExternal()) {
      throw new FeedCannotModifyExternal();
    }
  }
}
