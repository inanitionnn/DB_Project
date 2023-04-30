import {
  Column,
  DataType,
  HasOne,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Cart } from 'src/cart/cart.entity';

@Table({
  tableName: 'Users',
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @Unique
  @IsEmail
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(72) })
  password: string;

  @HasOne(() => Cart)
  cart: Cart;
}
