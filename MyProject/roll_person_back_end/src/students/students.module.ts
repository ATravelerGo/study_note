import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Student } from './entities/student.entity';
@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports:[TypeOrmModule.forFeature([Student])],
})
export class StudentsModule {}
