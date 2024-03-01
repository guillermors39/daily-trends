import { BaseJsonResource } from '../../../shared/infrastructure/resources';
import { FeedEntity } from '../../domain/entities';

export class FeedResource extends BaseJsonResource {
  constructor(private readonly entity: FeedEntity | null) {
    super();
  }

  response(): object | null {
    if (!this.entity) return null;

    return {
      uuid: this.entity.uuid,
      title: this.entity.title,
      subtitle: this.entity.subtitle,
      authors: this.entity.authors,
      source: this.entity.source,
      date: this.entity.date.toISOString(),
    };
  }
}
