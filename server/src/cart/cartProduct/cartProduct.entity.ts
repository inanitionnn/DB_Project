import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from '../cart.entity';
import { Product } from 'src/products/product.entity';

@Table({
  tableName: 'CartProducts',
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
})
export class CartProduct extends Model<CartProduct> {
  @ForeignKey(() => Cart)
  @Column({ type: DataType.UUID })
  cartId: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  productId: string;

  @Column({ type: DataType.INTEGER })
  count: number;
}
