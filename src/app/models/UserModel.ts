import { PersonalModel } from "./PersonalModel"

//Modelo para representar un usuario
export type UserModel = {
    id: number
    nombreUsuario:string
    foto: string
    personal: PersonalModel
}