import { ApiProperty } from "@nestjs/swagger";

export class ThueCongViecDto {
    @ApiProperty({ description: 'thuecongviec_id', type: Number })
    thuecongviec_id: number;
  
    @ApiProperty({description:"congviec_id",type:Number})
    congviec_id:number;

    @ApiProperty({description:"nguoidung_id",type:Number})
    nguoidung_id:number;

    @ApiProperty({description:"ngày thuê",type:Date})
    ngay_thue:string;

    @ApiProperty({description:"ngày thuê",type:Boolean})
    hoan_thanh:boolean;
  }
  