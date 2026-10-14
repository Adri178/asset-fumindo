import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private repo: Repository<Asset>,
  ){}

  create(data: any) {
    const { asset_name, stock_quantity, category } = data;
    return this.repo.save({ asset_name, stock_quantity, category });
  }

  findAll() {
    return this.repo.find({ order: { asset_id: 'DESC' }});
  }

  findOne(id: number) {
    return this.repo.findOneBy({ asset_id: id});
  }

  update(id: number, data: any) {
    const { asset_name, stock_quantity, category } = data;
    return this.repo.update(id, { asset_name, stock_quantity, category})
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}