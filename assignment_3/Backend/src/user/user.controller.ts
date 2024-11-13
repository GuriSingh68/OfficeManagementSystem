import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateUserDto } from './dto/userDto/updateUser.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved users' })
    async getUsers() {
        return this.userService.findAll();
    }


    @Get('email/:email')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get user by email' })
    @ApiParam({ name: 'email', description: 'Email address of the user to retrieve' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved the user by email' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUserByEmail(@Param('email') email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new Error('User not found'); // Handle user not found case
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
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
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
