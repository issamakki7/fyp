import { FloorProps } from "./IFloor.model";

export interface TableProps {
  floor: FloorProps | undefined;
  is_two_sided: boolean;
  table_id: string;
  table_number: string;
  userReservedSeat?: string;
}
