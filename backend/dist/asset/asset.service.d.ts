import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
export declare class AssetService {
    private repo;
    constructor(repo: Repository<Asset>);
    create(data: any): Promise<{
        asset_name: any;
        stock_quantity: any;
        category: any;
    } & Asset>;
    findAll(): Promise<Asset[]>;
    findOne(id: number): Promise<Asset | null>;
    update(id: number, data: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
