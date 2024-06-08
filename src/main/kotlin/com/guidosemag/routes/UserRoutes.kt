package com.guidosemag.routes

import com.guidosemag.models.User
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

val users = mutableListOf(
    User("1", "Guido", "https://avatars.githubusercontent.com/u/12345678?v=4"),
    User("2", "Guido", "https://avatars.githubusercontent.com/u/12345678?v=4"),
)

fun Route.userRouting() {
    route("/users") {
        get {
            // TODO: get all users from database
            if (users.isNotEmpty()) {
                call.respond(users)
            } else {
                call.respondText("No se encontraron usuarios", status = HttpStatusCode.OK)
            }
        }
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respondText(
                "Id no encontrado",
                status = HttpStatusCode.BadRequest

            )
            val user = users.find { it.id == id } ?: return@get call.respondText(
                "No se encontró el usuario con el id $id",
                status = HttpStatusCode.NotFound
            )
            call.respond(user)
        }
        post {
            val user = call.receive<User>()
            users.find { it.id == user.id }?.let {
                call.respondText("El usuario con el id ${user.id} ya existe", status = HttpStatusCode.Conflict)
            } ?: run {
                users.add(user)
                call.respondText("Usuario creado correctamente", status = HttpStatusCode.Created)
            }
        }
        delete("/{id}") {
            val id = call.parameters["id"] ?: return@delete call.respondText(
                "Id no encontrado",
                status = HttpStatusCode.BadRequest
            )
            if (users.removeIf { it.id == id }) {
                call.respondText("Usuario eliminado correctamente", status = HttpStatusCode.OK)
            } else {
                call.respondText("No se encontró el usuario con el id $id", status = HttpStatusCode.NotFound)
            }
        }
    }
}