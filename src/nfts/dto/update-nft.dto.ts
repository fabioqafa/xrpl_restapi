import { PartialType } from '@nestjs/mapped-types';
import { MintNftDto } from './mint-nft.dto';

export class UpdateNftDto extends PartialType(MintNftDto) {}
