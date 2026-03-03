import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";


@Injectable()
export class PostagemService {

    constructor (
        @InjectRepository(Postagem)
        private postagemRepository: Repository <Postagem>,
    ){}

    async findAll(): Promise<Postagem[]>{

        //SELECT * FROM tb_postagens
        return this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem>{
        // SELECT * FROM tb_postagens WHERE id = o que o usuario digitar;
        const postagem = await this.postagemRepository.findOne({
            where:{
                id
            }
         })

         if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

         return postagem;

}

        async findAllByTitulo(titulo: string): Promise<Postagem[]>{

            // SELECT * FROM tb_postagens   WHERE titulo LIKE '%?%';
            return this.postagemRepository.find({ // Usando ILike para ignorar letras maiúsculas e minúsculas
                where:{
                    titulo: ILike(`%${titulo}%`)
                }
            })
         }

         async create(postagem: Postagem): Promise<Postagem>{
            // INSERT INTO tb_postagens (titulo, texto) VALUES (valores digitados pelo usuario);
            return await this.postagemRepository.save(postagem);
}        

    async update(postagem: Postagem): Promise<Postagem>{

            if (!postagem.id || postagem.id <= 0)
                throw new HttpException("Id inválido!", HttpStatus.BAD_REQUEST);
            await this.findById(postagem.id);
            // UPDATE tb_postagens SET titulo = o que digitar, texto = ?, data = CURRENT_TIMESTAMP() WHERE id = que colocar;
            return this.postagemRepository.save(postagem);
}  


    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id);
        // DELETE tb_postagens FROM id = ?;
        return this.postagemRepository.delete(id);
    }


}