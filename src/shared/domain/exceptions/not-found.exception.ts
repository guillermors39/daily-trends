export abstract class NotFoundException extends Error {
  constructor(id: string, entity: string = 'entity') {
    const message = `${entity} «${id}» not found`;
    super(message);
  }
}
