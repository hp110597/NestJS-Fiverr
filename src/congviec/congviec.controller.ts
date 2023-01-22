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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, request } from 'express';
import { diskStorage } from 'multer';
import { FileUploadDto, UploadDto } from 'src/auth/dto';
import { CongviecService } from './congviec.service';
import { CongViecDto } from './dto';

@ApiTags('CongViec')
@Controller('')
export class CongviecController {
  constructor(
    private congviecService: CongviecService, // private jwt: JwtService,
  ) {}

  //get -cong-viec
  @Get('cong-viec')
  async getCongViec(): Promise<any> {
    return await this.congviecService.getCongViec();
  }

    //get cong-viec theo pagination
    @ApiQuery({ name: 'TenCongViec' })
    @ApiQuery({ name: 'PageSize' })
    @ApiQuery({ name: 'PageIndex' })
    // @Get('nguoidung/phan-trang-tim-kiem?PageIndex=PageIndex&PageSize=PageSize&TenNguoiDung=TenNguoiDung')
    @Get('cong-viec/phan-trang-tim-kiem')
    async getCongViecByPaginate(@Req() req: Request): Promise<any> {
      const { TenCongViec, PageIndex, PageSize } = req.query;
      let checkCongViec = await this.congviecService.getCongViecByPaginate(
        PageSize,
        PageIndex,
        TenCongViec,
      );
      if (checkCongViec.check) {
        return checkCongViec.data;
      } else {
        throw new HttpException(checkCongViec.data, HttpStatus.BAD_REQUEST);
      }
    }

  //post cong-viec
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CongViecDto })
  @Post('cong-viec')
  async postCongViec(
    @Req() req: Request,
    @Body() body: CongViecDto,
  ): Promise<any> {
    const {
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      chitietloai_id,
    } = body;
    let dataToken = req.user;

    let checkDataCongViec = await this.congviecService.postCongViec(
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      chitietloai_id,
      dataToken,
    );
    if (checkDataCongViec.check) {
      return checkDataCongViec.data;
    } else {
      throw new HttpException(checkDataCongViec.data, HttpStatus.BAD_REQUEST);
    }
  }

  //get cong-viec theo id
  @ApiParam({ name: 'id' })
  @Get('cong-viec/:id')
  async getCongViecID(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkDataCongViec = await this.congviecService.getCongViecID(id);

    if (checkDataCongViec.check) {
      return checkDataCongViec.data;
    } else {
      throw new HttpException(checkDataCongViec.data, HttpStatus.BAD_REQUEST);
    }
  }

  //put cong-viec
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CongViecDto })
  @Put('cong-viec/:id')
  async putCongViec(
    @Req() req: Request,
    @Body() body: CongViecDto,
  ): Promise<any> {
    const { id } = req.params;
    const {
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      chitietloai_id,
    } = body;
    let dataToken = req.user;
    let checkCongViec =
      await this.congviecService.putCongViec(
        id,
        ten_cong_viec,
        danh_gia,
        gia_tien,
        hinh_anh,
        mo_ta,
        mo_ta_ngan,
        sao_cong_viec,
        chitietloai_id,
        dataToken
      );
    if (checkCongViec.check) {
      return checkCongViec.data;
    } else {
      throw new HttpException(
        checkCongViec.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

    //delete cong-viec
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
   @ApiParam({ name: 'id' })
   @Delete('cong-viec/:id')
   async deleteCongViec(@Req() req: Request): Promise<any> {
     const { id } = req.params;
     let dataToken = req.user;
     let checkDataCongViec =
       await this.congviecService.deleteCongViec(id,dataToken);
     if (checkDataCongViec.check) {
       return checkDataCongViec.data;
     } else {
       throw new HttpException(
        checkDataCongViec.data,
         HttpStatus.BAD_REQUEST,
       );
     }
   }

     //post upload avatar công việc
  // yarn add -D @types/multer
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'maCongViec' })

  @ApiConsumes('multipart/form-data')
  @ApiBody({
      description: 'avatar',
      type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor("avatar", {
      storage: diskStorage({
          destination: "./public/img",
          filename(req, file, callback) {
              let date = new Date();
              callback(null, `${date.getTime()}-${file.originalname}`);
          },
      })
  }))
  @Put("cong-viec/upload-hinh-cong-viec/:maCongViec")
  uploadHinhCongViec(@Req() req:Request, @UploadedFile() file: UploadDto): Promise<boolean> {
    let {maCongViec} = req.params
    let dataToken = req.user
      return this.congviecService.uploadHinhCongViec( file.filename,dataToken,maCongViec);
  }

  //get search cong-viec theo keyword
  @ApiParam({ name: 'TenCongViec' })
  @Get('cong-viec/search/:TenCongViec')
  async getCongViecBySearch(@Req() req: Request): Promise<any> {
    const { TenCongViec } = req.params;
    let checkCongViec = await this.congviecService.getCongViecBySearch(
      TenCongViec,
    );
    if (checkCongViec.check) {
      return checkCongViec.data;
    } else {
      throw new HttpException(checkCongViec.data, HttpStatus.BAD_REQUEST);
    }
  }
}
