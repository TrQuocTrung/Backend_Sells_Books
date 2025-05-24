import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderItemsDto, UpdateOrderStatusDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import mongoose, { Types } from 'mongoose';
import aqp from 'api-query-params';
import { Book, BookDocument } from 'src/books/schemas/book.schema';
import { User } from 'src/decotator/customize';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: SoftDeleteModel<OrderDocument>,
    @InjectModel(Book.name)
    private bookModel: SoftDeleteModel<BookDocument>,
  ) { }

  // Tính tổng tiền cho một đơn hàng
  calculateTotalPrice(orderItems: OrderItem[]) {
    return orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
  async create(createOrderDto: CreateOrderDto, user: IUser) {
    // Kiểm tra items không rỗng (giữ nguyên mã gốc)
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    // SỬA: Thêm kiểm tra user._id hợp lệ
    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      throw new BadRequestException('Invalid user ID');
    }

    // SỬA: Bỏ calculateTotalPrice, tính totalAmount trong vòng lặp vì price lấy từ Book
    let totalAmount = 0;
    const orderItems: { book: Types.ObjectId; quantity: number; price: number }[] = []; // SỬA: Tạo mảng orderItems để lưu items với price từ Book
    for (const item of createOrderDto.items) {
      // SỬA: Thêm kiểm tra book ID hợp lệ
      if (!mongoose.Types.ObjectId.isValid(item.book)) {
        throw new BadRequestException(`Invalid book ID: ${item.book}`);
      }

      // SỬA: Lấy book từ bookModel để lấy price và kiểm tra stock
      const book = await this.bookModel.findById(item.book);
      if (!book) {
        throw new NotFoundException(`Book ${item.book} not found`);
      }

      // SỬA: Kiểm tra stock đủ
      if (book.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${book.name}`);
      }

      // SỬA: Lấy price từ book thay vì item.price
      const price = book.price;
      if (!price || price <= 0) {
        throw new BadRequestException(`Invalid price for ${book.name}`);
      }

      // SỬA: Tính totalAmount trong vòng lặp
      totalAmount += price * item.quantity;

      // SỬA: Tạo object OrderItem với price từ book
      orderItems.push({
        book: new Types.ObjectId(item.book),
        quantity: item.quantity,
        price,
      });

      // SỬA: Cập nhật stock của book
      book.stock -= item.quantity;
      await book.save();
    }

    // SỬA: Sử dụng orderItems đã tạo thay vì map trực tiếp từ createOrderDto.items
    const newOrder = new this.orderModel({
      user: user._id,
      items: orderItems, // Sử dụng mảng đã xử lý
      totalAmount, // Sử dụng totalAmount đã tính
      status: 'pending',
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return (await newOrder.save()).populate('user', '_id email');
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
      throw new BadRequestException("ID không hợp lệ");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Không tìm thấy order");
    }

    return await this.orderModel.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("ID không hợp lệ");
    }
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
    // SỬA: Kiểm tra userId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('User ID không hợp lệ');
    }

    // SỬA: Sửa cú pháp find từ { user } thành { user: userId }
    return this.orderModel
      .find({ user: userId, isDeleted: false }) // Thêm isDeleted: false cho soft delete
      .populate('items.book', 'name price') // Chỉ lấy name và price
      .sort({ createdAt: -1 }) // Sắp xếp mới nhất trước
      .exec();
  }
  // Update toàn bộ items (dành cho user khi status = pending, admin bất kể trạng thái)
  async updateItems(orderId: string, dto: UpdateOrderItemsDto, user: IUser) {

    // Kiểm tra orderId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new BadRequestException('Invalid order ID');
    }

    // Tìm order
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    // Kiểm tra quyền
    const isOwner = order.user.toString() === user._id.toString();
    const isAdmin = user.role.name === 'SUPER_ADMIN';
    if (!isAdmin && (!isOwner || order.status !== 'pending')) {
      throw new ForbiddenException('Bạn không có quyền sửa đơn hàng này');
    }

    // Kiểm tra items không rỗng
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Items array cannot be empty');
    }

    // SỬA: Chỉ sử dụng một mảng orderItems, bỏ mảng items rỗng
    const orderItems: { book: Types.ObjectId; quantity: number; price: number }[] = [];
    let totalAmount = 0;
    for (const item of dto.items) {
      if (!mongoose.Types.ObjectId.isValid(item.book)) {
        throw new BadRequestException(`Invalid book ID: ${item.book}`);
      }
      const book = await this.bookModel.findById(item.book);
      if (!book) {
        throw new NotFoundException(`Book ${item.book} not found`);
      }
      if (book.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for book ${book.name}. Available: ${book.stock}, Requested: ${item.quantity}`,
        );
      }
      const price = book.price;
      if (!price || price <= 0) {
        throw new BadRequestException(`Invalid price for book ${book.name}`);
      }
      totalAmount += price * item.quantity;
      orderItems.push({
        book: new Types.ObjectId(item.book),
        quantity: item.quantity,
        price, // Lấy từ book.price
      });
      book.stock -= item.quantity;
      await book.save();
    }

    // SỬA: Gán orderItems vào order.items
    order.items = orderItems;
    order.totalAmount = totalAmount;
    order.updatedBy = { _id: new Types.ObjectId(user._id), email: user.email };

    return (await order.save()).populate('user', '_id email');
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
