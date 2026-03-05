
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class TemaService{


    constructor (
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ){}

    async findAll(): Promise<Tema[]>{

        return this.temaRepository.find();
    }


    async findById(id: number): Promise<Tema>{
        // SELEÇÃO DE TABELA 
                    // await = espera a usuario digitar
        const tema = await this.temaRepository.findOne({
            where: {
                id
            }
    })

    if (!tema)
        throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
    return tema;

    }

    async findAllByDescricao(descricao: string): Promise<Tema[]>{
        return this.temaRepository.find({
            where:{ // USANDO ILIKE PARA IGNORAR MAIUS E MIUS - LIKE LEVA EM CONSIDERAÇÃO AS SUAS OPÇÕES
                descricao: ILike (`%${descricao}%`)
            }
        })
    }


    async create(tema: Tema): Promise<Tema>{
        // INSERINDO VALORES NA TABELA 
        return await this.temaRepository.save(tema);
    }

     async update(tema: Tema): Promise<Tema>{
        if (!tema.id || tema.id <= 0)
            throw new HttpException("Id inválido ou não encontrado!", HttpStatus.BAD_REQUEST);

        //CHAMANDO METODO PARA VERIFICAR SE ID EXISTE
        await this.findById(tema.id);

        // ATT VALORES NA TABELA 
        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise <DeleteResult>{
        await this.findById(id);

        //SE EXISTIR DELETE tb_temas FROM id = ?;
        return this.temaRepository.delete(id);
    }
}