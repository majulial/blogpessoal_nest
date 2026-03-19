import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { JwtAuthGuard } from "../../src/auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags('Tema')
@Controller("/temas")
@ApiBearerAuth()
export class TemaController{

    constructor(
        private readonly temaService: TemaService
    ){}

     @Get()
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<Tema[]> {
        return this.temaService.findAll();
    
        }

     @Get('/:id')
    @HttpCode(HttpStatus.OK) // identificar status de consulta se tiver ok ou não 

    // @Param decorador para converter a variével para numero inteiro
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema>{
        return this.temaService.findById(id);
    }


     @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK) // identificar status de consulta se tiver ok ou não 

    // @Param decorador para converter a variével para numero inteiro
    findAllByDescricao(@Param('descricao') descricao: string): Promise<Tema[]>{
        return this.temaService.findAllByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.create(tema);
    }

    @Put()
     @HttpCode(HttpStatus.OK)
    update(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.update(tema);
    }

     @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT)
        delete(@Param('id', ParseIntPipe) id: number) {
        return this.temaService.delete(id);
        
        }

    

}

