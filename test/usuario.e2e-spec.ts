import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type:'sqlite',
          database: ':memory:',
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,

        }),
        
        AppModule
      ], 
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it("01 - Deve cadastrar um novo usuário", async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com.br',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(201);

    usuarioId = resposta.body.id;
  })

    it("02 - Não deve cadastrar um novo usuário", async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com.br',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(400);

    usuarioId = resposta.body.id;
  })


  it("03 - Deve Autenticar o Usuário (Login)", async () => {
  const resposta = await request(app.getHttpServer())
    .post("/usuarios/logar")
    .send({

      usuario: 'root@root.com.br',
      senha: 'rootroot',
    })
    .expect(200)

  token = resposta.body.token;

})

it("04 - Deve Listar todos os Usuários", async () => {
  return await request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .expect(200)
})



it("05 - Deve Atualizar um Usuário", async () => {
  const resposta = await request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Root Atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })
    expect(resposta.status).toBe(200)
})



it("06 - Deve Buscar um usuário pelo id", async () => {
  const resposta = await request(app.getHttpServer())
    .get(`/usuarios/${usuarioId}`)
    .set("Authorization", `${token}`);

  expect(resposta.body.id).toBe(usuarioId);


});




});