import { FeedEntity } from '../../../../src/feeds/domain/entities';
import { UuidBuilder } from '../../../shared/domain/builders/uuid.builder';
import { FeedCreateMother } from '../mothers/create.mother';

describe('FeedEntity Test', () => {
  it('create method should be local source', () => {
    const dto = FeedCreateMother.create();

    const uuid = UuidBuilder.random();

    const entity = FeedEntity.create(uuid, dto);

    expect(entity).toBeInstanceOf(FeedEntity);

    expect(entity.date.value).toBeInstanceOf(Date);

    expect(entity.source.code.isLocal()).toBe(true);
  });

  it('from dto', () => {
    const dto = FeedCreateMother.createFromSource();

    const uuid = UuidBuilder.random();

    const entity = FeedEntity.fromDto({ uuid, ...dto });

    expect(entity).toBeInstanceOf(FeedEntity);

    expect(entity.uuid.value).toBe(uuid);

    expect(entity.source.code.value).toBe(dto.source.code);
  });
});
