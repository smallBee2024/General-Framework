import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core';

import { AuthStrategy } from '../auth.constant';
import { IS_PUBLIC_KEY } from '~/common/decorators/public.decorator';

@Injectable()
export class JwtGuard extends AuthGuard(AuthStrategy.JWT) {

  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('isPublic', isPublic);

    if (isPublic) {
      return true;
    }

    /**
     * super.canActivate(context) 的作用是：调用 @nestjs/passport 里已经实现好的 JWT 认证流程，包括：
     * 1. 从请求中提取 token（通常是 Bearer）
     * 2. 调用对应 JwtStrategy
     * 3. 验证签名、过期时间等
     * 4. 验证通过后把结果挂到 request.user
     * 5. 最后返回 true（通过）或抛异常（401）
     */
    return super.canActivate(context);
  }
}