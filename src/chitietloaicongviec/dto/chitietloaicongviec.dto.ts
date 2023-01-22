import { ApiProperty } from '@nestjs/swagger';

export class ChiTietLoaiCongViecDto {
  @ApiProperty({ description: 'chitietloai_id', type: Number })
  chitietloai_id: number;

  @ApiProperty({ description: 'ten_chi_tiet', type: String })
  ten_chi_tiet: string;

  @ApiProperty({ description: 'hinh_anh', type: String })
  hinh_anh: string;

  @ApiProperty({ description: 'loaicongviec_id', type: Number })
  loaicongviec_id: number;
}
