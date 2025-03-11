import Swal from "sweetalert2";

export async function msg (title:string,text:string,icons: any){
    return Swal.fire({
      title: title,
      text: text,
      icon: icons,
      confirmButtonText: "Tutup",
    });
}

export async function createMessage(title:string,text:string,icon:any) {
  const {isConfirmed} = await msg(title,text,icon);
  if(isConfirmed){
    // to do
  } 
}



export async function msgconfirm (title:string,text:string,icons: any,textButtonConfirm:string,textButtonCancel:string){
  return Swal.fire({
    title: title,
    text: text,
    icon: icons,
    showCancelButton: true,
    confirmButtonText: textButtonConfirm,
    cancelButtonText:textButtonCancel
  })
}

export async function createMessageConfirm(title:string,text:string,icon:any,textButtonConfirm:string,textButtonCancel:string) {
  const {isConfirmed} = await msgconfirm(title,text,icon,textButtonConfirm,textButtonCancel);
  if(isConfirmed){
    return "confirmed"
  } 
}


