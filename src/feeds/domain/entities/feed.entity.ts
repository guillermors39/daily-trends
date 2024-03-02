import { AggregateEntity } from '../../../shared/domain/entities';
import { TUuid } from '../../../shared/domain/types';
import { ESourceCode } from '../enums';
import { TFeedCreate, TFeedDto } from '../types';

class Source {
  constructor(
    public readonly code: ESourceCode,
    public readonly url: string,
  ) {}

  static fromLocal(uuid: string): Source {
    return new Source(ESourceCode.local, `/feeds/${uuid}`);
  }
}

export class FeedEntity extends AggregateEntity {
  constructor(
    public readonly uuid: TUuid,
    public readonly title: string,
    public readonly subtitle: string,
    public readonly body: string,
    public readonly location: string,
    public readonly authors: string[],
    public readonly source: Source,
    public readonly date: Date,
  ) {
    super();
  }

  static create(uuid: TUuid, dto: TFeedCreate): FeedEntity {
    const { title, subtitle, body, location, authors, date } = dto;

    const source = Source.fromLocal(uuid);

    return new FeedEntity(
      uuid,
      title,
      subtitle,
      body,
      location,
      authors,
      source,
      new Date(date),
    );
  }

  static fromDto(dto: TFeedDto): FeedEntity {
    return this.create(dto.uuid, dto);
  }
}
