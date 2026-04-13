import { HttpStatus } from "@nestjs/common";

export class ResponseModel<T = any> {
  code: number;
  message: string;
  data?: T;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data ?? undefined;
  }

  static success<T>(data?: T) {
    return new ResponseModel(HttpStatus.OK, 'success', data);
  }

  static error(code: number, message: string) {
    return new ResponseModel(code, message, null);
  }
}