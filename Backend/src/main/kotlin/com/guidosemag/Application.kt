package com.guidosemag

import com.guidosemag.database.configureDatabases
import com.guidosemag.plugins.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(
        Netty,
        port = System.getenv("PORT").toInt(),
        host = System.getenv("HOST"),
        module = Application::module
    )
        .start(wait = true)
}

fun Application.module() {
    configureSecurity()
    configureSerialization()
    configureDatabases(this)
    configureRouting()
    // configureSwagger()
}
