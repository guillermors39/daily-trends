import { faker } from '@faker-js/faker';

import { TFeedCreate } from '../../../../src/feeds/domain/types';

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

  private static authors(): string[] {
    return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.person.fullName(),
    );
  }
}
