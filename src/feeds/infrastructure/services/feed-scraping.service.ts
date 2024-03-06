import { Page } from 'puppeteer';

import { IUuidGenerator } from '../../../shared/domain/contracts/app.contract';
import { WebScrapingService } from '../../../shared/infrastructure/services/web-scraping.service';
import { IFeedScraping } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { ESourceCode } from '../../domain/enums';
import { TFeedCreateFromSource } from '../../domain/types';

export type TScriptFunc = (
  date: Date,
  code: ESourceCode,
  limit: number,
) => TFeedCreateFromSource[];

export abstract class FeedScrapingService
  extends WebScrapingService
  implements IFeedScraping
{
  constructor(
    protected readonly code: ESourceCode,
    protected readonly url: string,
    private readonly uuidGenerator: IUuidGenerator,
  ) {
    super();
  }

  protected abstract script(): TScriptFunc;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async before(page: Page): Promise<void> {}

  async execute(limit: number = 5): Promise<FeedEntity[]> {
    try {
      const page = await this.navigateToPage(this.url);

      await this.before(page);

      const feeds = await page.evaluate(
        this.script(),
        new Date(),
        this.code,
        limit,
      );

      await this.close();

      return feeds.map((dto) =>
        FeedEntity.createFromSource(this.uuidGenerator.execute(), dto),
      );
    } catch (error) {
      return [];
    }
  }
}
