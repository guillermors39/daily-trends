import { ValidationException } from '../../../shared/domain/exceptions';

export class FeedTitleAlreadyExistsException extends ValidationException {
  constructor(title: string) {
    const message = `Feed with title «${title}» already exists`;

    super(message);
  }
}
