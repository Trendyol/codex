export abstract class IStorageService {
  abstract upload: (fileName: string, sourcePath: string) => Promise<string>;
}
