import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { Transaccion } from './transaccion.schema';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transactionsService: TransaccionesService) {}

  @Post()
  async create(@Body() transaction: Transaccion) {
    try {
      return await this.transactionsService.create(transaction);
    } catch (error) {
      throw new NotFoundException('Usuario o Categoría no encontrados');
    }
  }

  @Get()
  async findAll() {
    return await this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionsService.findOne(id);
    if (!transaction) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }
    return transaction;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() transaction: Transaccion) {
    const updatedTransaction = await this.transactionsService.update(id, transaction);
    if (!updatedTransaction) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }
    return updatedTransaction;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedTransaction = await this.transactionsService.delete(id);
    if (!deletedTransaction) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada`);
    }
    return deletedTransaction;
  }
}
