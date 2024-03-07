import { AggregateEntity } from '../../../shared/domain/entities';
import { TUuid } from '../../../shared/domain/types';
import {
  DateVO,
  StringVO,
  Uuid,
} from '../../../shared/domain/valueObjects/base.vo';
import { ESourceCode } from '../enums';
import {
  TFeedCreate,
  TFeedCreateFromSource,
  TFeedDto,
  TSource,
} from '../types';
import { AuthorsCollection, SourceCode, Title } from '../valueObjects/feed.vo';

class Source {
  constructor(
    private readonly _code: SourceCode,
    private readonly _url: StringVO,
  ) {}

  get code(): SourceCode {
    return this._code;
  }

  get url(): StringVO {
    return this._url;
  }

  static fromLocal(uuid: string): Source {
    return new Source(SourceCode.local(), new StringVO(`/feeds/${uuid}`));
  }

  static create(code: ESourceCode, url: string): Source {
    return new Source(new SourceCode(code), new StringVO(url));
  }

  toPrimitive(): TSource {
    return {
      code: this.code.value,
      url: this.url.value,
    };
  }
}

export class FeedEntity extends AggregateEntity {
  constructor(
    private _uuid: Uuid,
    private _title: Title,
    private _body: StringVO,
    private _location: StringVO,
    private _authors: AuthorsCollection,
    private _source: Source,
    private _date: DateVO,
  ) {
    super();
  }

  get uuid(): Uuid {
    return this._uuid;
  }

  get title(): Title {
    return this._title;
  }

  get body(): StringVO {
    return this._body;
  }

  get location(): StringVO {
    return this._location;
  }

  get authors(): AuthorsCollection {
    return this._authors;
  }

  get source(): Source {
    return this._source;
  }

  get date(): DateVO {
    return this._date;
  }

  private static base(dto: TFeedDto): FeedEntity {
    const source = Source.create(dto.source.code, dto.source.url);

    const { uuid, title, body, location, authors, date } = dto;

    return new FeedEntity(
      new Uuid(uuid),
      new Title(title),
      new StringVO(body),
      new StringVO(location),
      AuthorsCollection.fromStrings(authors),
      source,
      new DateVO(date),
    );
  }

  static create(uuid: TUuid, dto: TFeedCreate): FeedEntity {
    const source = Source.fromLocal(uuid);

    return this.base({ uuid, ...dto, source: source.toPrimitive() });
  }

  static createFromSource(uuid: TUuid, dto: TFeedCreateFromSource): FeedEntity {
    return this.base({ uuid, ...dto });
  }

  static fromDto(dto: TFeedDto): FeedEntity {
    return this.base(dto);
  }

  update({ title, body, location, authors, date }: TFeedCreate): void {
    this._title = new Title(title);
    this._body = new StringVO(body);
    this._authors = AuthorsCollection.fromStrings(authors);
    this._location = new StringVO(location);
    this._date = new DateVO(date);
  }

  toPrimitive(): TFeedDto {
    return {
      uuid: this.uuid.value,
      title: this.title.value,
      body: this.body.value,
      source: this.source.toPrimitive(),
      date: this.date.value,
      location: this.location.value,
      authors: this.authors.toPrimitive(),
    };
  }
}
