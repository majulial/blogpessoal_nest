import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Tema } from "../../../tema/entities/tema.entity";
import { ApiProperty } from "@nestjs/swagger";

// criando tabela diretamente no banco de dados.

@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagens
export class Postagem{
    @PrimaryGeneratedColumn() 
    @ApiProperty()//PRIMARY KEY (id) AUTO INCREMENT 
    id: number;


    @Transform(({ value }: TransformFnParams) => value?.trim()) // função para remover espaços em branco no inicio e fim 
    @IsNotEmpty() // FORÇA DIGITAÇÃO

    /* VALIDANDO DADOS */

    @Column({length: 100, nullable: false})
    @ApiProperty() // VARCHAR(100) NOT NULL
    titulo: string;


     @Transform(({ value }: TransformFnParams) => value?.trim()) // função para remover espaços em branco no inicio e fim 
    @IsNotEmpty() // FORÇA DIGITAÇÃO

    @Column({length: 1000, nullable: false}) // VARCHAR(1000) NOT NULL
    texto: string;


    @UpdateDateColumn()
    @ApiProperty() // ATT A DATA NA CRIAÇÃO E NA ATUALIZAÇÃO
    data: Date;

    @ApiProperty()
    @ManyToOne( () => Tema, (tema) => tema.postagem,{
        onDelete: 'CASCADE'
    })
    tema: Tema;  // REPRESENTA A CHAVE ESTRANGEIRA

    @ManyToOne( () => Usuario, (usuario) => usuario.postagem,{
        onDelete:'CASCADE'
    })
    usuario: Usuario;

}

