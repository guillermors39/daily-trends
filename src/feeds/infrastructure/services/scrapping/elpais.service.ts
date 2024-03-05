import { Page } from 'puppeteer';

import { ESourceCode } from '../../../domain/enums';
import { TFeedCreateFromSource } from '../../../domain/types';
import { FeedScrappingService } from '../feed-scrapping.service';

export class ElPaisScrappingService extends FeedScrappingService {
  protected source(): ESourceCode {
    return ESourceCode.elPais;
  }

  protected url(): string {
    return 'https://elpais.com/';
  }

  protected async feeds(page: Page): Promise<TFeedCreateFromSource[]> {
    await page.waitForSelector('#pmConsentWall', { timeout: 10000 });

    await page.click('.pmConsentWall-button');

    /* istanbul ignore next */
    const feeds = await page.evaluate((): TFeedCreateFromSource[] => {
      const section = document.querySelector(
        'section[data-dtm-region="portada_apertura"]',
      );

      if (!section) {
        return [];
      }

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

      const date = new Date();

      return feedArticles.map((article): TFeedCreateFromSource => {
        const titleLink = article.querySelector<HTMLElement>(
          'header h2 a',
        ) as HTMLElement;
        const url = titleLink.getAttribute('href') as string;
        const title = titleLink.innerText;

        const body =
          article.querySelector<HTMLElement>('div p')?.innerText ?? '';

        const authors: string[] = [];

        const location = '';

        return {
          date,
          title,
          subtitle: '',
          body,
          authors,
          location,
          source: {
            url,
            code: ESourceCode.elPais,
          },
        };
      });
    });

    return feeds;
  }
}
