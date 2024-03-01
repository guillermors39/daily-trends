import { FeedEntity } from '../../domain/entities';

export class FeedEntityToModelMapper {
  static execute(entity: FeedEntity) {
    return {
      title: entity.title,
      subtitle: entity.subtitle,
      authors: entity.authors.map((item) => item),
      body: entity.body,
      location: entity.location,
      date: entity.date,
      source: {
        code: entity.source.code,
        url: entity.source.url,
      },
    };
  }
}
