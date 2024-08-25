import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario, UsuarioDocument } from './usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>
  ) {}

  // Crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = new this.usuarioModel(createUsuarioDto);
    return nuevoUsuario.save();
  }

  // Obtener todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  // Obtener un usuario por ID
  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  // Actualizar un usuario por ID
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioActualizado = await this.usuarioModel
      .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
      .exec();

    if (!usuarioActualizado) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuarioActualizado;
  }

  // Eliminar un usuario por ID
  async remove(id: string): Promise<Usuario> {
    const usuarioEliminado = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!usuarioEliminado) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuarioEliminado;
  }
}
