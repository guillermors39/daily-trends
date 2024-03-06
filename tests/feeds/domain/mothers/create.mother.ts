import { faker } from '@faker-js/faker';

import { ESourceCode } from '../../../../src/feeds/domain/enums';
import {
  TFeedCreate,
  TFeedCreateFromSource,
  TSource,
} from '../../../../src/feeds/domain/types';

export type TFeedCreateFromSourcePartial = Partial<TFeedCreate> & {
  source?: Partial<TSource>;
};
export class FeedCreateMother {
  static create(dto: Partial<TFeedCreate> = {}): TFeedCreate {
    const {
      title = faker.lorem.words({ min: 3, max: 10 }),
      body = faker.lorem.paragraphs({ min: 1, max: 3 }),
      authors = this.authors(),
      location = faker.location.city(),
      date = faker.date.recent(),
    } = dto;

    return {
      title,
      body,
      authors,
      location,
      date,
    };
  }

  static createFromSource(
    dto: TFeedCreateFromSourcePartial = {},
  ): TFeedCreateFromSource {
    const {
      source: {
        code = faker.helpers.arrayElement(Object.values(ESourceCode)),
        url = faker.internet.url(),
      } = {},
    } = dto;

    return {
      ...this.create(dto),
      source: {
        code,
        url,
      },
    };
  }

  private static authors(): string[] {
    return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.person.fullName(),
    );
  }
}
