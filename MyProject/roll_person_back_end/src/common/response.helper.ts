export class ResponseHelper<T> {
  constructor(
    public code: number,
    public data: T,
    public message: string,
  ) {}

  static success<T>(data: T, message: string = '成功'): ResponseHelper<T> {
    return new ResponseHelper<T>(200, data, message);
  }

  static error<T>(data: T, message: string = '') {
    return new ResponseHelper<T>(500, data, message);
  }
}
