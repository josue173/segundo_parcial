import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "./entities/pagination.dto";
import { Producto } from "./entities/producto.entity";
import { Repository } from "typeorm";
import { UpdateProductoDto } from "./dto/update-producto.dto";

@Injectable()
export class ProductosService {
  private readonly logger = new Logger("CategoriesService");

  constructor(
    @InjectRepository(Producto)
    private readonly _productoRepository: Repository<Producto>
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const producto: Producto =
        this._productoRepository.create(createProductoDto);
      await this._productoRepository.save(producto);
      return producto;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this._productoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(pr_id: string) {
    const producto: Producto = await this._productoRepository.findOneBy({
      pr_producto_id: pr_id,
    });
    if (!producto)
      throw new NotFoundException(`Producto con el ID: ${pr_id} no encontrado`);
    return producto;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }

  private handleExceptions(error: any) {
    if (error.code === "ER_DUP_ENTRY")
      throw new BadRequestException(error.sqlMessage);
    this.logger.error(error);
    throw new InternalServerErrorException("Unexpected error");
  }
}
