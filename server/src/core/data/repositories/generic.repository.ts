export interface IGenericRepository<T extends EntitiesAll, R extends T> {
  getAll(): Promise<R[]>;
  create(options: Exclude<T, 'id'>): Promise<R>;
  findOne(filter: Partial<T>): Promise<R | undefined>;
  delete(id: string): Promise<any>;
}
