import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/product.entity';
import { CartProduct } from './cartProduct/cartProduct.entity';
import { User } from 'src/users/user.entity';

@Table({
  tableName: 'Carts',
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
})
export class Cart extends Model<Cart> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({ field: 'userId', type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Product, () => CartProduct)
  products: Product[];
}
