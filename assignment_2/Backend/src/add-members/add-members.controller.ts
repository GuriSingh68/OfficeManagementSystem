import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, ValidationPipe } from '@nestjs/common';
import { AddMembersDto } from 'src/user/dto/members.dto/addMembers.dto';
import { AddMembersService } from './add-members.service';
import { AddMembersResponseDto } from 'src/user/dto/members.dto/addMembersResponse.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Member } from './schema/addMember.schema';


@ApiTags("Members")
@Controller('add-members')
export class AddMembersController {
    constructor(private readonly addMembersService: AddMembersService) { }
    @Get()
    @ApiOperation({ summary: 'Get all members' })
    @ApiResponse({ status: 200, description: 'Retrieve all members.' })
    async findAll() {
        const allUser = await this.addMembersService.findAll();
        return allUser;
    }
    @Get('empId/:empId')
    @ApiOperation({ summary: 'Fetch members using employee id' })
    @ApiParam({ name: 'empId', required: true, description: 'Employee ID' })
    @ApiResponse({ status: 200, description: 'Retrieve a member by Employee ID.' })
    @ApiResponse({ status: 404, description: 'Member not found.' })
    async findOneByEmpId(@Param('empId') empId: string): Promise<Member> {
        return this.addMembersService.findOneByEmpId(empId);
    }
    @Post()
    @ApiOperation({ summary: 'Creating a member' })
    @ApiBody({ type: AddMembersDto })
    @ApiResponse({ status: 201, description: "Members added Successfully" })
    create(@Body() user: AddMembersDto) {
        const newMember = this.addMembersService.create(user);
        return newMember
    }
    @Patch('empId/:empId')
    @ApiOperation({ summary: 'Updating a member' })
    @ApiParam({ name: 'empId', required: true, description: 'Employee ID' })
    @ApiBody({ type: AddMembersDto })
    @ApiResponse({ status: 200, description: 'Member updated Successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async update(@Param('empId') empId: string, @Body() user: AddMembersDto) {
        const updatedUser = await this.addMembersService.update(empId, user);
        return `User Updated Successfully - ${updatedUser.empId}`;
    }

    @Delete('empId/:empId')
    @ApiOperation({ summary: 'Deleting a member' })
    @ApiParam({ name: 'empId', required: true, description: 'Employee ID' })
    @ApiResponse({ status: 204, description: 'Member deleted successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @HttpCode(HttpStatus.NO_CONTENT) 
    async deleteByEmpId(@Param('empId') empId: string) {
        const member = await this.addMembersService.deleteByEmpId(empId);
        if (!member) 
            throw new NotFoundException('User not found');
          return `User Deleted Successfully - ${member.name}` ;
    }
}
