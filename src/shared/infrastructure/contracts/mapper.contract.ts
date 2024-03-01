import { HydratedDocument } from 'mongoose';

export interface IMapper<Entity, ModelDto> {
  fromEntityToInfraDto(entity: Entity): ModelDto;
  fromInfraToDto(model: HydratedDocument<ModelDto>): ModelDto;
}
