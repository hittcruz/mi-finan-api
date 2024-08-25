import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Categoria } from 'src/categorias/categoria.schema';
import { Usuario } from 'src/usuarios/usuario.schema';

export type TransaccionDocument = Transaccion & Document;

@Schema()
export class Transaccion {
  @Prop({ type: Types.ObjectId, ref: Usuario.name, required: true })  // Referencia a Usuario
  usuario: Usuario;

  @Prop({ required: true })
  tipo: string; // "income" or "expense"

  @Prop({ required: true })
  monto: number;

  @Prop({ type: Types.ObjectId, ref: Categoria.name, required: true })
  categoria: Categoria;

  @Prop({ required: true })
  fecha: Date;

  @Prop()
  descripcion: string;
}

export const TransaccionSchema = SchemaFactory.createForClass(Transaccion);
