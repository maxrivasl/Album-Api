import { Column, CreateDateColumn, Entity, JoinTable , ManyToMany , ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Album } from '../../albumes/entities/album.entity.js';
import { Etiqueta } from './etiqueta.entity.js';

@Entity('fotos')
export class Foto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string | null;

    @Column({ type: 'text', nullable: true })
    fotografo: string | null;

    @Column({ type: 'real', default: 0 })
    calificacion: number;

    @Column()
    ruta: string;  // URL de la imagen

    @CreateDateColumn()
    creadoEn: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    // N:1 Muchas fotos pertenecen a un álbum 
    @ManyToOne (() => Album, (album) => album.fotos, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    album: Album | null;

    // N:M Una foto tiene muchas etiquetas y viceversa
    @ManyToMany (() => Etiqueta, (etiqueta) => etiqueta.fotos)
    @JoinTable({
        name: 'fotos_etiquetas',
        joinColumn: { name: 'foto_id' },
        inverseJoinColumn: { name: 'etiqueta_id' },
    })
    etiquetas: Etiqueta[];
}