import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const returnData = {};
    returnData[`${data}`] = request.cookies[data];
    return returnData;
  },
);
