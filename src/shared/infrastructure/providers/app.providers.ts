import { PaginatorService } from '../services/paginator.service';
import { UuidGenerator } from '../services/uuid.service';

export const uuidGenerator = new UuidGenerator();

export const paginatorService = new PaginatorService();
