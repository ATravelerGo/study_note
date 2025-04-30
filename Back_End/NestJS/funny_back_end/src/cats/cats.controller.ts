import {
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  createCat() {
    return 'Create Cat';
  }

  @Get()
  @Header('Authorization', 'xxxx')
  @HttpCode(200)
  getHello() {
    return 'Hello Cats';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
}
