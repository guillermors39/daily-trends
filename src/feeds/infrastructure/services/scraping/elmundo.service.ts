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

      const getAuthors = (authorsTexts: string[]): string[] => {
        return authorsTexts.reduce((carry: string[], item) => {
          let parts = item.split('\n');

          const text = parts.length > 1 ? parts[1].trim() : parts[0].trim();

          parts = text.split('|');

          if (parts.length > 1) {
            const authors = parts.map((author) => author.trim());

            carry.push(...authors);
          } else {
            carry.push(text);
          }

          return carry;
        }, []);
      };

      return feedArticles.map((article): TFeedCreateFromSource => {
        const titleLink = article.querySelector('a') as HTMLAnchorElement;

        const url = titleLink.href;

        const title = titleLink.innerText;

        const authorsText = Array.from(
          article.querySelectorAll<HTMLElement>(`${baseClass}-name`),
        ).map((item) => item.innerText);

        const authors = getAuthors(authorsText);

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
