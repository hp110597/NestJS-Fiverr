import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { async } from 'rxjs';
import { NguoiDungDto } from 'src/auth/dto';
import { BinhLuanDto } from './dto';

@Injectable()
export class BinhluanService {
  constructor(private jwt: JwtService) {}
  private prisma: PrismaClient = new PrismaClient();

  //getbinhluan

  async getBinhLuan(): Promise<any> {
    let dataBinhLuan = await this.prisma.binhLuan.findMany({});
    return {
      data: { content: 'Lấy bình luận thành công', dataBinhLuan },
    };
  }

  //postBinhLuan

  async postBinhLuan(
    congviec_id: number,
    // nguoidung_id: number,
    ngay_binh_luan: string,
    noi_dung: string,
    sao_binh_luan: number,
    tokenData: any,
  ): Promise<any> {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: tokenData.nguoidung_id,
      },
    });
    if (checkUser) {
      let dataBinhLuan = await this.prisma.binhLuan.create({
        data: {
          congviec_id,
          ngay_binh_luan,
          noi_dung,
          sao_binh_luan,
          nguoidung_id: tokenData.nguoidung_id,
        },
      });
      return {
        check: true,
        data: { dataBinhLuan, contnent: 'Bình luận thành công' },
      };
    } else {
      return {
        check: false,
        data: 'Token không hợp lệ hoặc chưa đăng nhập',
      };
    }
  }

  //putBinhLuan
  async putBinhLuan(
    congviec_id: number,
    nguoidung_id: number,
    ngay_binh_luan: string,
    noi_dung: string,
    sao_binh_luan: number,
    binhluan_id: string,
  ): Promise<any> {
    let checkComment = await this.prisma.binhLuan.findFirst({
      where: {
        binhluan_id: +binhluan_id,
      },
    });
    if (!checkComment) {
      return {
        check: false,
        data: 'binhluan_id không hợp lệ',
      };
    } else {
      let dataUpdate = await this.prisma.binhLuan.update({
        data: {
          congviec_id,
          ngay_binh_luan,
          noi_dung,
          sao_binh_luan,
          nguoidung_id,
        },
        where: {
          binhluan_id: +binhluan_id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Cập nhật bình luận thành công',
          dataUpdate,
        },
      };
    }
  }

  //xóa bình luận
  async deleteBinhLuan(
    binhluan_id: string,
    dataToken: NguoiDungDto,
  ): Promise<any> {
    let checkUser = await this.prisma.binhLuan.findFirst({
      where: {
        nguoidung_id: dataToken.nguoidung_id,
        binhluan_id: +binhluan_id,
      },
    });
    if (!checkUser) {
      return {
        check: false,
        data: 'Xóa thất bại',
      };
    } else {
      let dataDelete = await this.prisma.binhLuan.delete({
        where: {
        
          binhluan_id: +binhluan_id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Xóa bình luận thành công',
          dataDelete,
        },
      };
    }
  }
}
