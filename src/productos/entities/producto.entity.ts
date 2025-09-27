import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn("uuid")
  pr_producto_id: string;

  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  pr_nombre: string;

  @Column({
    type: "float",
  })
  pr_precio: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  pr_fecha_creacion: Date;

  @Column({
    type: "varchar",
    length: 50,
  })
  pr_localidad: string;
}
