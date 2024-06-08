package com.guidosemag.controllers

import UserService
import com.guidosemag.dtos.UpdateUserDto
import com.guidosemag.models.User
import com.mongodb.client.MongoDatabase
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class UserController(database: MongoDatabase) {
    private val userService = UserService(database)

    fun registerRoutes(route: Route) {
        with(route) {
            route("/users") {
                post {
                    val payload: User = call.receive<User>()
                    val id: String = userService.create(payload)
                    call.respond(HttpStatusCode.Created, id)
                }
                get("/{id}") {
                    val userId = call.parameters["id"] ?: return@get call.respond(
                        HttpStatusCode.BadRequest,
                        "No se encontró el ID del usuario"
                    )
                    userService.readById(userId)?.let { user ->
                        call.respond(HttpStatusCode.OK, user)
                    } ?: call.respond(HttpStatusCode.NotFound)
                }
                /*
                    put("/{id}") {
                        val userId = call.parameters["id"] ?: return@put call.respond(
                            HttpStatusCode.BadRequest,
                            "No se encontró el ID del usuario"
                        )
                        val payload: User = call.receive<User>()

                        userService.updateById(userId, payload)?.let { user ->
                            call.respond(HttpStatusCode.OK, user)
                        } ?: call.respond(HttpStatusCode.NotFound)
                    }
                    delete("/{id}") {
                        val userId = call.parameters["id"] ?: return@delete call.respond(
                            HttpStatusCode.BadRequest,
                            "No se encontró el ID del usuario"
                        )
                        userService.deleteById(userId)?.let {
                            call.respond(HttpStatusCode.OK, "Usuario $userId eliminado")
                        } ?: call.respond(HttpStatusCode.NotFound)
                    }
                */
            }
        }
    }
}
