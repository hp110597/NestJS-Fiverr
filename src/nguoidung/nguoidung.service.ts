import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NguoidungService {
  constructor(private jwt: JwtService) {}
  private prisma: PrismaClient = new PrismaClient();

  //get nguoi-dung
  async getNguoiDung(): Promise<any> {
    let dataNguoiDung = await this.prisma.nguoiDung.findMany({});
    return {
      data: { content: 'Lấy bình luận thành công', dataNguoiDung },
    };
  }

  //get nguoi-dung theo paginate
  async getNguoiDungByPaginate(
    PageSize: any,
    PageIndex: any,
    TenNguoiDung: any,
  ): Promise<any> {
    let startIndex = (PageIndex - 1) * PageSize;
    let endIndex = PageIndex * PageSize;
    let dataNguoiDung = await this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: TenNguoiDung,
        },
      },
    });
    if (dataNguoiDung && Array.isArray(dataNguoiDung)&&PageIndex>0&&PageSize>0) {
      let dataPaginated = dataNguoiDung.slice(startIndex, endIndex);
      return {
        check: true,
        data: {
          content:
            'Lấy danh sách người dùng theo phân trang tìm kiếm thành công',
          dataPaginated,
        },
      };
    } else {
      return {
        check: false,
        data: {
          content: 'Lấy danh sách người dùng theo phân trang tìm kiếm thất bại',
        },
      };
    }
  }

  //post nguoi-dung
  async postNguoiDung(
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
    skill: string,
    certification: string,
    avatar: string,
  ): Promise<any> {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return {
        check: false,
        data: 'Email đã tồn tại',
      };
    } else {
      let dataSignup = await this.prisma.nguoiDung.create({
        data: {
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
        },
      });
      return {
        check: true,
        data: {
          contain: 'Post người dùng thành công',
          dataSignup,
        },
      };
    }
  }

  //get nguoi-dung theo id
  async getNguoiDungID(id: string): Promise<any> {
    let dataNguoiDung = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: +id,
      },
    });
    if (dataNguoiDung) {
      return {
        check: true,
        data: {
          content: 'Lấy danh sách người dùng theo id thành công',
          dataNguoiDung,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Lấy danh sách người dùng theo id thất bại' },
      };
    }
  }

  //delete nguoi-dung theo id
  async deleteNguoiDung(id: string): Promise<any> {
    let checkNguoiDung = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: +id,
      },
    });
    if (checkNguoiDung) {
      let dataNguoiDung = await this.prisma.nguoiDung.delete({
        where: {
          nguoidung_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Xóa người dùng thành công',
          data: dataNguoiDung,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Xóa người dùng thất bại ' },
      };
    }
  }

  //put nguoi-dung theo id
  async putNguoiDung(
    id: string,
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
    skill: string,
    certification: string,
    avatar: string,
  ): Promise<any> {
    let checkNguoiDung = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: +id,
      },
    });
    if (checkNguoiDung) {
      let dataNguoiDung = await this.prisma.nguoiDung.update({
        data: {
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
        },
        where: {
          nguoidung_id: +id,
        },
      });
      return {
        check: true,
        data: {
          content: 'Chỉnh sửa người dùng theo id thành công',
          data: dataNguoiDung,
        },
      };
    } else {
      return {
        check: false,
        data: { content: 'Chỉnh sửa người dùng thất bại' },
      };
    }
  }

  //get search nguoi-dung theo keyword
  async getNguoiDungBySearch(TenNguoiDung: string): Promise<any> {
    let dataNguoiDung = await this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: TenNguoiDung,
        },
      },
    });
    return {
      check: true,
      data: {
        content: 'Lấy danh sách người dùng theo keyword thành công',
        dataNguoiDung,
      },
    };
  }

  //post upload avatar
  async uploadAvatar(filename: string, dataToken: any): Promise<boolean> {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        nguoidung_id: dataToken.nguoidung_id,
      },
    });
    if (checkUser) {
      await this.prisma.nguoiDung.update({
        data: {
          avatar: filename,
        },
        where: {
          nguoidung_id: dataToken.nguoidung_id,
        },
      });
      return true;
    } else {
      return false;
    }
  }
}
