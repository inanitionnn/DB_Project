import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Cart } from 'src/cart/cart.entity';
import { CartProduct } from 'src/cart/cartProduct/cartProduct.entity';

@Table({
  tableName: 'Products',
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
})
export class Product extends Model<Product> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Unique
  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING(255) })
  photo: string;

  @BelongsToMany(() => Cart, () => CartProduct)
  carts: Cart[];
}
