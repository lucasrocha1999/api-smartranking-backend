import {
  Controller,
  Body,
  Query,
  Post,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { jogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email', jogadoresValidacaoParametrosPipe) email: string,
  ): Promise<Jogador | Jogador[]> {
    if (email) {
      return this.jogadoresService.consultarJogadorPeloEmail(email);
    } else {
      return this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deletarJogador(
    @Query('email', jogadoresValidacaoParametrosPipe) email: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }
}
