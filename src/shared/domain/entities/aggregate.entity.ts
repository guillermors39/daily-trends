import { IDomainEvent } from '../types';

export abstract class AggregateEntity {
  private readonly events: IDomainEvent[] = [];

  protected record(event: IDomainEvent): void {
    this.events.push(event);
  }

  public pullEvents(): IDomainEvent[] {
    return this.events;
  }
}
