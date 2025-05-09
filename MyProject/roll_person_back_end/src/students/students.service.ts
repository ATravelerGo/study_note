import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  @InjectRepository(Student)
  private studentsRepository: Repository<Student>;

  async create(createStudentDto: CreateStudentDto) {
    const student = this.studentsRepository.create(createStudentDto); // 创建实体
    return await this.studentsRepository.save(student); // 保存实体（插入或更新） save 会根据主键判断是否是新数据，若是新数据则插入，若是已有数据则更新。
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
