import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { jogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', jogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    return await this.jogadoresService.atualizarJogador(
      _id,
      atualizarJogadorDto,
    );
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', jogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador | Jogador[]> {
    return this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', jogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }
}
