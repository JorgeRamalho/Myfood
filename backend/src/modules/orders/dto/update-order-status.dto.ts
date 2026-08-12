import { IsIn, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn(['preparando', 'a_caminho', 'entregue', 'cancelado'])
  status!: 'preparando' | 'a_caminho' | 'entregue' | 'cancelado';
}
