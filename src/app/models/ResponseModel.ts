import { UserModel } from "./UserModel"

 //Modelo para representar una respuesta de comentario

export type ResponseModel = {
    idRespuesta: number
    contenido: string
    fechaRespuesta: string
    usuario: UserModel
}