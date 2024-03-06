import { IUuidGenerator } from '../../../shared/domain/contracts/app.contract';
import { IFeedScraping, IScrapingServiceFactory } from '../../domain/contracts';
import { ESourceCode } from '../../domain/enums';
import { ElMundoScrapingService } from './scraping/elmundo.service';
import { ElPaisScrapingService } from './scraping/elpais.service';

type TFactoryMap = Partial<Record<ESourceCode, () => IFeedScraping>> & {
  default: () => IFeedScraping;
};

export class ScrapingServiceFactory implements IScrapingServiceFactory {
  constructor(private readonly uuidGenerator: IUuidGenerator) {}

  create(sourceCode: ESourceCode, url: string): IFeedScraping {
    const map: TFactoryMap = {
      [ESourceCode.elMundo]: () =>
        new ElMundoScrapingService(url, this.uuidGenerator),
      [ESourceCode.elPais]: () =>
        new ElPaisScrapingService(url, this.uuidGenerator),
      default: () => ({
        execute: async () => [],
      }),
    };

    const exec = map[sourceCode];

    return !!exec ? exec() : map.default();
  }
}
