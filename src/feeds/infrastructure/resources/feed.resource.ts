import { FeedEntity } from '../../domain/entities';

export class FeedResource {
  constructor(private readonly entity: FeedEntity) {}

  response(): object {
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
