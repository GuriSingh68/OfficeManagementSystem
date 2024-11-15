import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { SignUpDto } from 'src/auth/dto/signup.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    @UseGuards(AuthGuard,RoleGuard)
    @Roles('admin','manager')
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved users' })
    async getUsers() {
        const userList=await this.userService.findAll();
        if(userList.length==0){
            return {
                message:"List is empty"
            }
        }
        return userList;
    }


    @Get('email/:email')
    @UseGuards(AuthGuard,RoleGuard)
    @Roles('admin','manager')
    @ApiOperation({ summary: 'Get user by email' })
    @ApiParam({ name: 'email', description: 'Email address of the user to retrieve' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved the user by email' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUserByEmail(@Param('email') email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return {
                message:"User not found"
            }
        }
        return user;
    }

    @Patch(':id')
    @Roles('admin')
    @UseGuards(AuthGuard,RoleGuard)
    @ApiOperation({ summary: 'Update user details' })
    @ApiParam({ name: 'id', description: 'ID of the user to update' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateUser(@Param('id') id: string, @Body() updateUserDto: SignUpDto) {
        const user = await this.userService.update(id, updateUserDto);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return { message: 'User updated successfully' };
    }
    @Delete(':id')
    @Roles('admin')
    @UseGuards(AuthGuard,RoleGuard)
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({ name: 'id', description: 'ID of the user to delete' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async deleteUser(@Param('id') id: string) {
        const user = await this.userService.remove(id);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return { message: 'User deleted successfully' };
    }
}
