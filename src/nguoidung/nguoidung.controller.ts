import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { FileUploadDto, NguoiDungDto, UploadDto } from 'src/auth/dto';
import { NguoidungService } from './nguoidung.service';

@ApiTags('NguoiDung')
@Controller('')
export class NguoidungController {
  constructor(private nguoidungService: NguoidungService) {}

  //get nguoi-dung
  @Get('nguoidung')
  async getNguoiDung(): Promise<any> {
    return this.nguoidungService.getNguoiDung();
  }

  //get nguoi-dung theo pagination
  @ApiQuery({ name: 'TenNguoiDung' })
  @ApiQuery({ name: 'PageSize' })
  @ApiQuery({ name: 'PageIndex' })
  // @Get('nguoidung/phan-trang-tim-kiem?PageIndex=PageIndex&PageSize=PageSize&TenNguoiDung=TenNguoiDung')
  @Get('nguoidung/phan-trang-tim-kiem')
  async getNguoiDungByPaginate(@Req() req: Request): Promise<any> {
    const { TenNguoiDung, PageIndex, PageSize } = req.query;
    let checkNguoiDung = await this.nguoidungService.getNguoiDungByPaginate(
      PageSize,
      PageIndex,
      TenNguoiDung,
    );
    if (checkNguoiDung.check) {
      return checkNguoiDung.data;
    } else {
      throw new HttpException(checkNguoiDung.data, HttpStatus.BAD_REQUEST);
    }
  }

  //post nguoi-dung
  @ApiBody({ type: NguoiDungDto })  
  @Post('nguoidung')
  async postNguoiDung(@Body() body: NguoiDungDto): Promise<NguoiDungDto> {
    const {
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
      avatar,
    } = body;
    let checkSignup = await this.nguoidungService.postNguoiDung(
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
      avatar,
    );
    if (checkSignup.check) {
      return checkSignup.data;
    } else {
      throw new HttpException(checkSignup.data, HttpStatus.BAD_REQUEST);
    }
  }

  //get nguoi-dung theo id
  @ApiParam({ name: 'id' })
  @Get('nguoidung/:id')
  async getNguoiDungID(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkNguoiDung = await this.nguoidungService.getNguoiDungID(id);
    if (checkNguoiDung.check) {
      return checkNguoiDung.data;
    } else {
      throw new HttpException(checkNguoiDung.data, HttpStatus.BAD_REQUEST);
    }
  }

  //delete nguoi-dung
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @Delete('nguoidung/:id')
  async deleteNguoiDung(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    let checkDataNguoiDung = await this.nguoidungService.deleteNguoiDung(id);
    if (checkDataNguoiDung.check) {
      return checkDataNguoiDung.data;
    } else {
      throw new HttpException(checkDataNguoiDung.data, HttpStatus.BAD_REQUEST);
    }
  }

  //put nguoi-dung
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  @ApiBody({ type: NguoiDungDto })
  @Put('nguoidung/:id')
  async putNguoiDung(
    @Req() req: Request,
    @Body() body: NguoiDungDto,
  ): Promise<any> {
    const { id } = req.params;
    const {
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
      avatar,
    } = body;
    let checkDataNguoiDung = await this.nguoidungService.putNguoiDung(
      id,
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
      avatar,
    );
    if (checkDataNguoiDung.check) {
      return checkDataNguoiDung.data;
    } else {
      throw new HttpException(checkDataNguoiDung.data, HttpStatus.BAD_REQUEST);
    }
  }

  //get search nguoi-dung theo keyword
  @ApiParam({ name: 'TenNguoiDung' })
  @Get('nguoidung/search/:TenNguoiDung')
  async getNguoiDungBySearch(@Req() req: Request): Promise<any> {
    const { TenNguoiDung } = req.params;
    let checkNguoiDung = await this.nguoidungService.getNguoiDungBySearch(
      TenNguoiDung,
    );
    if (checkNguoiDung.check) {
      return checkNguoiDung.data;
    } else {
      throw new HttpException(checkNguoiDung.data, HttpStatus.BAD_REQUEST);
    }
  }

  //post upload avatar
  // yarn add -D @types/multer
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'avatar',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          let date = new Date();
          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Post('nguoidung/upload-avatar')
  upload(
    @Req() req: Request,
    @UploadedFile() file: UploadDto,
  ): Promise<boolean> {
    let dataToken = req.user;
    return this.nguoidungService.uploadAvatar(file.filename, dataToken);
  }
}
