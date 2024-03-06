import { IValueObject } from '../contracts/app.contract';
import { ValidationException } from '../exceptions';
import { TUuid } from '../types';

export class StringVO<T extends string = string> implements IValueObject<T> {
  constructor(protected readonly _value: T) {
    this._defineValidate(this._value);
  }

  get value(): T {
    return this._value;
  }

  private _defineValidate(value: T): void {
    if (typeof value !== 'string') {
      throw new ValidationException('Must be string');
    }
  }
}

export class Uuid extends StringVO<TUuid> {
  constructor(value: TUuid) {
    super(value);

    this._validate(value);
  }

  get value(): TUuid {
    return this._value;
  }

  protected _validate(value: TUuid): void {
    const parts = value.split('-');

    if (value.length !== 36 || parts.length !== 5) {
      throw new ValidationException('Invalid UUID');
    }
  }
}

export class DateVO implements IValueObject<Date> {
  protected readonly _value: Date;

  constructor(value: Date | string | number) {
    this._validate(value);

    this._value = typeof value === 'object' ? value : new Date(value);
  }

  get value(): Date {
    return this._value;
  }

  private _validate(value: Date | string | number) {
    const date = new Date(value);

    if (Number.isNaN(date.getDate())) {
      throw new ValidationException('Invalid Date');
    }
  }
}
