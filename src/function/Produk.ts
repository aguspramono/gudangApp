import axios from "axios";

const baseUrl = import.meta.env.VITE_PUBLIC_URL;

const headers = {
  "Content-Type": "multipart/form-data",
};

export const getProduk = async (wherelike:string,pageprev:number,page:number,option:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}product?like=${wherelike}&pageprev=${pageprev}&page=${page}&option=${option}`,{headers:headers}
    );

    return response.data.dataproduct;
  } catch (error) {
    return error;
  }
};

export const getProdukCount = async (wherelike:string,option:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}product/datacount?like=${wherelike}&option=${option}`,{
        headers:headers
      }
    );

    return response.data.countproduct;
  } catch (error) {
    return error;
  }
};


export const getProdukById = async (id:string) => {
  try {
    const response = await axios.get(
      `${baseUrl}product/detail?id=${id}`,{
        headers:headers
      }
    );

    return response.data.dataproduct;
  } catch (error) {
    return error;
  }
};

  export const createProduct = async (Kode:string,Nama:string,Merek:string,Kategori:string,Satuan:string,Spec:string,Lokasi:string,Min:number,Max:number,TglUbah= new Date(),Username:string,Showing:number) => {
    try {
      var postData = {
        Kode:Kode,
        Nama: Nama,
        Merek:Merek,
        Kategori: Kategori,
        Satuan:Satuan,
        Spec:Spec,
        Lokasi:Lokasi,
        Min:Min,
        Max:Max,
        TglUbah:TglUbah,
        Username:Username,
        Showing:Showing
      };

      const response = await axios.post(
        `${baseUrl}product/save`,postData, {headers:headers});

      return response.data;
    } catch (error) {
      return error;
    }
  };


  export const updateProduct = async (Kode:string,Nama:string,Merek:string,Kategori:string,Satuan:string,Spec:string,Lokasi:string,Min:number,Max:number,TglUbah= new Date(),Username:string,Showing:number) => {
    try {
      var postData = {
        Nama: Nama,
        Merek:Merek,
        Kategori: Kategori,
        Satuan:Satuan,
        Spec:Spec,
        Lokasi:Lokasi,
        Min:Min,
        Max:Max,
        TglUbah:TglUbah,
        Username:Username,
        Showing:Showing
      };

      const response = await axios.post(
        `${baseUrl}product/update/${Kode}`,postData, {headers:headers});

      return response.data;
    } catch (error) {
      return error;
    }
  };


  export const deleteProduk = async (kode:string) => {
    try {
      const response = await axios.get(
        `${baseUrl}product/delete?id=${kode}`,
        {
          headers: headers,
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  };

export const updatebatchproduct = async(mydata:any)=>{
  try {
    var postData = {
      data:mydata 
    };

    const response = await axios.post(
      `${baseUrl}product/updatebatch`,postData, {headers:headers});

    return response.data;
  } catch (error) {
    return error;
  }
}


  
