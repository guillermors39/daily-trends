import { IUuidGenerator } from '../../../src/shared/domain/contracts/app.contract';
import { UuidGenerator } from '../../../src/shared/infrastructure/services/uuid.service';

describe('UuidGenerator Test', () => {
  let generator: IUuidGenerator;

  beforeEach(() => {
    generator = new UuidGenerator();
  });

  it('should return valid uuid v4', () => {
    const uuid = generator.execute();

    const parts = uuid.split('-');

    expect(typeof uuid === 'string').toBe(true);

    expect(uuid.length).toBe(36);

    expect(parts.length).toBe(5);
  });
});
