import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/services/postagem.module';
import { TemaModule } from '../tema/tema.module';
import { Tema } from '../tema/entities/tema.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';



@Module({
  imports: [

    ConfigModule.forRoot(),
TypeOrmModule.forRootAsync({
	useClass: ProdService,
    imports: [ConfigModule],
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'jujuba',
    //   database: 'db_blogpessoal',
    //   entities:[Postagem, Tema, Usuario],
    //   synchronize: true,
      //logging: true, // EXIBE O CODIGO SQL NO CONSOLE DO VSCODE // USAR APENAS EM DESENVOLVIMENTO
    }),
    PostagemModule,
    TemaModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
