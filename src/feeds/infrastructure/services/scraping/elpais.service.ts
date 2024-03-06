import { Page } from 'puppeteer';

import { IUuidGenerator } from '../../../../shared/domain/contracts/app.contract';
import { ESourceCode } from '../../../domain/enums';
import { TFeedCreateFromSource } from '../../../domain/types';
import { FeedScrapingService, TScriptFunc } from '../feed-scraping.service';

export class ElPaisScrapingService extends FeedScrapingService {
  constructor(url: string, uuidGenerator: IUuidGenerator) {
    super(ESourceCode.elPais, url, uuidGenerator);
  }

  protected async before(page: Page): Promise<void> {
    try {
      await page.waitForSelector('#pmConsentWall', { timeout: 5000 });

      await page.click('.pmConsentWall-button');
    } catch (error) {}
  }

  protected script(): TScriptFunc {
    /* istanbul ignore next */
    return (date, code, limit): TFeedCreateFromSource[] => {
      const section = document.querySelector(
        'section[data-dtm-region="portada_apertura"]',
      );

      if (!section) return [];

      let feedArticles = Array.from(section.children).reduce(
        (carry: Element[], child) => {
          if (child.getAttribute('data-dtm-region') !== 'portada_opinion') {
            const articles = child.querySelectorAll('article');

            carry.push(...articles);
          }

          return carry;
        },
        [],
      );

      if (feedArticles.length > limit) {
        feedArticles = feedArticles.slice(0, limit);
      }

      return feedArticles.map((article): TFeedCreateFromSource => {
        const titleLink = article.querySelector<HTMLAnchorElement>(
          'header h2 a',
        ) as HTMLAnchorElement;

        const url = titleLink.href;
        const title = titleLink.innerText;

        const body =
          article.querySelector<HTMLElement>('div p')?.innerText ?? '';

        const subline = article.querySelector('.c_a');

        const authors = !!subline
          ? Array.from(subline.querySelectorAll('a')).map((a) => a.innerHTML)
          : [];

        const location = !!subline
          ? subline.querySelector<HTMLElement>('span.c_a_l')?.innerText ?? ''
          : '';

        return {
          date,
          title,
          body,
          authors,
          location,
          source: {
            url,
            code,
          },
        };
      });
    };
  }
}
