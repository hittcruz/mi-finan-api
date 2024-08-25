import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchema } from './categoria.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Categoria.name, schema: CategoriaSchema }])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
