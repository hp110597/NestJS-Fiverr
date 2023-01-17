import { BadRequestException, Body, Controller, Get, Headers, HttpException, HttpStatus, NotFoundException, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { FileUploadDto, NguoiDungDto, NguoiDungLoginDto, UploadDto } from './dto';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { async } from 'rxjs';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(
        private authSerivice: AuthService,
        private jwt: JwtService,

    ) { }

       // signup
       @ApiBody({type:NguoiDungDto})
       @Post("signup")
       async signup(@Body() body:NguoiDungDto): Promise<NguoiDungDto> {
           const {name,email,pass_word,phone,birth_day,gender,role,skill,certification} = body
           let checkSignup = await this.authSerivice.signup(name,email,pass_word,phone,birth_day,gender,role,skill,certification)
           if (checkSignup.check){
            return checkSignup.data
           }else{
            throw new HttpException(checkSignup.data,HttpStatus.BAD_REQUEST)
           }
       }
      //login
      @ApiBody({type:NguoiDungLoginDto})
      @Post("signin")
      async login(@Body() body:NguoiDungLoginDto):Promise<string>{
        const {email,mat_khau}=body
        let checkLogin = await this.authSerivice.login(email,mat_khau)
        if(checkLogin.check){
            //trả vê token
            return checkLogin.data
        }else{
            throw new HttpException(checkLogin.data,HttpStatus.BAD_REQUEST)
        }
      }
       


    // @ApiParam({ name: "hoTen" })
    // @ApiBody({ type: NguoiDungLoginDto })
    // @Post("login/:hoTen")
    // async login(@Req() req: Request, @Param("hoTen") param: string, @Body() body: NguoiDungLoginDto): Promise<string> {

    //     const { email, mat_khau } = body;
    //     let checkLogin = await this.authSerivice.login(email, mat_khau);

    //     if (checkLogin.check) {
    //         //trả về token user
    //         return checkLogin.data;
    //     } else {
    //         throw new HttpException(checkLogin.data, HttpStatus.NOT_FOUND);
    //     }

    // }

    // yarn add -D @types/multer

   
    // @ApiConsumes('multipart/form-data')
    // @ApiBody({
    //     description: 'avatar',
    //     type: FileUploadDto,
    // })
    // @UseInterceptors(FileInterceptor("avatar", {
    //     storage: diskStorage({
    //         destination: "./public/img",
    //         filename(req, file, callback) {
    //             let date = new Date();
    //             callback(null, `${date.getTime()}-${file.originalname}`);
    //         },
    //     })
    // }))
    // @Post("upload/:id")
    // upload(@Param("id") id: string, @UploadedFile() file: UploadDto): Promise<boolean> {

    //     return this.authSerivice.uploadAvatar(Number(id), file.filename);
    // }
    //create 2 api 
    //login

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard("jwt"))
    // @Get()
    // demo(@Req() req: Request): Promise<nguoi_dung[]> {

    //     return this.authSerivice.getUser();
    // }


 


}
//yarn start:dev

// (1): module, controller, service

// nest g (1) auth --no-spec