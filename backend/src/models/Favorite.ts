import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import User from './User'
import Party from './Party'
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator'

@Entity('favorites')
class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "boolean" })
  @IsBoolean({ message: 'Preencha o campo favorito como verdadeiro ou falso.' })
  isFavorited: boolean;

  @ManyToOne(() => User, user => user.favorites)
  @JoinColumn({ name: 'user_id' })
  @IsNotEmpty({ message: 'ID de usuário obrigatório.' })
  @IsUUID()
  user: User;


  @ManyToOne(() => Party, party => party.favorites)
  @JoinColumn({ name: 'party_id' })
  @IsNotEmpty({ message: 'ID de festa obrigatória.' })
  @IsUUID()
  party: Party;
}

export default Favorite;