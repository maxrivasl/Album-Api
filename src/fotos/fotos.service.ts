import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, In, Repository } from 'typeorm';
import { Foto } from './entities/foto.entity.js';
import { Etiqueta } from './entities/etiqueta.entity.js';
import { CreateFotoDto } from './dto/create-foto.dto.js';
import { UpdateFotoDto } from './dto/update-foto.dto.js';

export interface FiltroFotos {
  min: number; max: number; q?: string | undefined; page: number; 
  limit: number; etiqueta?: string | undefined; orden?: string | undefined;
}

@Injectable()
export class FotosService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotosRepo: Repository<Foto>,
    @InjectRepository(Etiqueta)
    private readonly etiquetasRepo: Repository<Etiqueta>,
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

  async create({ albumId, etiquetas, ...datos }: CreateFotoDto) {
    const foto = this.fotosRepo.create({
    ...datos,
    album: albumId ? { id: albumId } : null,
    etiquetas: await this.buscarOCrearEtiquetas(etiquetas),
    });
    const guardada = await this.fotosRepo.save(foto);
    return this.findOne(guardada.id);
    }

  private async buscarOCrearEtiquetas(textos: string[] = []) {
    const limpios = [...new Set(textos.map((t) => t.trim().toLowerCase()))];
    const existentes = await this.etiquetasRepo.findBy({ texto: In(limpios) });
    const nuevas = limpios
      .filter((t) => !existentes.some((e) => e.texto === t))
      .map((texto) => this.etiquetasRepo.create({ texto }));
    return [...existentes, ...(await this.etiquetasRepo.save(nuevas))];
  }

  async update(id: number, { albumId, etiquetas, ...datos }: UpdateFotoDto) {
    const foto = await this.findOne(id); // 404 si no existe
    Object.assign(foto, datos);
    if (albumId !== undefined) foto.album = { id: albumId } as Foto['album'];
    if (etiquetas) foto.etiquetas = await this.buscarOCrearEtiquetas(etiquetas);
    await this.fotosRepo.save(foto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const foto = await this.findOne(id);
    await this.fotosRepo.remove(foto);
  }
} 