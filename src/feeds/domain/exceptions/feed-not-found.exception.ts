import { NotFoundException } from '../../../shared/domain/exceptions';

export class FeedNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(id, 'Feed');
  }
}
