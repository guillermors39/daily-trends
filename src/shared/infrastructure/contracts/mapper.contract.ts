import { HydratedDocument } from 'mongoose';

export interface IMapper<Entity, ModelDto> {
  fromEntityToDto(entity: Entity): ModelDto;
  fromEntityToDto(entity: Entity[]): ModelDto[];
  fromEntityToDto(entity: Entity | Entity[]): ModelDto | ModelDto[];

  fromInfraToDto(model: HydratedDocument<ModelDto>): ModelDto;
  fromInfraToDto(model: HydratedDocument<ModelDto>[]): ModelDto[];
  fromInfraToDto(
    model: HydratedDocument<ModelDto> | HydratedDocument<ModelDto>[],
  ): ModelDto | ModelDto[];
}
