import { CommentModel } from "./CommentModel"

//Modelo que representa una publicacion/nota
export type NoteModel = {
    id: number
    titulo: string
    contenido: string
    fechaNota: string
    comentarios: CommentModel[]
}