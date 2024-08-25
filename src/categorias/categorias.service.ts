import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria, CategoriaDocument } from './categoria.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name) private categoriaModel: Model<CategoriaDocument>
  ) {}

  async create(categoria: Categoria): Promise<Categoria> {
    const nuevaCategoria = new this.categoriaModel(categoria);
    return nuevaCategoria.save();
  }

  async findAll():Promise<Categoria[]> {
    return this.categoriaModel.find().exec();
  }

  async findOne(id:string): Promise<Categoria> {
    const categoria = await this.categoriaModel.findById(id).exec();
    if (!categoria) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrado`); 
    }
    return categoria;
  }

  async update(id: string, categoria: Categoria): Promise<Categoria> {
    const categoriaActualizado = await this.categoriaModel
    .findByIdAndUpdate(id, categoria, {new: true})
    .exec();

    if (!categoriaActualizado) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrado`)
    }

    return categoriaActualizado;
  }
  
  async remove(id: string): Promise<Categoria> {
    const categoriaEliminado = await this.categoriaModel.findByIdAndDelete(id).exec();
    if (!categoriaEliminado) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrado`);
    }
    return categoriaEliminado;
  }

}
