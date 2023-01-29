import { IGenericRepository } from '@core/data/repositories/generic.repository';
import { IDocument, ModelTypes } from 'ottoman';

export type Document<T> = IDocument<T> & T & { id: string };

export class OttomanGenericRepository<T> implements IGenericRepository<T, Document<T>> {
  constructor(private _model: ModelTypes<T, Document<T>>) {}

  async find(filter: any, args?: any) {
    const result = await this._model.find(filter, args);
    return result.rows;
  }
  findOne(filter: any, args?: any): Promise<any> {
    return this._model.findOne(filter, args);
  }
  findById(id: string, args?: any) {
    return this._model.findById(id, args);
  }
  create(options: Exclude<T, 'id'>): Promise<Document<T>> {
    return this._model.create(options) as Promise<Document<T>>;
  }
  update(id: string, options: T): Promise<Document<T>> {
    return this._model.updateById(id, options);
  }
  delete(id: string): Promise<any> {
    return this._model.removeById(id);
  }
}
