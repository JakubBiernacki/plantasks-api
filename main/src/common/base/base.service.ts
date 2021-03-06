import { Document, Model } from 'mongoose';
import { IBaseService } from './base-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseService<T> implements IBaseService<T> {
  protected constructor(private genericModel: Model<T & Document>) {}

  async findAll({ limit, offset }) {
    return this.genericModel.find().limit(limit).skip(offset);
  }

  async findOne(id) {
    return this.genericModel.findById(id);
  }
  async update(id, dto) {
    return this.genericModel.findByIdAndUpdate(id, dto, { new: true });
  }
  async create(dto) {
    return this.genericModel.create(dto);
  }
  async remove(id) {
    return this.genericModel.findByIdAndRemove(id);
  }
}
