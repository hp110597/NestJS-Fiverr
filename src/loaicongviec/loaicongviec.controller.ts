import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoaiCongViecDto } from './dto';
import { LoaicongviecService } from './loaicongviec.service';

@ApiTags('LoaiCongViec')
@Controller('')
export class LoaicongviecController {
  constructor(
    private loaicongviecService: LoaicongviecService, // private jwt: JwtService,
  ) {}

  //get loai-cong-viec
  @Get('loai-cong-viec')
  async getLoaiCongViec(): Promise<any> {
    return await this.loaicongviecService.getLoaiCongViec();
  }

  //get nguoi-dung theo pagination
  @ApiQuery({ name: 'TenLoaiCongViec' })
  @ApiQuery({ name: 'PageSize' })
  @ApiQuery({ name: 'PageIndex' })
  // @Get('nguoidung/phan-trang-tim-kiem?PageIndex=PageIndex&PageSize=PageSize&TenNguoiDung=TenNguoiDung')
  @Get('loai-cong-viec/phan-trang-tim-kiem')
  async getLoaiCongViecByPaginate(@Req() req: Request): Promise<any> {
    const { TenLoaiCongViec, PageIndex, PageSize } = req.query;
    let checkLoaiCongViec = await this.loaicongviecService.getLoaiCongViecByPaginate(
      PageSize,
      PageIndex,
      TenLoaiCongViec,
    );
    if (checkLoaiCongViec.check) {
      return checkLoaiCongViec.data;
    } else {
      throw new HttpException(checkLoaiCongViec.data, HttpStatus.BAD_REQUEST);
    }
  }

  //post loai-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: LoaiCongViecDto })
  @Post('loai-cong-viec')
  async postLoaiCongViec(@Body() body: LoaiCongViecDto): Promise<any> {
    const { ten_loai_cong_viec } = body;
    return await this.loaicongviecService.postLoaiCongViec(ten_loai_cong_viec);
  }

  //get loai-cong-viec theo id
  @ApiParam({ name: 'id' })
  @Get('loai-cong-viec/:id')
  async getLoaiCongViecID(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkDataLoaiCongViec =
      await this.loaicongviecService.getLoaiCongViecID(id);

    if (checkDataLoaiCongViec.check) {
      return checkDataLoaiCongViec.data;
    } else {
      throw new HttpException(
        checkDataLoaiCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //put loai-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @ApiBody({ type: LoaiCongViecDto })
  @Put('loai-cong-viec/:id')
  async putLoaiCongViec(
    @Req() req: Request,
    @Body() body: LoaiCongViecDto,
  ): Promise<any> {
    const { id } = req.params;
    const { ten_loai_cong_viec } = body;
    let checkDataLoaiCongViec = await this.loaicongviecService.putLoaiCongViec(
      id,
      ten_loai_cong_viec,
    );
    if (checkDataLoaiCongViec.check) {
      return checkDataLoaiCongViec.data;
    } else {
      throw new HttpException(
        checkDataLoaiCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //delete loai-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @Delete('loai-cong-viec/:id')
  async deleteLoaiCongViec(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkDataLoaiCongViec =
      await this.loaicongviecService.deleteLoaiCongViec(id);
    if (checkDataLoaiCongViec.check) {
      return checkDataLoaiCongViec.data;
    } else {
      throw new HttpException(
        checkDataLoaiCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
