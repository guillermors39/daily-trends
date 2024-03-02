import { NotFoundException } from '../../../shared/application/exceptions';

export class FeedNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(id, 'Feed');
  }
}
