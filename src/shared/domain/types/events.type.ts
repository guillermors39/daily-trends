export interface IDomainEvent<T = unknown> {
  key: () => symbol | string;
  payload: () => T;
}
