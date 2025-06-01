import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permission/schemas/permission.schema';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sampleData';

@Injectable()
export class DatabasesService {
    private readonly logger = new Logger(DatabasesService.name);
    constructor(
        @InjectModel(User.name)
        private userModel: SoftDeleteModel<UserDocument>,

        @InjectModel(Permission.name)
        private permissionModel: SoftDeleteModel<PermissionDocument>,

        @InjectModel(Role.name)
        private roleModel: SoftDeleteModel<RoleDocument>,

        private configService: ConfigService,
        private userService: UsersService) { }
    async onModuleInit() {
        const isInit = this.configService.get<string>("SHOULD_INIT");
        if (isInit && Boolean(isInit)) {

            const countUser = await this.userModel.count({});
            const countPermission = await this.permissionModel.count({});
            const countRole = await this.roleModel.count({});

            //create permissions
            if (countPermission === 0) {
                await this.permissionModel.insertMany(INIT_PERMISSIONS);
                //bulk create
            }
            // create role
            if (countRole === 0) {
                const permissions = await this.permissionModel.find({}).select("_id");
                const permissions_user = await this.permissionModel.find({ "module": "ORDER" })
                await this.roleModel.insertMany([
                    {
                        name: ADMIN_ROLE,
                        description: "Admin thì full quyền :v",
                        isActive: true,
                        permissions: permissions
                    },
                    {
                        name: USER_ROLE,
                        description: "Người dùng/Ứng viên sử dụng hệ thống",
                        isActive: true,
                        permissions: permissions_user
                    }
                ]);
            }

            if (countUser === 0) {
                const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
                const userRole = await this.roleModel.findOne({ name: USER_ROLE });
                const initPassword = this.configService.get<string>("INIT_PASSWORD")!;
                const hashedPassword = this.userService.getHashPassword(initPassword);
                await this.userModel.insertMany([
                    {
                        name: "I'm admin",
                        email: "admin@gmail.com",
                        password: hashedPassword,
                        age: 69,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole?._id
                    },
                    {
                        name: "I'm Trung Tran",
                        email: "trungtran147722@gmail.com",
                        password: hashedPassword,
                        age: 96,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole?._id
                    },
                    {
                        name: "I'm normal user",
                        email: "user@gmail.com",
                        password: hashedPassword,
                        age: 69,
                        gender: "MALE",
                        address: "VietNam",
                        role: userRole?._id
                    },
                ])
            }

            if (countUser > 0 && countRole > 0 && countPermission > 0) {
                this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
            }
        }
    }
}
