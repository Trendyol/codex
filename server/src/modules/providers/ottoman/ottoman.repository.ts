import { IGenericRepository } from '@core/data/repositories/generic.repository';
import { IDocument, ModelTypes } from 'ottoman';

export type Document<T> = IDocument<T> & T & { id: string };

export class OttomanGenericRepository<T>
  implements IGenericRepository<T, Document<T>>
{
  constructor(private _model: ModelTypes<T, Document<T>>) {}
  delete(id: string): Promise<any> {
    return this._model.removeById(id);
  }
  find() {
    return this._model.find();
  }
  findOne(filter: Partial<T>) {
    return this._model.findOne(filter);
  }
  create(options: Exclude<T, 'id'>): Promise<Document<T>> {
    return this._model.create(options) as Promise<Document<T>>;
  }
}
