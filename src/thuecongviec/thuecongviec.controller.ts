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
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ThueCongViecDto } from './dto';
import { ThuecongviecService } from './thuecongviec.service';

@ApiTags('ThueCongViec')
@Controller('')
export class ThuecongviecController {
  constructor(
    private thuecongviecService: ThuecongviecService,
    private jwt: JwtService,
  ) {}

  //get thue-cong-viec
  @Get('thue-cong-viec')
  async getThueCongViec(): Promise<any> {
    return await this.thuecongviecService.getThueCongViec();
  }

    //get nguoi-dung theo pagination
    @ApiQuery({ name: 'PageSize' })
    @ApiQuery({ name: 'PageIndex' })
    // @Get('nguoidung/phan-trang-tim-kiem?PageIndex=PageIndex&PageSize=PageSize&TenNguoiDung=TenNguoiDung')
    @Get('thue-cong-viec/phan-trang-tim-kiem')
    async getThueCongViecByPaginate(@Req() req: Request): Promise<any> {
      const {  PageIndex, PageSize } = req.query;
      let checkThueCongViec = await this.thuecongviecService.getThueCongViecByPaginate(
        PageSize,
        PageIndex,
      );
      if (checkThueCongViec.check) {
        return checkThueCongViec.data;
      } else {
        throw new HttpException(checkThueCongViec.data, HttpStatus.BAD_REQUEST);
      }
    }

  // post thue-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: ThueCongViecDto })
  @Post('thue-cong-viec')
  async postThueCongViec(
    @Req() req: Request,
    @Body() body: ThueCongViecDto,
  ): Promise<any> {
    let dataToken = req.user;
    let { congviec_id, nguoidung_id, ngay_thue, hoan_thanh } = body;
    let checkUser = await this.thuecongviecService.postThueCongViec(
      congviec_id,
      nguoidung_id,
      ngay_thue,
      hoan_thanh,
      dataToken,
    );
    if (checkUser.check) {
      return checkUser.data;
    } else {
      throw new HttpException(checkUser.data, HttpStatus.BAD_REQUEST);
    }
  }

  //get thue-cong-viec theo user
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('thue-cong-viec/lay-danh-sach-da-thue')
  async getCongViecDaThueTheoUser(@Req() req: Request): Promise<any> {
    let tokenData = req.user;
    let checkDataThueCongViec =
      await this.thuecongviecService.getCongViecDaThueTheoUser(tokenData);
    if (checkDataThueCongViec.check) {
      return checkDataThueCongViec.data;
    } else {
      throw new HttpException(
        checkDataThueCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //get thue-cong-viec theo id
  @ApiParam({ name: 'id' })
  @Get('thue-cong-viec/:id')
  async getThueCongViecID(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkDataThueCongViec =
      await this.thuecongviecService.getThueCongViecID(Number(id));

    if (checkDataThueCongViec.check) {
      return checkDataThueCongViec.data;
    } else {
      throw new HttpException(
        checkDataThueCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    // put hoan-thanh-cong-viec
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'maCongViec' })
    @Put('thue-cong-viec/hoan-thanh-cong-viec/:maCongViec')
    async postHoanThanhCongViec(
      @Req() req: Request,
    ): Promise<any> {
      let tokenData = req.user;
      let {  maCongViec } = req.params;
      let checkUser = await this.thuecongviecService.postHoanThanhCongViec(
        Number(maCongViec),
        tokenData,
      );
      if (checkUser.check) {
        return checkUser.data;
      } else {
        throw new HttpException(checkUser.data, HttpStatus.BAD_REQUEST);
      }
    }

  //put thue-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ThueCongViecDto })
  @Put('thue-cong-viec/:id')
  async putThueCongViec(
    @Req() req: Request,
    @Body() body: ThueCongViecDto,
  ): Promise<any> {
    const { id } = req.params;
    const { congviec_id, nguoidung_id, ngay_thue, hoan_thanh } = body;
    let dataToken = req.user;
    let checkDataThueCongViec = await this.thuecongviecService.putThueCongViec(
      id,
      congviec_id,
      nguoidung_id,
      ngay_thue,
      hoan_thanh,
      dataToken,
    );
    if (checkDataThueCongViec.check) {
      return checkDataThueCongViec.data;
    } else {
      throw new HttpException(
        checkDataThueCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //delete thue-cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @Delete('thue-cong-viec/:id')
  async deleteThueCongViec(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let dataToken = req.user;
    let checkDataThueCongViec =
      await this.thuecongviecService.deleteThueCongViec(id, dataToken);
    if (checkDataThueCongViec.check) {
      return checkDataThueCongViec.data;
    } else {
      throw new HttpException(
        checkDataThueCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }


}
