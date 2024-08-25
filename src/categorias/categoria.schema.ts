import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriaDocument = Categoria & Document;

@Schema()
export class Categoria {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop({ required: true })
  tipo: string; // Ejemplo: 'ingreso' o 'gasto'
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);