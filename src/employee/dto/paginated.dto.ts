import { ApiProperty } from "@nestjs/swagger";


export class PaginatedDto<TData> {
    @ApiProperty()
    total: number;

    @ApiProperty()
    totalPage: number;

    @ApiProperty()
    take: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    paginations: {page: number, active: boolean}[];
  
    @ApiProperty()
    data: TData[];
}
  
