import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './categoria.schema';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriasService.create(categoria);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Categoria> {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriasService.update(id, categoria);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Categoria> {
    return this.categoriasService.remove(id);
  }
}
