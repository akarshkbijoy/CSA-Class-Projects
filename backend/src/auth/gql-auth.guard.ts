import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    
    // Support extracting token from cookies if available
    if (req.cookies && req.cookies.token) {
      req.headers.authorization = `Bearer ${req.cookies.token}`;
    }
    
    return req;
  }
}
