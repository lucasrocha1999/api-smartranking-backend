import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    // const jogadorEncontrado = await this.jogadores.find(
    //   jogador => jogador.email === email,
    // );
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      await this.atualizar(criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
    // return await this.jogadores;
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    // const jogadorEncontrado = await this.jogadores.find(
    //   jogador => jogador.email === email,
    // );

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`jogador com e-mail ${email} não encontrado`);
    }

    return jogadorEncontrado;
  }

  async deletarJogador(email): Promise<any> {
    return await this.jogadorModel.remove({ email }).exec();

    // const jogadorEncontrado = await this.jogadores.find(
    //   jogador => jogador.email === email,
    // );
    // this.jogadores = this.jogadores.filter(
    //   jogador => jogador.email !== jogadorEncontrado.email,
    // );
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);

    return await jogadorCriado.save();

    // const { nome, telefoneCelular, email } = criaJogadorDto;

    // const jogador: Jogador = {
    //   _id: uuid(),
    //   nome,
    //   telefoneCelular,
    //   email,
    //   ranking: 'A',
    //   posicaoRanking: 1,
    //   urlFotoJogador: 'www.google.com.br/foto123.jpg',
    // };
    // this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
    // this.jogadores.push(jogador);
  }

  private async atualizar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criaJogadorDto.email },
        { $set: criaJogadorDto },
      )
      .exec();

    // const { nome } = criaJogadorDto;
    // jogadorEncontrado.nome = nome;
  }
}
