import { HydratedDocument } from 'mongoose';

export interface IMapper<Entity, ModelDto> {
  fromEntityToDto(entity: Entity): ModelDto;

  fromInfraToDto(model: HydratedDocument<ModelDto>): ModelDto;
  fromInfraToDto(model: HydratedDocument<ModelDto>[]): ModelDto[];
  fromInfraToDto(
    model: HydratedDocument<ModelDto> | HydratedDocument<ModelDto>[],
  ): ModelDto | ModelDto[];
}
