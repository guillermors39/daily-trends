import { Page } from 'puppeteer';

import { IUuidGenerator } from '../../../../shared/domain/contracts/app.contract';
import { ESourceCode } from '../../../domain/enums';
import { TFeedCreateFromSource } from '../../../domain/types';
import { FeedScrapingService, TScriptFunc } from '../feed-scraping.service';

export class ElMundoScrapingService extends FeedScrapingService {
  constructor(url: string, uuidGenerator: IUuidGenerator) {
    super(ESourceCode.elMundo, url, uuidGenerator);
  }

  protected async before(page: Page): Promise<void> {
    try {
      await page.waitForSelector('#ue-accept-notice-button', {
        timeout: 3000,
      });

      await page.click('#ue-accept-notice-button');
    } catch (error) {}
  }

  protected script(): TScriptFunc {
    /* istanbul ignore next */
    return (date, code, limit): TFeedCreateFromSource[] => {
      const baseClass = '.ue-c-cover-content__byline';

      const main = document.querySelector('div[data-b-type="headlines_a"]');

      if (!main) return [];

      let feedArticles = Array.from(main.querySelectorAll('article'));

      if (feedArticles.length > limit) {
        feedArticles = feedArticles.slice(0, limit);
      }

      return feedArticles.map((article): TFeedCreateFromSource => {
        const titleLink = article.querySelector('a') as HTMLAnchorElement;

        const url = titleLink.href;

        const title = titleLink.innerText;

        const authorsNameSpan = Array.from(
          article.querySelectorAll<HTMLElement>(`${baseClass}-name`),
        );

        const authors = authorsNameSpan.map((item) => {
          const text = item.innerText.split('\n');

          return text.length > 1 ? text[1].trim() : text[0].trim();
        });

        const locationsSpan = Array.from(
          article.querySelectorAll<HTMLElement>(`${baseClass}-location`),
        );

        const locations = locationsSpan.map((item) => item.innerText.trim());

        return {
          title,
          subtitle: '',
          body: '',
          authors,
          location: locations[0],
          date,
          source: {
            code,
            url,
          },
        };
      });
    };
  }
}
