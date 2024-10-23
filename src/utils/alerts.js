import Swal from "sweetalert2";

export const Confirm = (
  title = "Delete ",
  text = "Are you sure to delete?",
) => {
  return Swal.fire({
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
};

export const Alert = (
  title = "Error",
  text = "An error has occurred",
  icon = "error"
) => {
  return Swal.fire({
    title ,
    text,
    confirmButtonText : "Ok",
  });
};
