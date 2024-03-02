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
    private _uuid: TUuid,
    private _title: string,
    private _subtitle: string,
    private _body: string,
    private _location: string,
    private _authors: string[],
    private _source: Source,
    private _date: Date,
  ) {
    super();
  }

  get uuid(): TUuid {
    return this._uuid;
  }

  get title(): string {
    return this._title;
  }

  get subtitle(): string {
    return this._subtitle;
  }

  get body(): string {
    return this._body;
  }

  get location(): string {
    return this._location;
  }

  get authors(): string[] {
    return this._authors;
  }

  get source(): Source {
    return this._source;
  }

  get date(): Date {
    return this._date;
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

  update({ title, subtitle, body, location, authors }: TFeedCreate): void {
    this._title = title;
    this._subtitle = subtitle;
    this._body = body;
    this._authors = authors;
    this._location = location;
  }
}
