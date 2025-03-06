import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
    "Content-Type": "multipart/form-data",
  };
  
  export const getSupplier = async (wherelike="",page=0) => {
      try {
        const response = await axios.get(
          `${baseUrl}supplier?like=${wherelike}&page=${page}`,
          {
            headers: headers,
          }
        );
  
        return response.data.datasupplier;
      } catch (error) {
        return error;
      }
    };