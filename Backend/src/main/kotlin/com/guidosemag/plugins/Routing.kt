package com.guidosemag.plugins

import com.guidosemag.controllers.AuthController
import com.guidosemag.controllers.UserController
import com.guidosemag.database.DatabaseFactory
import io.ktor.server.application.*
import io.ktor.server.plugins.swagger.*
import io.ktor.server.routing.*
import io.ktor.server.response.*

fun Application.configureRouting() {
    val userController = UserController(DatabaseFactory.database)
    val authController = AuthController(DatabaseFactory.database)

    routing {
        get("/") {
            call.respondText("API REST is working!")
        }

        authController.registerRoutes(this)
        userController.registerRoutes(this)
    }
}
