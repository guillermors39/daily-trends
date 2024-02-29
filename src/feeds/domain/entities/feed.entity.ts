import { AggregateEntity } from '../../../shared/domain/entities';

export class Source {
  constructor(
    public readonly code: string,
    public readonly url: string,
  ) {}
}

export class FeedEntity extends AggregateEntity {
  constructor(
    public readonly uuid: string,
    public readonly title: string,
    public readonly subtitle: string,
    public readonly body: string,
    public readonly location: string,
    public readonly authors: string[],
    public readonly source: Source,
  ) {
    super();
  }
}
