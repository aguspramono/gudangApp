import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

export const cekStockPurchDetailbyNopo = async (nopo:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}stockpurchdetail/detailpo?id=${nopo}`,{headers:headers}
    );

    return response.data.dataStockPurchDetail;
  } catch (error) {
    return error;
  }
};

export const cekStockPoDetailbyNopo = async (nopo:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}stockpodetail/detailpo?id=${nopo}`,{headers:headers}
      );
  
      return response.data.dataStockPoDetail;
    } catch (error) {
      return error;
    }
  };

