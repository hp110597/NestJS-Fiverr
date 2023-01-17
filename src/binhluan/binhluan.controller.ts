import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { async } from 'rxjs';
import { BinhluanService } from './binhluan.service';
import { BinhLuanDto } from './dto';

@ApiTags('BinhLuan')
@Controller('')
export class BinhluanController {
  constructor(private binhluanService: BinhluanService) {}
  //getbinhluan
  //   @UseGuards(AuthGuard('jwt'))
  @Get('binh-luan')
  async getBinhLuan(@Req() req: Request): Promise<any> {
    console.log(req.user);
    return this.binhluanService.getBinhLuan();
  }

  // postBinhLuan
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: BinhLuanDto })
  @Post('binh-luan')
  async postBinhLuan(
    @Req() req: Request,
    @Body() body: BinhLuanDto,
  ): Promise<any> {
    let dataToken = req.user;
    let { congviec_id, ngay_binh_luan, noi_dung, sao_binh_luan } = body;
    let checkUser = await this.binhluanService.postBinhLuan(
      congviec_id,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
      dataToken,
    );
    if (checkUser.check) {
      return checkUser.data;
    } else {
      throw new HttpException(checkUser.data, HttpStatus.BAD_REQUEST);
    }
  }

  //chỉnh sửa bình luận
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({name:"binhluan_id"})
  @ApiBody({ type: BinhLuanDto })
  @Put('binh-luan/:binhluan_id')
  async putBinhLuan(
    @Req() req: Request,
    @Body() body: BinhLuanDto,
  
  ): Promise<any> {
    let { congviec_id, nguoidung_id, ngay_binh_luan, noi_dung, sao_binh_luan } =
      body;
      let {binhluan_id}=req.params
    let checkComment = await this.binhluanService.putBinhLuan(
      congviec_id,
      nguoidung_id,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
      binhluan_id
    );
    if (checkComment.check) {
      return checkComment.data;
    } else {
      throw new HttpException(checkComment.data, HttpStatus.BAD_REQUEST);
    }
  }

  //xóa bình luận
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({name:"binhluan_id"})
  @Delete('binh-luan/:binhluan_id')
  async deleteBinhLuan(
    @Req() req: any,
  ):Promise<any>{
    let dataToken = req.user
    let {binhluan_id} = req.params
    let checkComment = await this.binhluanService.deleteBinhLuan(binhluan_id,dataToken)
    if (checkComment.check) {
      return checkComment.data;
    } else {
      throw new HttpException(checkComment.data, HttpStatus.BAD_REQUEST);
    }    
  }

}
