import { Page } from 'puppeteer';

import { ESourceCode } from '../../../domain/enums';
import { TFeedCreateFromSource } from '../../../domain/types';
import { FeedScrappingService, TScriptFunc } from '../feed-scrapping.service';

export class ElPaisScrappingService extends FeedScrappingService {
  protected source(): ESourceCode {
    return ESourceCode.elPais;
  }

  protected url(): string {
    return 'https://elpais.com/';
  }

  protected async before(page: Page): Promise<void> {
    try {
      await page.waitForSelector('#pmConsentWall', { timeout: 5000 });

      await page.click('.pmConsentWall-button');
    } catch (error) {}
  }

  protected script(): TScriptFunc {
    /* istanbul ignore next */
    return (date, code): TFeedCreateFromSource[] => {
      const section = document.querySelector(
        'section[data-dtm-region="portada_apertura"]',
      );

      if (!section) return [];

      const feedArticles = Array.from(section.children).reduce(
        (carry: Element[], child) => {
          if (child.getAttribute('data-dtm-region') !== 'portada_opinion') {
            const articles = child.querySelectorAll('article');

            carry.push(...articles);
          }

          return carry;
        },
        [],
      );

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
          subtitle: '',
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
