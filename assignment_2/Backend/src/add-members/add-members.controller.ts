import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, ValidationPipe } from '@nestjs/common';
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
    findOne(@Param('id') id: string): AddMembersDto | undefined {

        return this.addMembersService.findOneById(+id);
    }
    @Post()
    @ApiBody({ type: AddMembersDto })
    @ApiResponse({ status: 201, description: "Added Members Successfully" })
    create(@Body() user: AddMembersDto): AddMembersResponseDto {
        const newMember = this.addMembersService.create(user);
        return {
            message: 'Members Added Successfully',
            newMember: newMember.empId
        };
    }
    @Patch(':id')
    @ApiParam({ name: 'id', required: true, description: 'Member ID' })
    @ApiBody({ type: AddMembersDto })
    @ApiResponse({ status: 200, description: 'Member updated Successfully.' })
    update(@Param('id') id: string, @Body() user: AddMembersDto): AddMembersDto | undefined {
        return this.addMembersService.update(+id, user);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', required: true, description: 'Member ID' })
    @ApiResponse({ status: 204, description: 'Member deleted successfully.' })
    delete(@Param('id') id: string): void {
        return this.addMembersService.delete(+id);
    }
}
