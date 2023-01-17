import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { async } from 'rxjs';
import { User } from 'src/dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  private prisma: PrismaClient = new PrismaClient();

  // async getUser(): Promise<nguoi_dung[]> {
  //   return await this.prisma.nguoi_dung.findMany();
  // }

  // async uploadAvatar(id: number, filename: string): Promise<boolean> {
  //   await this.prisma.nguoi_dung.update({
  //     data: { hinh_dai_dien: filename },
  //     where: {
  //       id,
  //     },
  //   });

  //   return true;
  // }

  async signup(
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
    skill: string,
    certification: string,
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
        },
      });
      return {
        check: true,
        data: { dataSignup, content: 'Đăng kí thành công' },
      };
    }
  }

  async login(email: string, mat_khau: string): Promise<any> {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      //email đúng
      if (checkEmail.pass_word == mat_khau) {
        let token = this.jwt.sign(checkEmail, {
          expiresIn: '2d',
          secret: this.config.get('SECRET_KEY'),
        });

        //pass đúng
        return {
          check: true,
          data: { checkEmail, token },
        };
      } else {
        //pass sai
        return {
          check: false,
          data: 'Mật khẩu sai !',
        };
      }
    } else {
      //email sai
      return {
        check: false,
        data: 'Email sai',
      };
    }
  }
}
