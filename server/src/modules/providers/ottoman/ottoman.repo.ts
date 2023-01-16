import { IGenericRepository } from '@core/data/repositories/generic.repository';
import { IDocument, ModelTypes, Ottoman } from 'ottoman';

export type Document<T> = IDocument<T> & T & { id: string };

export class OttomanGenericRepository<T extends EntitiesAll>
  implements IGenericRepository<T, Document<T>>
{
  constructor(
    private _dao: ModelTypes<T, Document<T>>,
    private connection: Ottoman,
  ) {}
  delete(id: string): Promise<any> {
    return this._dao.removeById(id);
  }
  getAll() {
    return this._dao.find();
  }
  create(options: Exclude<T, 'id'>): Promise<Document<T>> {
    return this._dao.create(options) as Promise<Document<T>>;
  }
  findOne(filter: Partial<T>) {
    return this._dao.findOne(filter);
  }
}
