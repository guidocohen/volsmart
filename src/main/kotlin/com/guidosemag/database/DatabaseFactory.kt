package com.guidosemag.database

import com.mongodb.client.MongoClients
import com.mongodb.client.MongoDatabase
import io.ktor.server.application.*

object DatabaseFactory {
    lateinit var database: MongoDatabase
        private set

    fun init(application: Application) {
        val user = System.getenv("DB_MONGO_USER")
        val password = System.getenv("DB_MONGO_PASSWORD")
        val host = System.getenv("DB_MONGO_HOST") ?: "localhost"
        val port = System.getenv("DB_MONGO_PORT") ?: "27017"
        val maxPoolSize = System.getenv("DB_MONGO_MAX_POOL_SIZE") ?: "20"
        val databaseName = System.getenv("DB_MONGO_DATABASE")

        val credentials = user?.let { userVal -> password?.let { passwordVal -> "$userVal:$passwordVal@" } }.orEmpty()

        val uri = "mongodb://$credentials$host:$port/?maxPoolSize=$maxPoolSize&w=majority"

        val mongoClient = MongoClients.create(uri)
        database = mongoClient.getDatabase(databaseName)

        application.environment.monitor.subscribe(ApplicationStopped) {
            mongoClient.close()
        }
    }
}
