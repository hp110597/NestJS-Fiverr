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
import { ChitietloaicongviecService } from './chitietloaicongviec.service';
import { ChiTietLoaiCongViecDto } from './dto';

@ApiTags('ChiTietLoaiCongViec')
@Controller('')
export class ChitietloaicongviecController {
  constructor(
    private chitietloaicongviecService: ChitietloaicongviecService, // private jwt: JwtService,
  ) {}

  //get chi_tiet_loai-cong-viec
  @Get('chi-tiet-loai-cong-viec')
  async getChiTietLoaiCongViec(): Promise<any> {
    return await this.chitietloaicongviecService.getChiTietLoaiCongViec();
  }

  //get chi tiết loại công việc theo pagination
  @ApiQuery({ name: 'TenChiTietLoai' })
  @ApiQuery({ name: 'PageSize' })
  @ApiQuery({ name: 'PageIndex' })
  // @Get('nguoidung/phan-trang-tim-kiem?PageIndex=PageIndex&PageSize=PageSize&TenNguoiDung=TenNguoiDung')
  @Get('chi-tiet-loai-cong-viec/phan-trang-tim-kiem')
  async getChiTietLoaiByPaginate(@Req() req: Request): Promise<any> {
    const { TenChiTietLoai, PageIndex, PageSize } = req.query;
    let checkChiTietLoaiCongViec = await this.chitietloaicongviecService.getChiTietLoaiByPaginate(
      PageSize,
      PageIndex,
      TenChiTietLoai,
    );
    if (checkChiTietLoaiCongViec.check) {
      return checkChiTietLoaiCongViec.data;
    } else {
      throw new HttpException(checkChiTietLoaiCongViec.data, HttpStatus.BAD_REQUEST);
    }
  }

  //post chi-tiet-loai-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: ChiTietLoaiCongViecDto })
  @Post('chi-tiet-loai-cong-viec')
  async postChiTietLoaiCongViec(
    @Body() body: ChiTietLoaiCongViecDto,
  ): Promise<any> {
    const { ten_chi_tiet, hinh_anh, loaicongviec_id } = body;

    let checkDataChiTiet =
      await this.chitietloaicongviecService.postChiTietLoaiCongViec(
        ten_chi_tiet,
        hinh_anh,
        loaicongviec_id,
      );
    if (checkDataChiTiet.check) {
      return checkDataChiTiet.data;
    } else {
      throw new HttpException(checkDataChiTiet.data, HttpStatus.BAD_REQUEST);
    }
  }

  //get chi-tiet-loai-cong-viec theo id
  @ApiParam({ name: 'id' })
  @Get('chi-tiet-loai-cong-viec/:id')
  async getChiTietCongViecID(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkDataChiTietCongViec =
      await this.chitietloaicongviecService.getChiTietCongViecID(id);

    if (checkDataChiTietCongViec.check) {
      return checkDataChiTietCongViec.data;
    } else {
      throw new HttpException(
        checkDataChiTietCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //put chi-tiet-loai-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ChiTietLoaiCongViecDto })
  @Put('chi-tiet-loai-cong-viec/:id')
  async putChiTietLoaiCongViec(
    @Req() req: Request,
    @Body() body: ChiTietLoaiCongViecDto,
  ): Promise<any> {
    const { id } = req.params;
    const { ten_chi_tiet, hinh_anh, loaicongviec_id } = body;
    let dataToken = req.user;
    let checkDataChiTietLoaiCongViec =
      await this.chitietloaicongviecService.putChiTietLoaiCongViec(
        id,
        ten_chi_tiet,
        hinh_anh,
        loaicongviec_id,
      );
    if (checkDataChiTietLoaiCongViec.check) {
      return checkDataChiTietLoaiCongViec.data;
    } else {
      throw new HttpException(
        checkDataChiTietLoaiCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //delete chi-tiet-loai-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @Delete('chi-tiet-loai-cong-viec/:id')
  async deleteChiTietLoaiCongViec(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let dataToken = req.user;
    let checkDataChiTietLoaiCongViec =
      await this.chitietloaicongviecService.deleteChiTietLoaiCongViec(id);
    if (checkDataChiTietLoaiCongViec.check) {
      return checkDataChiTietLoaiCongViec.data;
    } else {
      throw new HttpException(
        checkDataChiTietLoaiCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
