import com.guidosemag.dtos.UserDto
import com.guidosemag.models.*
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.bson.types.ObjectId
import org.bson.Document

class UserService(database: MongoDatabase) {
    var usersCollection: MongoCollection<User>
    var addressCollection: MongoCollection<Address>
    var carCollection: MongoCollection<Car>
    var creditCardCollection: MongoCollection<CreditCard>

    init {
        database.createCollection("users")
        usersCollection = database.getCollection("users", User::class.java)
        addressCollection = database.getCollection("addresses", Address::class.java)
        carCollection = database.getCollection("cars", Car::class.java)
        creditCardCollection = database.getCollection("credit.cards", CreditCard::class.java)
    }

    suspend fun create(userDto: UserDto): String = withContext(Dispatchers.IO) {
        val user = userDto.toUser()
        val address = userDto.toAddress(user.id)
        val car = userDto.toCar(user.id)
        val creditCard = userDto.toCreditCard(user.id)

        usersCollection.insertOne(user)
        addressCollection.insertOne(address)
        carCollection.insertOne(car)
        creditCardCollection.insertOne(creditCard)
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