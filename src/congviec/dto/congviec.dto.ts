import { ApiProperty } from '@nestjs/swagger';

export class CongViecDto {
  @ApiProperty({ description: 'congviec_id', type: Number })
  congviec_id: number;

  @ApiProperty({ description: 'ten_cong_viec', type: String })
  ten_cong_viec: string;

  @ApiProperty({ description: 'danh_gia', type: Number })
  danh_gia: number;

  @ApiProperty({ description: 'gia_tien', type: Number })
  gia_tien: number;

  @ApiProperty({ description: 'hinh_anh', type: String })
  hinh_anh: string;

  @ApiProperty({ description: 'mo_ta', type: String })
  mo_ta: string;

  @ApiProperty({ description: 'mo_ta_ngan', type: String })
  mo_ta_ngan: string;

  @ApiProperty({ description: 'sao_cong_viec', type: Number })
  sao_cong_viec: number;

  @ApiProperty({ description: 'mo_ta', type: Number })
  chitietloai_id: number;

  @ApiProperty({ description: 'mo_ta', type: Number })
  nguoidung_id: number;

}
