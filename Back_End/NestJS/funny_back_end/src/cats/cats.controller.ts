import {
  Controller,
  Get,
  Post,
  // HttpCode,
  // Header,
  // Redirect,
  // Query,
  // Param,
  Body,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from '../interface/cats.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  createCat(@Body() cat: Cat) {
    this.catService.create(cat);
  }

  @Get()
  findAll(): Cat[] {
    return this.catService.findAll();
  }

  // @Get()
  // @Header('Authorization', 'xxxx')
  // @HttpCode(200)
  // getHello() {
  //   return 'Hello Cats';
  // }

  // @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)
  // getDocs(@Query('version') version) {
  //   if (version && version === '5') {
  //     return { url: 'https://docs.nestjs.com/v5/' };
  //   }
  // }

  // @Get(':id')
  // getOne(@Param('id') id: string) {
  //   return `This action returns a #${id} cat`;
  // }
}
