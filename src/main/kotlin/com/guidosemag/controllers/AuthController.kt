package com.guidosemag.controllers

import AuthService
import com.mongodb.client.MongoDatabase
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import com.guidosemag.models.Credential

class AuthController(database: MongoDatabase) {
    private val authService = AuthService(database)

    fun registerRoutes(route: Route) {
        with(route) {
            post("/login") {
                try {
                    val credentials: Credential = call.receive<Credential>()

                    authService.login(credentials)?.let { token: String ->
                        call.respond(HttpStatusCode.OK, token)
                    } ?: run {
                        call.respond(HttpStatusCode.Unauthorized, "Credenciales inválidas")
                    }
                } catch (e: IllegalArgumentException) {
                    call.respond(HttpStatusCode.BadRequest, e.message ?: "Error al iniciar sesión")
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Error al iniciar sesión")
                }
            }
            post("/register") {
                try {
                    val credentials: Credential = call.receive<Credential>()
                    val token = authService.register(credentials)
                    call.respond(HttpStatusCode.Created, token ?: "Usuario creado correctamente")
                } catch (e: IllegalArgumentException) {
                    call.respond(HttpStatusCode.BadRequest, e.message ?: "Error al crear el usuario")
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Error al crear el usuario")
                }
            }
        }
    }
}
