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
                val credentials: Credential = call.receive<Credential>()

                authService.login(credentials)?.let { token: String ->
                    call.respond(HttpStatusCode.OK, token)
                } ?: run {
                    call.respond(HttpStatusCode.Unauthorized, "Credenciales inválidas")
                }
            }
        }
    }
}
