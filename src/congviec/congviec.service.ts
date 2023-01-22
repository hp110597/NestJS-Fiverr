import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CongviecService {
  private prisma: PrismaClient = new PrismaClient();

  //get cong-viec
  async getCongViec(): Promise<any> {
    let dataCongViec = await this.prisma.congViec.findMany({});
    return {
      content: 'Lấy danh sách công việc thành công',
      data: dataCongViec,
    };
  }

    //get cong-viec theo paginate
    async getCongViecByPaginate(
      PageSize: any,
      PageIndex: any,
      TenCongViec: any,
    ): Promise<any> {
      let startIndex = (PageIndex - 1) * PageSize;
      let endIndex = PageIndex * PageSize;
      let dataCongViec = await this.prisma.congViec.findMany({
        where: {
          ten_cong_viec: {
            contains: TenCongViec,
          },
        },
      });
      if (dataCongViec && Array.isArray(dataCongViec)&&PageIndex>0&&PageSize>0) {
        let dataPaginated = dataCongViec.slice(startIndex, endIndex);
        return {
          check: true,
          data: {
            content:
              'Lấy danh sách công việc theo phân trang tìm kiếm thành công',
            dataPaginated,
          },
        };
      } else {
        return {
          check: false,
          data: {
            content: 'Lấy danh sách công việc theo phân trang tìm kiếm thất bại',
          },
        };
      }
    }

    //post cong-viec
    async postCongViec(
        ten_cong_viec:string,
        danh_gia:number,
        gia_tien:number,
        hinh_anh:string,
        mo_ta:string,
        mo_ta_ngan:string,
        sao_cong_viec:number,
        chitietloai_id:number,
        dataToken:any
      ): Promise<any> {
        let checkDataCongViec = await this.prisma.nguoiDung.findFirst({
          where: {
            nguoidung_id:dataToken.nguoidung_id,
          },
        });
        if (checkDataCongViec) {
            let checkDataChiTietLoaiCongViec = await this.prisma.chiTietLoaiCongViec.findFirst({
                where:{
                    chitietloai_id
                }
            })
            if(checkDataChiTietLoaiCongViec){
                let dataCongViec = await this.prisma.congViec.create({
                    data: {
                      ten_cong_viec,
                      danh_gia,
                      gia_tien,
                      hinh_anh,
                      mo_ta,
                      mo_ta_ngan,
                      sao_cong_viec,
                      chitietloai_id,
                      nguoidung_id:dataToken.nguoidung_id
                    },
                  });
                  return {
                    check: true,
                    data: {
                        dataCongViec,
                      content: 'Thêm công việc thành công',
                    },
                  };
            }else{
                return {
                    check: false,
                    data: 'Kiểm tra chi tiết loại id',
                  };
            }
         
        } else {
          return {
            check: false,
            data: 'Thêm chi tiết loại công việc thất bại',
          };
        }
      }

        //get cong-viec theo id
  async getCongViecID(id: string): Promise<any> {
    let dataCongViec =
      await this.prisma.congViec.findFirst({
        where: {
          congviec_id: +id,
        },
      });
    if (dataCongViec) {
      return {
        check: true,
        data: {
          content: 'Lấy công việc theo id thành công',
          dataCongViec,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Lấy công việc theo id thất bại' },
      };
    }
  }

    //put cong-viec theo id
    async putCongViec(
        id:string,
        ten_cong_viec:string,
        danh_gia:number,
        gia_tien:number,
        hinh_anh:string,
        mo_ta:string,
        mo_ta_ngan:string,
        sao_cong_viec:number,
        chitietloai_id:number,
        dataToken:any
      ): Promise<any> {
        let checkCongViec =
          await this.prisma.congViec.findFirst({
            where: {
              congviec_id: +id,
              nguoidung_id:dataToken.nguoidung_id
            },
          });
        if (checkCongViec) {
          let checkChiTietLoaiCongViec = await this.prisma.chiTietLoaiCongViec.findFirst({
            where: {
              chitietloai_id,
            },
          });
          if (checkChiTietLoaiCongViec) {
            let dataCongViec =
              await this.prisma.congViec.update({
                data: {
                    ten_cong_viec,
                    danh_gia,
                    gia_tien,
                    hinh_anh,
                    mo_ta,
                    mo_ta_ngan,
                    sao_cong_viec,
                    chitietloai_id,
                    nguoidung_id:dataToken.nguoidung_id
                },
                where: {
                  congviec_id: +id,
                },
              });
            return {
              check: true,
              data: {
                content: 'Chỉnh sửa công việc theo id thành công',
                data: dataCongViec,
              },
            };
          } else {
            return {
              check: false,
              data: {
                content: 'Kiểm tra lại id chi tiết loại công việc',
              },
            };
          }
        } else {
          return {
            check: false,
            data: { content: 'Chỉnh sửa công việc thất bại ' },
          };
        }
      }

      
  //xóa công việc
  async deleteCongViec(id: string,dataToken:any): Promise<any> {
    let checkCongViec = await this.prisma.congViec.findFirst({
      where: {
        congviec_id: +id,
        nguoidung_id:dataToken.nguoidung_id
      },
    });
    if (!checkCongViec) {
      return {
        check: false,
        data: 'Xóa thất bại',
      };
    } else {
      let dataDelete = await this.prisma.congViec.delete({
    
        where:{
            congviec_id:+id
        }
     
      });
      return {
        check: true,
        data: {
          content: 'Xóa công việc thành công',
          dataDelete,
        },
      };
    }
  }

    //post upload avatar
    async uploadHinhCongViec(filename: string, dataToken: any,maCongViec:string): Promise<boolean> {
      let checkUser = await this.prisma.congViec.findFirst({
        where: {
          nguoidung_id: dataToken.nguoidung_id,
          congviec_id:+maCongViec
        },
      });
      if (checkUser) {
        await this.prisma.congViec.update({
          data: {
            hinh_anh: filename,
          },
          where: {
            congviec_id:+maCongViec
          },
        });
        return true;
      } else {
        return false;
      }
    }

      //get search cong-viec theo keyword
  async getCongViecBySearch(TenCongViec: string): Promise<any> {
    let dataCongViec = await this.prisma.congViec.findMany({
      where: {
        ten_cong_viec: {
          contains: TenCongViec,
        },
      },
    });
    return {
      check: true,
      data: {
        content: 'Lấy danh sách công việc theo keyword thành công',
        dataCongViec,
      },
    };
  }
}
