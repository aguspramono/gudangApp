import Swal from "sweetalert2";

export function msgerr (title="",text=""){
    Swal.fire({
        title: title,
        text: text,
        icon: "error",
        confirmButtonText: "Tutup",
      });
}

export function msgsucc (title="",text=""){
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonText: "Tutup",
      });
}