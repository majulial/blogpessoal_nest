
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../src/postagem/entities/postagem.entity";

    
    
    @Entity({name: "tb_temas"})
    export class Tema {

        @PrimaryGeneratedColumn()
        id: number;

        @Transform(({ value }: TransformFnParams)=> value?.trim())
        @IsNotEmpty()
         @Column({length: 1000, nullable: false}) 
        descricao: string;

        @OneToMany(() => Postagem, (postagem) => postagem.tema)

        postagem: Postagem[]; // ARRAY DE RETORNO
    }