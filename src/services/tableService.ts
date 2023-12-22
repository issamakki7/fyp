import { SeatProps } from "../models/ISeat.model";
import { TableProps } from "../models/ITable.model";
import axiosInstance from "../utils/axiosConfig";
import keycloak from "../utils/keycloak";

export const tableService = {
  getTableSeats: async (tableId: string) => {
    return axiosInstance.get<SeatProps[]>(`/seat/seats-of-table/${tableId}`);
  },
  getTables: async (floorId: string) => {
    return axiosInstance.get<TableProps[]>(
      `/table/tables-in-floor/${floorId}}`
    );
  },
};
