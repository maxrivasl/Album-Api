import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Foto } from './entities/foto.entity.js';

export interface FiltroFotos {
  min: number; max: number; q?: string | undefined; page: number; 
  limit: number; etiqueta?: string | undefined; orden?: string | undefined;
}

@Injectable()
export class FotosService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotosRepo: Repository<Foto>,
  ) {}

  async findAll({ min, max, q, page, limit, etiqueta, orden }: FiltroFotos) {
    const [data, total] = await this.fotosRepo.findAndCount({
      where: {
        calificacion: Between(min, max),
        ...(q && { titulo: ILike(`%${q}%`) }),
        ...(etiqueta && { etiquetas: { texto: etiqueta } }),
      },
      relations: { album: true, etiquetas: true },
      order: orden === 'asc' ? { calificacion: 'ASC', id: 'ASC' }
        : orden === 'desc' ? { calificacion: 'DESC', id: 'ASC' }
        : { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<Foto> {
    const foto = await this.fotosRepo.findOne({ 
      where: { id },
      relations: { album: true, etiquetas: true },
    });
    if (!foto) throw new NotFoundException(`Foto ${id} no encontrada`);
    return foto;
  }

  create(datos: Partial<Foto>): Promise<Foto> {
    const foto = this.fotosRepo.create(datos);
    return this.fotosRepo.save(foto);
  }

  async update(id: number, datos: Partial<Omit<Foto, 'id'>>): Promise<Foto> {
    const foto = await this.findOne(id);
    if (datos.titulo !== undefined) {
      foto.titulo = datos.titulo;
    }
    if (datos.calificacion !== undefined) {
      foto.calificacion = datos.calificacion;
    }
    return this.fotosRepo.save(foto);
  }

  async remove(id: number): Promise<void> {
    const foto = await this.findOne(id);
    await this.fotosRepo.remove(foto);
  }
} 