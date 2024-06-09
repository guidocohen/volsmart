import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.guidosemag.models.*
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import java.util.*

class AuthService(database: MongoDatabase) {
    private var credentialsCollection: MongoCollection<Credential>
    private val jwtAudience = "jwt-audience"
    private val jwtDomain = "https://jwt-provider-domain/"
    private val jwtSecret = "secret"

    init {
        database.createCollection("credentials")
        credentialsCollection = database.getCollection("credentials", Credential::class.java)
    }

    private fun generateJWT(userId: String): String {
        val algorithm = Algorithm.HMAC256(jwtSecret)
        return JWT.create()
            .withAudience(jwtAudience)
            .withIssuer(jwtDomain)
            .withSubject(userId)
            .withExpiresAt(Date(System.currentTimeMillis() + 86400000)) // Token expires in 24 hs
            .sign(algorithm)
    }

    fun validateToken(token: String): String? {
        val algorithm = Algorithm.HMAC256(jwtSecret)
        val verifier = JWT.require(algorithm)
            .withAudience(jwtAudience)
            .withIssuer(jwtDomain)
            .build()
        val jwt = verifier.verify(token)
        return jwt.subject
    }

    fun login(credentials: Credential): String? {
        val user = credentialsCollection.find(Filters.eq("username", credentials.username)).first()
        if (user != null && user.password == credentials.password) {
            return generateJWT(user.id.toString())
        }

        return null
    }
}
