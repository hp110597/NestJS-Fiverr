import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ThuecongviecService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  private prisma: PrismaClient = new PrismaClient();

  //get thue-cong-viec
  async getThueCongViec(): Promise<any> {
    let dataThueCongViec = await this.prisma.thueCongViec.findMany({});
    return {
      content: 'Lấy danh sách thuê công việc thành công',
      data: dataThueCongViec,
    };
  }

  //get thue-cong-viec theo paginate
  async getThueCongViecByPaginate(PageSize: any, PageIndex: any): Promise<any> {
    let startIndex = (PageIndex - 1) * PageSize;
    let endIndex = PageIndex * PageSize;
    let dataThueCongViec = await this.prisma.thueCongViec.findMany({});
    if (
      dataThueCongViec &&
      Array.isArray(dataThueCongViec) &&
      PageIndex > 0 &&
      PageSize > 0
    ) {
      let dataPaginated = dataThueCongViec.slice(startIndex, endIndex);
      return {
        check: true,
        data: {
          content:
            'Lấy danh sách thuê công việc theo phân trang tìm kiếm thành công',
          dataPaginated,
        },
      };
    } else {
      return {
        check: false,
        data: {
          content: 'Lấy danh sách thuê công việc theo phân trang tìm kiếm thất bại',
        },
      };
    }
  }

  //post thue-cong-viec
  async postThueCongViec(
    congviec_id: number,
    nguoidung_id: number,
    ngay_thue: string,
    hoan_thanh: boolean,
    tokenData: any,
  ): Promise<any> {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: tokenData.nguoidung_id,
      },
    });
    if (checkUser) {
      let dataThueCongViec = await this.prisma.thueCongViec.create({
        data: {
          congviec_id,
          ngay_thue,
          hoan_thanh,
          nguoidung_id: tokenData.nguoidung_id,
        },
      });
      return {
        check: true,
        data: { dataThueCongViec, contnent: 'Thêm thuê công việc thành công' },
      };
    } else {
      return {
        check: false,
        data: 'Token không hợp lệ hoặc chưa đăng nhập',
      };
    }
  }

  //get thue-cong-viec theo user
  async getCongViecDaThueTheoUser(tokenData: any): Promise<any> {
    let dataThueCongViec = await this.prisma.thueCongViec.findMany({
      where: {
        nguoidung_id: tokenData.nguoidung_id,
      },
      include: {
        CongViec: true,
      },
    });
    if (dataThueCongViec) {
      return {
        check: true,
        data: {
          content: 'Lấy danh sách thuê công việc theo user thành công',
          dataThueCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Lấy danh sách thuê công việc theo user thất bại' },
      };
    }
  }

  //get thue-cong-viec theo id
  async getThueCongViecID(id: number): Promise<any> {
    let dataThueCongViec = await this.prisma.thueCongViec.findMany({
      where: {
        thuecongviec_id: id,
      },
      include: {
        NguoiDung: true,
      },
    });
    if (dataThueCongViec) {
      return {
        check: true,
        data: {
          content: 'Lấy danh sách thuê công việc theo id thành công',
          dataThueCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Lấy danh sách thuê công việc theo id thất bại' },
      };
    }
  }

  //put hoan-thanh-cong-viec
  async postHoanThanhCongViec(
    congviec_id: number,
    tokenData: any,
  ): Promise<any> {
    let checkUser = await this.prisma.thueCongViec.findFirst({
      where: {
        congviec_id,
        nguoidung_id: tokenData.nguoidung_id,
        hoan_thanh: false,
      },
    });
    if (checkUser) {
      let dataThueCongViec = await this.prisma.thueCongViec.updateMany({
        where: { congviec_id },
        data: {
          hoan_thanh: true,
        },
      });
      return {
        check: true,
        data: {
          dataThueCongViec,
          contnent: 'Cập nhật hoàn thành công việc thành công',
        },
      };
    } else {
      return {
        check: false,
        data: 'Cập nhật hoàn thành công việc thất bại',
      };
    }
  }

  //put thue-cong-viec theo id
  async putThueCongViec(
    id: string,
    congviec_id: number,
    nguoidung_id: number,
    ngay_thue: string,
    hoan_thanh: boolean,
    tokenData: any,
  ): Promise<any> {
    let checkThueCongViec = await this.prisma.thueCongViec.findFirst({
      where: {
        nguoidung_id: tokenData.nguoidung_id,
        thuecongviec_id: +id,
      },
    });
    if (checkThueCongViec) {
      let dataThueCongViec = await this.prisma.thueCongViec.update({
        data: {
          thuecongviec_id: +id,
          congviec_id,
          nguoidung_id: tokenData.nguoidung_id,
          ngay_thue,
          hoan_thanh,
        },
        where: {
          thuecongviec_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Chỉnh sửa thuê công việc theo id thành công',
          data: dataThueCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Chỉnh sửa thuê công việc thất bại ' },
      };
    }
  }

  //xóa thuê công việc
  async deleteThueCongViec(id: string, dataToken: any): Promise<any> {
    let checkUser = await this.prisma.thueCongViec.findFirst({
      where: {
        nguoidung_id: dataToken.nguoidung_id,
        thuecongviec_id: +id,
      },
    });
    if (!checkUser) {
      return {
        check: false,
        data: 'Xóa thất bại',
      };
    } else {
      let dataDelete = await this.prisma.thueCongViec.delete({
        where: {
          thuecongviec_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Xóa thuê công việc thành công',
          dataDelete,
        },
      };
    }
  }
}
