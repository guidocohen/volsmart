import com.guidosemag.dtos.UpdateUserDto
import com.guidosemag.models.User
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.bson.types.ObjectId
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import org.bson.Document
import kotlin.reflect.full.memberProperties

class UserService(database: MongoDatabase) {
    var usersCollection: MongoCollection<User>

    init {
        database.createCollection("users")
        usersCollection = database.getCollection("users", User::class.java)
    }

    suspend fun create(user: User): String = withContext(Dispatchers.IO) {
        usersCollection.insertOne(user)
        user.id.toString()
    }

    suspend fun readAll(): List<User> = withContext(Dispatchers.IO) {
        usersCollection.find().toList()
    }

    suspend fun readById(id: String): Document? = withContext(Dispatchers.IO) {
        usersCollection.find(Filters.eq("_id", ObjectId(id))).first()?.toDocument()
    }

    /*
    suspend fun updateById(id: String, user: User): User? = withContext(Dispatchers.IO) {
        usersCollection.findOneAndReplace(Filters.eq("_id", ObjectId(id)), user)
    }

    suspend fun deleteById(id: String): User? = withContext(Dispatchers.IO) {
        usersCollection.findOneAndDelete(Filters.eq("_id", ObjectId(id)))
    }

     */
}