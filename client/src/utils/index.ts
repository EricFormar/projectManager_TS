import Swal from "sweetalert2"

type Icon = 'warning' | 'error' | 'success' | 'info' | 'question';
type Position = 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end'

type ShowMessageResponse =  (title: string, text : string, icon? : Icon, redirect? : () => void,) => void


export const showMessageResponse : ShowMessageResponse = (title, text, icon ='info', redirect) => {

    Swal.fire({
        icon,
        title,
        text
    }).then((result) => {
        if (result.isConfirmed) {
           redirect && redirect()
          }
    })
}

type ShowToastMessage = (
    title : string,
    position? : Position,
    icon? : Icon,
    showConfirmButton? : boolean,
    timer? : number
) => void


export const showToastMessage : ShowToastMessage = (
    title,
    position = "top-end",
    icon = "success",
    showConfirmButton = false,
    timer = 1500

) => {
    Swal.fire({
        title,
        position,
        icon,
        showConfirmButton,
        timer
      });
}


type ShowConfirmMessage = (
    title : string,
    action : () => void,
    icon? : Icon,
    confirmButtonText? : string,
    denyButtonText? : string,
) => void

export const showConfirmMessage : ShowConfirmMessage = (title, action, icon="question", confirmButtonText="Aceptar", denyButtonText="Cancelar") => {
    Swal.fire({
        title,
        icon,
        showDenyButton : true,
        confirmButtonText,
        denyButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          action()
          }
    })
}