package com.guidosemag.controllers

import UserService
import com.guidosemag.dtos.UserDto
import com.mongodb.client.MongoDatabase
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class UserController(database: MongoDatabase) {
    private val userService = UserService(database)

    fun registerRoutes(route: Route) {
        with(route) {
            authenticate {
                route("/users") {
                    post("/sync") {
                        try {
                            userService.syncUsers()
                            call.respond(HttpStatusCode.Created, "¡Sincronización Exitosa!")
                        } catch (e: IllegalArgumentException) {
                            call.respond(HttpStatusCode.BadRequest, e.message ?: "Error al sincronizar")
                        } catch (e: Exception) {
                            call.respond(HttpStatusCode.InternalServerError, "Error al sincronizar")
                        }
                    }
                    post {
                        try {
                            val payload: UserDto = call.receive<UserDto>()
                            val id: String = userService.create(payload)
                            call.respond(HttpStatusCode.Created, id)
                        } catch (e: IllegalArgumentException) {
                            call.respond(HttpStatusCode.BadRequest, e.message ?: "Error al crear el usuario")
                        } catch (e: Exception) {
                            call.respond(HttpStatusCode.InternalServerError, "Error al crear el usuario")
                        }
                    }
                    get {
                        try {
                            val users = userService.readAll()
                            call.respond(HttpStatusCode.OK, users)
                        } catch (e: IllegalArgumentException) {
                            call.respond(HttpStatusCode.BadRequest, e.message ?: "Error al procesar la solicitud")
                        } catch (e: Exception) {
                            call.respond(HttpStatusCode.InternalServerError, "Error al obtener los usuarios")
                        }
                    }
                    get("/{id}") {
                        val userId = call.parameters["id"] ?: return@get call.respond(
                            HttpStatusCode.BadRequest,
                            "No se encontró el ID del usuario"
                        )
                        try {
                            userService.readById(userId).let { user ->
                                call.respond(HttpStatusCode.OK, user)
                            }
                        } catch (e: IllegalArgumentException) {
                            call.respond(HttpStatusCode.BadRequest, e.message ?: "Error al procesar la solicitud")
                        } catch (e: Exception) {
                            call.respond(HttpStatusCode.InternalServerError, "Error al obtener el usuario")
                        }
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
                */
                    delete("/{id}") {
                        try {
                            val userId = call.parameters["id"] ?: return@delete call.respond(
                                HttpStatusCode.BadRequest,
                                "No se encontró el ID del usuario"
                            )
                            userService.deleteById(userId).let {
                                call.respond(HttpStatusCode.OK, "Usuario $userId eliminado")
                            }
                        } catch (e: IllegalArgumentException) {
                            call.respond(HttpStatusCode.BadRequest, e.message ?: "Error al procesar la solicitud")
                        } catch (e: Exception) {
                            call.respond(HttpStatusCode.InternalServerError, "Error al eliminar el usuario")
                        }
                    }
                }
            }
        }
    }
}
