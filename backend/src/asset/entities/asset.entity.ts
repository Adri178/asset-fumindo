import { Check, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('asset')
@Check('"stock_quantity" >= 0')
@Check('length(trim("asset_name")) > 0')
export class Asset {
    @PrimaryGeneratedColumn()
    asset_id!: number;

    @Column({ length:100 })
    asset_name!: string;

    @Column({ type: 'int' })
    stock_quantity!: number;

    @Column({ 
        type: 'enum',
        enum: ['Consumable', 'Non-Consumable'],
    })
    category!: string;
}
