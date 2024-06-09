import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.guidosemag.models.*
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import org.bson.types.ObjectId
import org.mindrot.jbcrypt.BCrypt
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
        val user = credentialsCollection.find(Filters.eq("username", credentials.username)).first()

        if (user == null || !BCrypt.checkpw(credentials.password, user.password)) {
            return null
        }
        return generateJWT(user.id.toString())
    }

    fun register(credentials: Credential): String? {
        val existingUser = credentialsCollection.find(Filters.eq("username", credentials.username)).firstOrNull()
        if (existingUser != null) {
            throw IllegalArgumentException("El nombre de usuario ${credentials.username} ya existe.")
        }
        credentials.password = BCrypt.hashpw(credentials.password, BCrypt.gensalt())

        credentialsCollection.insertOne(credentials)
        return generateJWT(credentials.id.toString())
    }
}
