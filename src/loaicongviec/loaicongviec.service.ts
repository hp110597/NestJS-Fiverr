import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoaiCongViecDto } from './dto';

@Injectable()
export class LoaicongviecService {
  private prisma: PrismaClient = new PrismaClient();

  //get loai-cong-viec
  async getLoaiCongViec(): Promise<any> {
    let dataLoaiCongViec = await this.prisma.loaiCongViec.findMany({});
    return {
      content: 'Lấy danh sách loại công việc thành công',
      data: dataLoaiCongViec,
    };
  }

    //get loai-cong-viec theo paginate
    async getLoaiCongViecByPaginate(
      PageSize: any,
      PageIndex: any,
      TenLoaiCongViec: any,
    ): Promise<any> {
      let startIndex = (PageIndex - 1) * PageSize;
      let endIndex = PageIndex * PageSize;
      let dataLoaiCongViec = await this.prisma.loaiCongViec.findMany({
        where: {
          ten_loai_cong_viec: {
            contains: TenLoaiCongViec,
          },
        },
      });
      if (dataLoaiCongViec && Array.isArray(dataLoaiCongViec)&&PageIndex>0&&PageSize>0) {
        let dataPaginated = dataLoaiCongViec.slice(startIndex, endIndex);
        return {
          check: true,
          data: {
            content:
              'Lấy danh sách loại công việc theo phân trang tìm kiếm thành công',
            dataPaginated,
          },
        };
      } else {
        return {
          check: false,
          data: {
            content: 'Lấy danh sách loại công việc theo phân trang tìm kiếm thất bại',
          },
        };
      }
    }

  //post loai-cong-viec
  async postLoaiCongViec(ten_loai_cong_viec: string): Promise<any> {
    let dataLoaiCongViec = await this.prisma.loaiCongViec.create({
      data: { ten_loai_cong_viec },
    });
    return {
      content: 'Post loại công việc thành công',
      dataLoaiCongViec,
    };
  }

  //get loai-cong-viec theo id
  async getLoaiCongViecID(id: string): Promise<any> {
    let dataLoaiCongViec = await this.prisma.loaiCongViec.findFirst({
      where: {
        loaicongviec_id: +id,
      },
    });
    if (dataLoaiCongViec) {
      return {
        check: true,
        data: {
          content: 'Lấy danh sách loại công việc theo id thành công',
          dataLoaiCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Lấy danh sách loại công việc theo id thất bại' },
      };
    }
  }

  //put loai-cong-viec theo id
  async putLoaiCongViec(id: string, ten_loai_cong_viec: string): Promise<any> {
    let checkLoaiCongViec = await this.prisma.loaiCongViec.findFirst({
      where: {
        loaicongviec_id: +id,
      },
    });
    if (checkLoaiCongViec) {
      let dataLoaiCongViec = await this.prisma.loaiCongViec.update({
        data: {
          ten_loai_cong_viec,
        },
        where: {
          loaicongviec_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Chỉnh sửa danh sách loại công việc theo id thành công',
          data: dataLoaiCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Chỉnh sửa danh sách loại công việc thất bại ' },
      };
    }
  }

  //delete loai-cong-viec theo id
  async deleteLoaiCongViec(id: string): Promise<any> {
    let checkLoaiCongViec = await this.prisma.loaiCongViec.findFirst({
      where: {
        loaicongviec_id: +id,
      },
    });
    if (checkLoaiCongViec) {
      let dataLoaiCongViec = await this.prisma.loaiCongViec.delete({
        where: {
          loaicongviec_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Xóa loại công việc thành công',
          data: dataLoaiCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Xóa loại công việc thất bại ' },
      };
    }
  }
}
