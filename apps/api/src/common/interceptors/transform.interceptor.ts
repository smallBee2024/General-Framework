import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { FastifyRequest } from 'fastify'
import qs from 'qs';

import { ResponseModel } from '../mode/response.mode';
import { BYPASS_KEY } from '../decorators/bypass.decorator';


/**
 * 响应拦截器
 * 用于处理响应数据
 * 可以用于处理响应数据，如添加响应头，添加响应体等
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseModel<T>> {
    // ==========================
    // 【阶段 1：控制器执行之前】
    // ==========================
    // 这里的代码会立即同步执行。
    // 此时请求刚到达拦截器，还没进控制器。

    // ✅功能1：获取是否需要跳过拦截器
    const bypass = this.reflector.get<boolean>(
      BYPASS_KEY,
      context.getHandler(), // 获取控制器方法的元数据
    )

    // 如果在这里直接 return 一个 Observable (例如 return of({error: 'blocked'}))
    // 而不调用 next.handle()，控制器将永远不会执行（短路）。
    // 调用 next.handle() 启动控制器逻辑
    // 它返回一个 Observable，代表控制器未来的执行结果（流）
    if (bypass)
      return next.handle()
    
    // ✅功能2：获取请求对象
    const http = context.switchToHttp()
    const request = http.getRequest<FastifyRequest>()
    // 处理 query 参数，将数组参数转换为数组,如：?a[]=1&a[]=2 => { a: [1, 2] }
    request.query = qs.parse(request.url.split('?').at(1))


    // ✅功能3：调用控制器逻辑
    const response$ = next.handle(); 
    // 【阶段 2：控制器执行之后】
    // ==========================
    // 这里的代码不会立即执行！
    // 它们被注册为 RxJS 的“操作符”，只有当控制器执行完毕并产生数据时，流才会流动到这里。
    return response$.pipe(
      map((data) => {
        console.log('data', data);
        return ResponseModel.success(data);
      }),
    );
  }
}
