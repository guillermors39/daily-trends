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

class Source implements TSource {
  constructor(
    public readonly _code: SourceCode,
    public readonly _url: StringVO,
  ) {}

  get code(): ESourceCode {
    return this._code.value;
  }

  get url(): string {
    return this._url.value;
  }

  static fromLocal(uuid: string): Source {
    return new Source(SourceCode.local(), new StringVO(`/feeds/${uuid}`));
  }

  static create(code: ESourceCode, url: string): Source {
    return new Source(new SourceCode(code), new StringVO(url));
  }
}

export class FeedEntity extends AggregateEntity implements TFeedDto {
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

  get uuid(): TUuid {
    return this._uuid.value;
  }

  get title(): string {
    return this._title.value;
  }

  get body(): string {
    return this._body.value;
  }

  get location(): string {
    return this._location.value;
  }

  get authors(): string[] {
    return this._authors.toPrimitive();
  }

  get source(): Source {
    return this._source;
  }

  get date(): Date {
    return this._date.value;
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

    return this.base({ uuid, ...dto, source });
  }

  static createFromSource(uuid: TUuid, dto: TFeedCreateFromSource): FeedEntity {
    return this.base({ uuid, ...dto });
  }

  static fromDto(dto: TFeedDto): FeedEntity {
    return this.base(dto);
  }

  update({ title, body, location, authors }: TFeedCreate): void {
    this._title = new Title(title);
    this._body = new StringVO(body);
    this._authors = AuthorsCollection.fromStrings(authors);
    this._location = new StringVO(location);
  }
}
