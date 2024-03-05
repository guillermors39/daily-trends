import { Page } from 'puppeteer';

import { ESourceCode } from '../../../domain/enums';
import { TFeedCreateFromSource } from '../../../domain/types';
import { FeedScrappingService, TScriptFunc } from '../feed-scrapping.service';

export class ElMundoScrappingService extends FeedScrappingService {
  protected source(): ESourceCode {
    return ESourceCode.elMundo;
  }

  protected url(): string {
    return 'https://www.elmundo.es/';
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
    return (date: Date, code: ESourceCode): TFeedCreateFromSource[] => {
      const baseClass = '.ue-c-cover-content__byline';

      const main = document.querySelector('div[data-b-type="headlines_a"]');

      if (!main) return [];

      const feedArticles = Array.from(main.querySelectorAll('article'));

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
