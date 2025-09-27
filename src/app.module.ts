import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProductosController } from "./productos/productos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductosModule } from "./productos/productos.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductosModule,
  ],
})
export class AppModule {}
