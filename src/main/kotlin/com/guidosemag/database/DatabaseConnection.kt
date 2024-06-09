package com.guidosemag.database

import io.ktor.server.application.*

fun configureDatabases(application: Application) {
    DatabaseFactory.init(application)
}
