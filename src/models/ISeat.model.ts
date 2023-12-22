import { TableProps } from "./ITable.model";

export interface SeatProps {
  seat_id: string;
  seat_number: number;
  table: TableProps | undefined;
}
