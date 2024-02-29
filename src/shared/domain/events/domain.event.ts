import { IDomainEvent } from '../types';

export abstract class DomainEvent<T = unknown> implements IDomainEvent<T> {
  abstract key(): symbol | string;
  abstract payload(): T;
}
