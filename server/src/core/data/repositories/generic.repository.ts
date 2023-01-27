export interface IGenericRepository<T, R> {
  find(): Promise<R[]>;
  create(options: T): Promise<R>;
  findOne(filter: Partial<R>): Promise<T | undefined>;
  delete(id: string): Promise<any>;
}
