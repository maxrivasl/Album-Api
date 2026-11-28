import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Foto } from '../../fotos/entities/foto.entity.js';

@Entity('albumes')
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column ({ length: 80, unique: true })
    nombre: string;

    // 1:N Un álbum tiene muchas fotos
    @OneToMany(() => Foto, (foto) => foto.album)
    fotos: Foto[];
}