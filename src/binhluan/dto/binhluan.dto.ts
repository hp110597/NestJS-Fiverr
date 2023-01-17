import { ApiProperty } from "@nestjs/swagger";

export class BinhLuanDto{
    @ApiProperty({description:"id",type:Number})
    binhluan_id:number;

    @ApiProperty({description:"congviec_id",type:Number})
    congviec_id:number;

    @ApiProperty({description:"nguoidung_id",type:Number})
    nguoidung_id:number;

    @ApiProperty({description:"ngày bình luận",type:Date})
    ngay_binh_luan:string;

    @ApiProperty({description:"nội dung",type:String})
    noi_dung:string;

    @ApiProperty({description:"sao bình luận",type:Number})
    sao_binh_luan:number;
}