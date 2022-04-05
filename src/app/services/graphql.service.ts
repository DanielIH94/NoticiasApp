import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ComentarioInputModel } from '../models/ComentarioInputModel';
import { NotaInputModel } from '../models/NotaInputModel';
import { NoteModel } from '../models/NoteModel';
import { RegisterUserModel } from '../models/RegisterUserModel';
import { RespuestaInputModel } from '../models/RespuestaInputModel';
import { UserModel } from '../models/UserModel';

/**
 * Servicio utilizado para hacer operaciones a traves del API
 */

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  public notes!: NoteModel[]

  constructor(private apollo: Apollo) { }

  //Método para hacer una peticion de login
  login(username: string, password: string) {
    let query = gql`
    query Login($username:String, $password:String){
      login(username:$username, password:$password){
        idUsuario
        foto
        notas{
          contenido
        }
      }
    }
    `

    return this.apollo.watchQuery<any>({
      query,
      variables: { username, password }
    }).valueChanges

  }

  //Método para registrar un nuevo usuario
  register(usuario: RegisterUserModel, idPersonal?: number) {
    let mutation = gql`
    mutation RegistrarUsuario($usuario:UsuarioInput!, $idPersonal:Int){
      register(usuario:$usuario, idPersonal:$idPersonal){
        idUsuario
      }
    }
    `
    console.log(mutation);


    return this.apollo.mutate({
      mutation,
      variables: { usuario, idPersonal },
    })
  }

  /*
  * Método para obtener la información de un usuario por su nombre
  * de usuario
  */
  getUserByUsername(nombreUsuario: string): Observable<any> {
    let query = gql`
    query GetUsuarioByNombreUsuario($nombreUsuario:String!){
      usuarioByNombreUsuario(nombreUsuario:$nombreUsuario){
        idUsuario
        nombreUsuario
        foto
        personal{
          nombre
        }
      }
    }
    `

    return this.apollo.watchQuery<any>({
      query,
      variables: { nombreUsuario },
      pollInterval: 1000
    }).valueChanges
  }

  getUserById(id: number): Observable<any> {
    let query = gql`
    query Usuario($id:Int!){
      usuario(ID:$id){
        idUsuario
        nombreUsuario
        foto
        personal{
          nombre
          apellidoPaterno
        }
      }
    }
    `

    return this.apollo.watchQuery<any>({
      query,
      variables: { id },
      pollInterval: 1000
    }).valueChanges
  }

  isInterno(id: number) {
    let query = gql`
    query IsInterno($id:Int){
      isInterno(userID:$id)
    }
    `
    return this.apollo.watchQuery<any>({
      query,
      variables: { id },
    }).valueChanges
  }

  //Método para obtener todas las notas
  getNotes(): Observable<any> {

    let query = gql`
    query GetNotas{
      notas{
        idNota
        titulo
        contenido
        fechaNota
        usuario{
          idUsuario
          nombreUsuario
          foto
        }
        comentarios{
          idComentario
          contenido
          fechaComentario
          usuario{
            idUsuario
            nombreUsuario
            foto
          }
          respuestas{
            idRespuesta
            contenido
            fechaRespuesta
            usuario{
              idUsuario
              nombreUsuario
            }
          }
        }
      }
    }
    `

    return this.apollo.watchQuery<any>({
      query,
      pollInterval: 1000,
    }).valueChanges
  }

  //Metodo para almacenar una nota
  newNote(nota: NotaInputModel, idUsuario: number) {
    let mutation = gql`
    mutation AddNota($nota:NotaInput, $idUsuario:Int){
      addNota(nota:$nota, idUsuario:$idUsuario){
        idNota
      }
    }
    `

    return this.apollo.mutate({
      mutation,
      variables: { nota, idUsuario },
    })
  }

  //Método para agregar un nuevo comentario
  newComentario(comentario: ComentarioInputModel, idNota: number, idUsuario: number) {
    let mutation = gql`
    mutation AddComentario($comentario:ComentarioInput, $idNota:Int, $idUsuario:Int){
      addComentario(comentario:$comentario, idNota:$idNota, idUsuario:$idUsuario){
        idComentario
      }
    }
    `

    return this.apollo.mutate({
      mutation,
      variables: { comentario, idNota, idUsuario },
    })
  }

  newRespuesta(respuesta: RespuestaInputModel, idComentario: number, idUsuario: number) {
    let mutation = gql`
    mutation AddRespuesta($respuesta:RespuestaInput, $idComentario:Int, $idUsuario:Int){
      addRespuesta(respuesta:$respuesta, idUsuario:$idUsuario, idComentario:$idComentario){
        idRespuesta
      }
    }
    `

    return this.apollo.mutate({
      mutation,
      variables: { respuesta, idComentario, idUsuario },
    })
  }
}
