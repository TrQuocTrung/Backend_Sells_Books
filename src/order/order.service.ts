import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderItemsDto, UpdateOrderStatusDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose, { Types } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: SoftDeleteModel<OrderDocument>
  ) { }

  // Tính tổng tiền cho một đơn hàng
  calculateTotalPrice(orderItems: OrderItem[]) {
    return orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
  async create(createOrderDto: CreateOrderDto, user: IUser) {
    // Validate: chắc chắn có ít nhất một item
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    // Tính tổng tiền
    const totalAmount = this.calculateTotalPrice(createOrderDto.items);

    // Tạo order mới
    const newOrder = new this.orderModel({
      user: user._id,
      items: createOrderDto.items.map(item => ({
        book: new Types.ObjectId(item.book), // đảm bảo đúng ObjectId
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      status: 'pending', // trạng thái mặc định
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return await newOrder.save();
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.orderModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.orderModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("not found Order")
    }

    return await this.orderModel.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found order`;

    const foundUser = await this.orderModel.findById(id);
    if (!foundUser) {
      throw new NotFoundException("Không tìm thấy order");
    }

    await this.orderModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    return this.orderModel.softDelete({
      _id: id
    })
  }
  async findOrdersByUser(userId: string) {
    return this.orderModel.find({ user: userId })
      .populate('items.book') // nếu bạn muốn hiện thông tin sách
      .exec();
  }
  // Update toàn bộ items (dành cho user khi status = pending, admin bất kể trạng thái)
  async updateItems(orderId: string, dto: UpdateOrderItemsDto, user: IUser) {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    const isOwner = order.user.toString() === user._id.toString();
    const isAdmin = user.role.name === 'SUPER_ADMIN';

    if (!isAdmin && (!isOwner || order.status !== 'pending')) {
      throw new ForbiddenException('Bạn không có quyền sửa đơn hàng này');
    }

    const items = dto.items.map(item => ({
      book: new mongoose.Types.ObjectId(item.book),
      quantity: item.quantity,
      price: item.price,
    }));
    order.items = items;
    order.totalAmount = this.calculateTotalPrice(dto.items);
    order.updatedBy = { _id: new Types.ObjectId(user._id), email: user.email };

    return order.save();
  }

  // Update status (dành cho user khi status = pending, admin bất kể trạng thái)
  async updateStatus(orderId: string, dto: UpdateOrderStatusDto, user: IUser) {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    const isOwner = order.user.toString() === user._id.toString();
    const isAdmin = user.role.name === 'SUPER_ADMIN';

    if (!isAdmin && (!isOwner || order.status !== 'pending')) {
      throw new ForbiddenException('Bạn không có quyền sửa trạng thái đơn hàng này');
    }

    order.status = dto.status;
    order.updatedBy = { _id: new Types.ObjectId(user._id), email: user.email };

    return order.save();
  }

}
