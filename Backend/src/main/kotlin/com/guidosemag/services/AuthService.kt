import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.guidosemag.models.*
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import java.util.*

class AuthService(database: MongoDatabase) {
    private var credentialsCollection: MongoCollection<Credential>
    private val jwtAudience = System.getenv("JWT_AUDIENCE")
    private val jwtDomain = System.getenv("JWT_DOMAIN")
    private val jwtSecret = System.getenv("JWT_SECRET")

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
            .withExpiresAt(Date(System.currentTimeMillis() + System.getenv("JWT_EXPIRES").toInt()))
            .sign(algorithm)
    }

    fun login(credentials: Credential): String? {
        val credential = credentialsCollection.find(Filters.eq("userName", credentials.userName)).firstOrNull()
        if (credential == null || !credential.checkPassword(credentials.password)) {
            return null
        }
        return generateJWT(credential.id.toString())
    }

    fun register(credentials: Credential): Boolean {
        val existingUser = credentialsCollection.find(Filters.eq("userName", credentials.userName)).firstOrNull()
        if (existingUser != null) {
            throw IllegalArgumentException("El nombre de usuario ${credentials.userName} ya existe.")
        }
        credentials.encrypt(credentials.password)
        credentialsCollection.insertOne(credentials)
        return true
        // return generateJWT(credentials.id.toString())
    }
}
