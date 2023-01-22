import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChitietloaicongviecService {
  private prisma: PrismaClient = new PrismaClient();

  //get chi_tiet_loai-cong-viec
  async getChiTietLoaiCongViec(): Promise<any> {
    let dataChiTiet = await this.prisma.chiTietLoaiCongViec.findMany({});
    return {
      content: 'Lấy danh sách chi tiết loại công việc thành công',
      data: dataChiTiet,
    };
  }

   //get chi tiết loại theo paginate
   async getChiTietLoaiByPaginate(
    PageSize: any,
    PageIndex: any,
    TenChiTietLoai: any,
  ): Promise<any> {
    let startIndex = (PageIndex - 1) * PageSize;
    let endIndex = PageIndex * PageSize;
    let dataChiTietLoaiCongViec = await this.prisma.chiTietLoaiCongViec.findMany({
      where: {
        ten_chi_tiet: {
          contains: TenChiTietLoai,
        },
      },
    });
    if (dataChiTietLoaiCongViec && Array.isArray(dataChiTietLoaiCongViec)&&PageIndex>0&&PageSize>0) {
      let dataPaginated = dataChiTietLoaiCongViec.slice(startIndex, endIndex);
      return {
        check: true,
        data: {
          content:
            'Lấy danh sách chi tiết loại công việc theo phân trang tìm kiếm thành công',
          dataPaginated,
        },
      };
    } else {
      return {
        check: false,
        data: {
          content: 'Lấy danh sách chi tiết loại công việc theo phân trang tìm kiếm thất bại',
        },
      };
    }
  }

  //post chi-tiet-loai-cong-viec
  async postChiTietLoaiCongViec(
    ten_chi_tiet: string,
    hinh_anh: string,
    loaicongviec_id: number,
  ): Promise<any> {
    let checkDataLoaiCongViec = await this.prisma.loaiCongViec.findFirst({
      where: {
        loaicongviec_id,
      },
    });
    if (checkDataLoaiCongViec) {
      let dataChiTiet = await this.prisma.chiTietLoaiCongViec.create({
        data: {
          ten_chi_tiet,
          hinh_anh,
          loaicongviec_id: loaicongviec_id,
        },
      });
      return {
        check: true,
        data: {
          dataChiTiet,
          content: 'Thêm chi tiết loại công việc thành công',
        },
      };
    } else {
      return {
        check: false,
        data: 'Thêm chi tiết loại công việc thất bại',
      };
    }
  }

  //get chi-tiet-loai-cong-viec theo id
  async getChiTietCongViecID(id: string): Promise<any> {
    let dataChiTietLoaiCongViec =
      await this.prisma.chiTietLoaiCongViec.findFirst({
        where: {
          chitietloai_id: +id,
        },
      });
    if (dataChiTietLoaiCongViec) {
      return {
        check: true,
        data: {
          content: 'Lấy chi tiết loại công việc theo id thành công',
          dataChiTietLoaiCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Lấy chi tiết loại công việc theo id thất bại' },
      };
    }
  }

  //put chi-tiet-loai-cong-viec theo id
  async putChiTietLoaiCongViec(
    id: string,
    ten_chi_tiet: string,
    hinh_anh: string,
    loaicongviec_id: number,
  ): Promise<any> {
    let checkChiTietLoaiCongViec =
      await this.prisma.chiTietLoaiCongViec.findFirst({
        where: {
          chitietloai_id: +id,
        },
      });
    if (checkChiTietLoaiCongViec) {
      let checkLoaiCongViec = await this.prisma.loaiCongViec.findFirst({
        where: {
          loaicongviec_id,
        },
      });
      if (checkLoaiCongViec) {
        let dataChiTietLoaiCongViec =
          await this.prisma.chiTietLoaiCongViec.update({
            data: {
              ten_chi_tiet,
              hinh_anh,
              loaicongviec_id,
            },
            where: {
              chitietloai_id: +id,
            },
          });
        return {
          check: true,
          data: {
            content: 'Chỉnh sửa chi tiết loại công việc theo id thành công',
            data: dataChiTietLoaiCongViec,
          },
        };
      } else {
        return {
          check: false,
          data: {
            content: 'Kiểm tra lại id loại công việc',
          },
        };
      }
    } else {
      return {
        check: false,
        data: { content: 'Chỉnh sửa chi tiết loại công việc thất bại ' },
      };
    }
  }

  //xóa chi tiết loại công việc
  async deleteChiTietLoaiCongViec(id: string): Promise<any> {
    let checkDataChiTietLoaiCongViec = await this.prisma.chiTietLoaiCongViec.findFirst({
      where: {
        chitietloai_id: +id,
      },
    });
    if (!checkDataChiTietLoaiCongViec) {
      return {
        check: false,
        data: 'Xóa thất bại',
      };
    } else {
      let dataDelete = await this.prisma.chiTietLoaiCongViec.delete({
        where: {
          chitietloai_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Xóa chi tiết loại công việc thành công',
          dataDelete,
        },
      };
    }
  }
}
