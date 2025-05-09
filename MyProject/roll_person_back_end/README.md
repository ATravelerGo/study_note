# 跟数据库建立联系

1. pnpm install --save @nestjs/typeorm typeorm mysql2
2. 将 TypeOrmModule 导入到根 AppModule 中。
    ```ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    
    @Module({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [],
          synchronize: true,
        }),
      ],
    })
    export class AppModule {}
    ```
3. 完成后，TypeORM DataSource 和 EntityManager 对象将可用于在整个项目中注入（无需导入任何模块）
   ```ts
   import { DataSource } from 'typeorm';
   
   @Module({
     imports: [TypeOrmModule.forRoot(), UsersModule],
   })
   export class AppModule {
     constructor(private dataSource: DataSource) {}  //这里
   }
   ```
4. 完整app.module.ts
   ```ts
   import { Module } from '@nestjs/common';
   import { AppController } from './app.controller';
   import { AppService } from './app.service';
   import { StudentsModule } from './students/students.module';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { DataSource } from 'typeorm';
   
   const sqlModule = TypeOrmModule.forRoot({
   type: 'mysql',
   host: '47.116.160.25',
   port: 3306,
   username: 'root',
   logging: true,
   logger: 'advanced-console',
   password: '200927',
   database: 'student_information_management',
   synchronize: true, //生产环境设置false 自动同步会修改表结构
   autoLoadEntities: true, //这个和下面的哪个二选一就可以
   // entities: [path.join(__dirname, './**/*.entity{.ts,.js}')],
   extra: {  //类似于“共享单车” vs “每次造新车”。
   connectionLimit: 10, // 连接池大小
   connectTimeout: 10000, // 连接超时（毫秒）
   },
   });
   
   @Module({
   imports: [StudentsModule, sqlModule],
   controllers: [AppController],
   providers: [AppService],
   })
   export class AppModule {
   constructor(private dataSource: DataSource) {}
   }


   ```

5. 在我们的entities中写实体内容
   ```ts
   import {
     Entity,
     PrimaryGeneratedColumn,
     Column,
     CreateDateColumn,
     UpdateDateColumn,
   } from 'typeorm';
   
   @Entity('students') // students是数据库中的表名
   export class Student {
     @PrimaryGeneratedColumn('uuid')
     id: number;
   
     @Column()
     name: string;
   
     @Column()
     gender: string;
   
     @Column()
     birthday: Date;
   
     @Column()
     address: string;
   
     @Column()
     guardian: string;
   
     @Column()
     guardianPhone: string;
   
     @CreateDateColumn({ type: 'datetime' })
     created_at: Date;
   
     @UpdateDateColumn({ type: 'datetime' })
     updated_at: Date;
   }
   
   ```

> @Entity('students'): 这个装饰器将类 Student 与数据库中的 students 表关联。
> @PrimaryGeneratedColumn(): 这个装饰器表示 id 字段是表的主键，并且是自增的。
> @Column(): 用于定义表中的列。可以通过传递配置来定义列的属性。
> unique: true 表示该字段是唯一的，类似于数据库表中的 UNIQUE 约束。
> type: 'timestamp' 在 CreateDateColumn 和 UpdateDateColumn 中指定时间戳类型。
> @CreateDateColumn(): 自动记录创建时间。
> @UpdateDateColumn(): 自动记录更新时间。

6. 在students.module.ts中配置imports  
   该模块使用 forFeature() 方法来定义在当前作用域内注册了哪些存储库。有了它，我们可以使用 *** @InjectRepository() *** 装饰器将
   UsersRepository 注入到 UsersService 中：
   ```ts
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
   
   ```
7. 开发students.service.ts
   ```ts
   import { Injectable } from '@nestjs/common';
   import { CreateStudentDto } from './dto/create-student.dto';
   import { UpdateStudentDto } from './dto/update-student.dto';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Student } from './entities/student.entity';
   import { Repository } from 'typeorm';
   
   @Injectable()
   export class StudentsService {
   
     @InjectRepository(Student)
     private studentsRepository : Repository<Student>
   
     async create(createStudentDto: CreateStudentDto) {
       const student = this.studentsRepository.create(createStudentDto);  // 创建实体
       await this.studentsRepository.save(student);  // 保存实体（插入或更新） save 会根据主键判断是否是新数据，若是新数据则插入，若是已有数据则更新。
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
   
   ```

# 项目构建方面

1. 使用dotenv

> npm install dotenv
> 然后在app.module.ts中 一定要放在这个文件！！ import * as dotenv from 'dotenv'
> dotenv.config(); // 加载 .env 文件 然后在配置我们的mysql



***save方法返回的是类实例，不是一个单纯的对象***
