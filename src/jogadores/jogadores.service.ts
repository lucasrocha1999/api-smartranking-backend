import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { uuid } from 'uuidv4';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadores.find(
      jogador => jogador.email === email,
    );

    if (jogadorEncontrado) {
      return await this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(
      jogador => jogador.email === email,
    );

    if (!jogadorEncontrado) {
      throw new NotFoundException(`jogador com e-mail ${email} não encontrado`);
    }

    return jogadorEncontrado;
  }

  async deletarJogador(email): Promise<void> {
    const jogadorEncontrado = await this.jogadores.find(
      jogador => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      jogador => jogador.email !== jogadorEncontrado.email,
    );
  }

  private criar(criaJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criaJogadorDto;

    const jogador: Jogador = {
      _id: uuid(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criaJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criaJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
