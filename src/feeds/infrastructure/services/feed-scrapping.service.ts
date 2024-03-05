import { Page } from 'puppeteer';

import { IUuidGenerator } from '../../../shared/domain/contracts/app.contract';
import { WebScrappingService } from '../../../shared/infrastructure/services/web-scraping.service';
import { FeedEntity } from '../../domain/entities';
import { ESourceCode } from '../../domain/enums';
import { TFeedCreateFromSource } from '../../domain/types';

export const dtoFactory = (
  date: Date,
  title: string,
  body: string,
  authors: string[],
  location: string,
  url: string,
  code: ESourceCode,
): TFeedCreateFromSource => ({
  title,
  subtitle: '',
  body,
  authors,
  location,
  date,
  source: {
    code,
    url,
  },
});

export type TSourceDtoFactory = typeof dtoFactory;

export abstract class FeedScrappingService extends WebScrappingService {
  constructor(private readonly uuidGenerator: IUuidGenerator) {
    super();
  }

  protected abstract source(): ESourceCode;

  protected abstract url(): string;

  protected abstract feeds(page: Page): Promise<TFeedCreateFromSource[]>;

  async execute(): Promise<FeedEntity[]> {
    const page = await this.navigateToPage(this.url());

    const feeds = await this.feeds(page);

    await this.close();

    return feeds.map((dto) =>
      FeedEntity.createFromSource(this.uuidGenerator.execute(), dto),
    );
  }
}
