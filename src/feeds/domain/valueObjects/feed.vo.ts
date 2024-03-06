import { ValidationException } from '../../../shared/domain/exceptions';
import { StringVO } from '../../../shared/domain/valueObjects/base.vo';
import { ESourceCode } from '../enums';

export class Title extends StringVO {
  public static readonly min: number = 3;

  constructor(value: string) {
    super(value);

    this._validate(value);
  }

  private _validate(value: string) {
    if (value.length < Title.min) {
      throw new ValidationException(
        `Title must be at least ${Title.min} characters`,
      );
    }
  }
}

export class Author extends StringVO {}

export class AuthorsCollection extends Array<Author> {
  toPrimitive(): string[] {
    return this.map((item) => item.value);
  }

  static fromStrings(values: string[]): AuthorsCollection {
    const authors = values.map((item) => new Author(item));

    return new AuthorsCollection(...authors);
  }
}

export class SourceCode extends StringVO<ESourceCode> {
  public static readonly availables = Object.values(ESourceCode);

  constructor(value: ESourceCode) {
    super(value);

    this._validate(value);
  }

  private _validate(value: unknown) {
    if (!SourceCode.availables.includes(value as ESourceCode)) {
      throw new ValidationException(`Invalid source code «${value}»`);
    }
  }

  static local(): SourceCode {
    return new SourceCode(ESourceCode.local);
  }

  isLocal(): boolean {
    return this._value === ESourceCode.local;
  }

  isElPais(): boolean {
    return this._value === ESourceCode.elPais;
  }

  isElMundo(): boolean {
    return this._value === ESourceCode.elMundo;
  }

  isExternal(): boolean {
    return !this.isLocal();
  }
}
