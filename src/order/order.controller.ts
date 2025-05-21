import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateOrderItemsDto, UpdateOrderStatusDto } from './dto/update-order.dto';
import { IUser } from 'src/users/user.interface';
import { ResponseMessage, User } from 'src/decotator/customize';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @User() user: IUser) {
    return this.orderService.create(createOrderDto, user);
  }

  @Get()
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.orderService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.orderService.remove(id, user);
  }
  // User và admin đều có quyền cập nhật items nếu hợp lệ
  // Người dùng không thể chỉnh sửa items nếu đơn hàng đã được xác nhận (confirmed)
  @Patch(':id/items')
  updateItems(
    @Param('id') id: string,
    @Body() dto: UpdateOrderItemsDto,
    @User() user: IUser,
  ) {
    return this.orderService.updateItems(id, dto, user);
  }

  // User và admin đều có quyền cập nhật trạng thái nếu hợp lệ
  // Người dùng không thể thay đổi trạng thái nếu đơn hàng đã được xác nhận (confirmed)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
    @User() user: IUser,
  ) {
    return this.orderService.updateStatus(id, dto, user);
  }

  // Lấy danh sách đơn hàng của người dùng hiện tại
  @Get('my-orders')
  async getMyOrders(@User() user: IUser) {
    return await this.orderService.findOrdersByUser(user._id);
  }
}
