import { FeedCannotModifyExternal } from '../../../../src/feeds/domain/exceptions';
import { FeedDeleteValidator } from '../../../../src/feeds/domain/services/delete.validator';
import { FeedEntityMother } from '../mothers/entity.mother';

describe('FeedDeleteValidator Test', () => {
  const validator = new FeedDeleteValidator();

  it('should return undefined', () => {
    const entity = FeedEntityMother.createFromLocal();

    expect(validator.validate(entity)).toBeUndefined();
  });

  it('should throw cannot modify external sources', () => {
    const entity = FeedEntityMother.createFromExternal();

    expect(() => validator.validate(entity)).toThrow(FeedCannotModifyExternal);
  });
});
