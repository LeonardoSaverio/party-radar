import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPhoneNumber, IsUUID, Length, MaxLength } from 'class-validator';

import User from './User'
import Favorite from './Favorite'

@Entity('partys')
class Party {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, nullable: false })
  @IsPhoneNumber('BR', { message: 'Número de telefone inválido.' })
  whatsapp: string;

  @Column({ length: 2, nullable: false, type: 'char' })
  @Length(2, 2, { message: "UF inválida." })
  uf: string;

  @Column({ length: 60, nullable: false })
  @Length(2, 60, { message: 'Cidade Inválida.' })
  city: string;

  @Column({ length: 100, nullable: false })
  @Length(6, 100, { message: 'Nome de festa inválida número de caracteres ultrapassados ou insuficientes.' })
  party_name: string;

  @Column({ length: 100, nullable: false })
  @Length(4, 100, { message: 'Tipo festa inválida número de caracteres ultrapassados ou insuficientes.' })
  type_party: string;

  @Column({ length: 200 })
  @MaxLength(200, { message: 'Número de caracteres ultrapassado.' })
  description: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'Esse campo não pode ser vázio.' })
  date_time: string;

  @Column({ nullable: false, type: 'numeric' })
  @IsLatitude({ message: 'Latitude inválida.' })
  latitude: number;

  @Column({ nullable: false, type: 'numeric' })
  @IsLongitude({ message: 'Longitude inválida.' })
  longitude: number;

  @ManyToOne(() => User, user => user.partys, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'user_id' })
  @IsNotEmpty({ message: 'Campo id de usuário obrigatório' })
  @IsUUID()
  user: User;

  @OneToMany(() => Favorite, favorite => favorite.party)
  @JoinColumn({ name: 'party_id' })
  favorites: Favorite;

}

export default Party;