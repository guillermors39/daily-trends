import { TScrapingConfig } from '../../../shared/infrastructure/configs/config';
import {
  IFeedScraping,
  IScrapingServiceFactory,
  ITrendService,
} from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { ESourceCode } from '../../domain/enums';
import { TTrendsFilter } from '../../domain/types';

export class TrendsService implements ITrendService {
  constructor(
    private readonly factory: IScrapingServiceFactory,
    private readonly config: TScrapingConfig,
  ) {}

  private services(sources: ESourceCode[] = []): IFeedScraping[] {
    let entries = Object.entries(this.config.portals);

    if (sources.length > 0) {
      entries = entries.filter(([code]) =>
        sources.includes(code as ESourceCode),
      );
    }

    return entries.map(([code, url]) =>
      this.factory.create(code as ESourceCode, url),
    );
  }

  async execute(filters: TTrendsFilter): Promise<FeedEntity[]> {
    const { limit = this.config.limit, sources = [] } = filters;

    const promises = this.services(sources).map((service) =>
      service.execute(limit),
    );

    const results = await Promise.all(promises);

    const entities = results.flat();

    return entities;
  }
}
