import { TPaginationSearch } from '../../../shared/domain/contracts/app.contract';
import { PaginatedDto } from '../../../shared/domain/dtos/paginated.dto';
import { TUuid } from '../../../shared/domain/types';
import {
  IMapper,
  IPaginatorService,
} from '../../../shared/infrastructure/contracts';
import {
  IFeedCreateRepository,
  IFeedDeleteRepository,
  IFeedFindRepository,
  IFeedSearchRepository,
  IFeedUpdateRepository,
} from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedDto } from '../../domain/types';
import { IFeedModel } from '../models';

type IFeedRepository = IFeedCreateRepository &
  IFeedFindRepository &
  IFeedUpdateRepository &
  IFeedDeleteRepository &
  IFeedSearchRepository;

export class FeedRepository implements IFeedRepository {
  constructor(
    private readonly model: IFeedModel,
    private readonly mapper: IMapper<FeedEntity, TFeedDto>,
    private readonly paginator: IPaginatorService,
  ) {}

  async create(...feed: FeedEntity[]): Promise<void> {
    const dto = this.mapper.fromEntityToDto(feed);

    await this.model.create(dto);
  }

  async find(uuid: TUuid): Promise<FeedEntity | null> {
    const model = await this.model.findOne({ uuid });

    if (!model) return null;

    const dto = this.mapper.fromInfraToDto(model);

    return FeedEntity.fromDto(dto);
  }

  async update(feed: FeedEntity): Promise<void> {
    const { uuid, ...dto } = this.mapper.fromEntityToDto(feed);

    const { title, body, location, authors } = dto;

    await this.model.updateOne(
      { uuid },
      {
        title,
        body,
        location,
        authors,
      },
    );
  }

  async delete(uuid: TUuid): Promise<void> {
    await this.model.deleteOne({ uuid });
  }

  async search(params: TPaginationSearch): Promise<PaginatedDto<FeedEntity>> {
    const paginated = await this.paginator.paginate(this.model, params);

    const mapped = this.mapper
      .fromInfraToDto(paginated.items)
      .map((item) => FeedEntity.fromDto(item));

    return new PaginatedDto(mapped, paginated.pagination);
  }
}
