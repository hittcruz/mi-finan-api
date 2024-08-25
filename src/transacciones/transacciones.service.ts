import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaccion, TransaccionDocument } from './transaccion.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransaccionesService {
  constructor(
    @InjectModel(Transaccion.name) private transactionModel: Model<TransaccionDocument>
  ) {}

  async create(transaction: Transaccion): Promise<Transaccion> {
    const newTransaction = new this.transactionModel(transaction);
    return newTransaction.save();
  }

  async findAll(): Promise<Transaccion[]> {
    // Populamos las referencias a usuario y categoría
    return this.transactionModel
      .find()
      .populate('usuario', 'nombre email') // Solo populamos los campos necesarios de usuario
      .populate('categoria', 'nombre tipo') // Solo populamos los campos necesarios de categoría
      .exec();
  }

  async findOne(id: string): Promise<Transaccion> {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('usuario', 'nombre email')
      .populate('categoria', 'nombre tipo')
      .exec();

    if (!transaction) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }

    return transaction;
  }

  async update(id: string, transaction: Transaccion): Promise<Transaccion> {
    const updatedTransaction = await this.transactionModel
      .findByIdAndUpdate(id, transaction, { new: true })
      .populate('usuario', 'nombre email')
      .populate('categoria', 'nombre tipo')
      .exec();

    if (!updatedTransaction) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }

    return updatedTransaction;
  }

  async delete(id: string): Promise<Transaccion> {
    const deletedTransaction = await this.transactionModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedTransaction) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }

    return deletedTransaction;
  }
}
