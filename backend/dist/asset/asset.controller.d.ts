import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
export declare class AssetController {
    private readonly assetService;
    constructor(assetService: AssetService);
    create(createAssetDto: CreateAssetDto): Promise<{
        asset_name: any;
        stock_quantity: any;
        category: any;
    } & import("./entities/asset.entity").Asset>;
    findAll(): Promise<import("./entities/asset.entity").Asset[]>;
    findOne(id: string): Promise<import("./entities/asset.entity").Asset | null>;
    update(id: string, updateAssetDto: UpdateAssetDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
