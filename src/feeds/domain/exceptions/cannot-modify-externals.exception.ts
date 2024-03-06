import { ValidationException } from '../../../shared/domain/exceptions';

export class FeedCannotModifyExternal extends ValidationException {
  constructor() {
    const message = `Cannot modify or delete external feed`;

    super(message);
  }
}
