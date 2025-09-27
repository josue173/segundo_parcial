import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductoDto {
  @IsString()
  pr_nombre: string;

  @IsNumber()
  pr_precio: number;

  @IsString()
  @IsOptional()
  pr_localidad: string;
}
