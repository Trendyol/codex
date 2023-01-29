export interface IGenericRepository<T, R> {
  find(filter: any, args?: any): Promise<R[]>;
  findOne(filter: any, args?: any): Promise<R | undefined>;
  findById(id: string, args?: any): Promise<R | undefined>;
  create(options: T): Promise<R>;
  update(id: string, options: any): Promise<R>;
  delete(id: string): Promise<any>;
}
