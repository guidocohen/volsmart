package com.guidosemag.plugins

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*

fun Application.configureSecurity() {
    val jwtAudience = System.getenv("JWT_AUDIENCE")
    val jwtDomain = System.getenv("JWT_DOMAIN")
    val jwtRealm = System.getenv("JWT_REALM")
    val jwtSecret = System.getenv("JWT_SECRET")

    authentication {
        jwt {
            realm = jwtRealm
            verifier(
                JWT
                    .require(Algorithm.HMAC256(jwtSecret))
                    .withAudience(jwtAudience)
                    .withIssuer(jwtDomain)
                    .build()
            )
            validate { credential ->
                if (credential.payload.audience.contains(jwtAudience) &&
                    credential.payload.subject != null
                ) JWTPrincipal(credential.payload) else null
            }
            challenge { _, _ ->
                call.respond(HttpStatusCode.Unauthorized, "Token inválido o ha expirado")
            }
        }
    }

}
