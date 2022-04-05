import { ResponseModel } from "./ResponseModel"
import { UserModel } from "./UserModel"

//Modelo que representa un comentario de una nota
export type CommentModel = {
    idComentario: number
    contenido: string
    fechaComentario: string
    respuestas: ResponseModel[]
    usuario: UserModel
}