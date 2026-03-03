import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// criando tabela diretamente no banco de dados.

@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagens
export class Postagem{
    @PrimaryGeneratedColumn() //PRIMARY KEY (id) AUTO INCREMENT 
    id: number;


    @Transform(({ value }: TransformFnParams) => value?.trim()) // função para remover espaços em branco no inicio e fim 
    @IsNotEmpty() // FORÇA DIGITAÇÃO

    /* VALIDANDO DADOS */

    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo: string;


     @Transform(({ value }: TransformFnParams) => value?.trim()) // função para remover espaços em branco no inicio e fim 
    @IsNotEmpty() // FORÇA DIGITAÇÃO

    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    texto: string;


    @UpdateDateColumn() // ATT A DATA NA CRIAÇÃO E NA ATUALIZAÇÃO
    data: Date;

}