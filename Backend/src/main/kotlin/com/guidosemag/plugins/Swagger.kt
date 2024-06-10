package com.guidosemag.plugins

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureSwagger() {
    routing {
        get("/swagger-ui") {
            call.respondRedirect("/swagger-ui/index.html?url=/openapi.json", true)
        }
        // swaggerUI(path = "swagger", swaggerFile = "openapi/documentation.yaml")
    }
}
