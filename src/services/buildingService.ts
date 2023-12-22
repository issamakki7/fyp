import { Building } from "../models/IBuilding.model";
import axiosInstance from "../utils/axiosConfig";

const getBuildings = async (): Promise<Building[]> => {
  return axiosInstance.get(`/building`);
};
const getBuildingById = async (buildingId: string): Promise<Building> => {
  return axiosInstance.get(`/building/${buildingId}`);
};
export const buildingService = {
  getBuildings,
  getBuildingById,
};
