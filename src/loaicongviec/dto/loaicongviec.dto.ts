import { ApiProperty } from "@nestjs/swagger";

export class LoaiCongViecDto{
    @ApiProperty({ description: 'loaicongviec_id', type: Number })
    loaicongviec_id: number;
  
    @ApiProperty({ description: 'tenLoaiCongViec', type: String })
    ten_loai_cong_viec: string;
}