import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, ValidationPipe } from '@nestjs/common';
import { AddMembersDto } from 'src/user/dto/members.dto/addMembers.dto';
import { AddMembersService } from './add-members.service';
import { AddMembersResponseDto } from 'src/user/dto/members.dto/addMembersResponse.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags("Members")
@Controller('add-members')
export class AddMembersController {
    constructor(private readonly addMembersService: AddMembersService) { }
    @Get()
    @ApiResponse({ status: 200, description: 'Retrieve all members.' })
    async findAll() {
        const allUser = await this.addMembersService.findAll();
        return allUser;
    }
    @Get(':id')
    @ApiParam({ name: 'id', required: true, description: 'Member ID' })
    @ApiResponse({ status: 200, description: 'Retrieve a member by ID.' })
    @ApiResponse({ status: 404, description: 'Member not found.' })
    findOneById(@Param('id') id: string){
        const mem=this.addMembersService.findOneById(id);
        if(!mem)
            throw new NotFoundException("Not Found")
        return mem;
    }
    @Post()
    @ApiBody({ type: AddMembersDto })
    @ApiResponse({ status: 201, description: "Added Members Successfully" })
    create(@Body() user: AddMembersDto) {
        const newMember = this.addMembersService.create(user);
        return newMember
    }
    @Patch(':id')
    @ApiParam({ name: 'id', required: true, description: 'Member ID' })
    @ApiBody({ type: AddMembersDto })
    @ApiResponse({ status: 200, description: 'Member updated Successfully.' })
   async update(@Param('id') id: string, @Body() user: AddMembersDto) {
        const updateUser=await this.addMembersService.update(id,user)
        return `User Updated Successfully - ${updateUser.id}`
    }

    @Delete(':id')
    @ApiParam({ name: 'id', required: true, description: 'Member ID' })
    @ApiResponse({ status: 204, description: 'Member deleted successfully.' })
    async delete(@Param('id') id: string){
        const member=await  this.addMembersService.delete(id);
        return `User Deleted Successfully - ${member.name}`;
    }
}
