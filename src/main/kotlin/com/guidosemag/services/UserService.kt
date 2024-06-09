import com.guidosemag.dtos.UserDto
import com.guidosemag.models.*
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import org.bson.Document
import org.bson.types.ObjectId
import kotlinx.serialization.json.Json


class UserService(database: MongoDatabase) {
    private var usersCollection: MongoCollection<User>
    private var addressCollection: MongoCollection<Address>
    private var carCollection: MongoCollection<Car>
    private var creditCardCollection: MongoCollection<CreditCard>

    init {
        database.createCollection("users")
        database.createCollection("addresses")
        database.createCollection("cars")
        database.createCollection("credit.cards")
        usersCollection = database.getCollection("users", User::class.java)
        addressCollection = database.getCollection("addresses", Address::class.java)
        carCollection = database.getCollection("cars", Car::class.java)
        creditCardCollection = database.getCollection("credit.cards", CreditCard::class.java)
    }

    fun syncUsers() = runBlocking {
        val url = "https://62433a7fd126926d0c5d296b.mockapi.io/api/v1/usuarios"
        val client = HttpClient(CIO) {
            engine {
                requestTimeout = 10000
                endpoint {
                    connectTimeout = 10000
                }
            }
            expectSuccess = false
        }

        val response: HttpResponse = client.get(url)

        if (response.status == HttpStatusCode.OK) {
            val responseBody: String = response.bodyAsText()
            val userDtos: List<UserDto> = Json.decodeFromString(responseBody)

            val result = deleteAll()
            if (!result) {
                throw Exception("Error al sincronizar los usuarios")
            }
            for (userDto in userDtos) {
                create(userDto)
            }
        } else {
            throw Exception("Error al sincronizar los usuarios")
        }

        client.close()
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

    private suspend fun getUserDetails(userId: ObjectId): Triple<Address?, Car?, CreditCard?> =
        withContext(Dispatchers.IO) {
            val address = addressCollection.find(Filters.eq("userId", userId)).firstOrNull()
            val car = carCollection.find(Filters.eq("userId", userId)).firstOrNull()
            val creditCard = creditCardCollection.find(Filters.eq("userId", userId)).firstOrNull()

            Triple(address, car, creditCard)
        }

    suspend fun readAll(): List<UserDto> = withContext(Dispatchers.IO) {
        val users = usersCollection.find().toList()
        return@withContext users.map { user ->
            val (address, car, creditCard) = getUserDetails(user.id)
            user.toUserDto(address, creditCard, car)
        }
    }

    suspend fun readById(id: String): UserDto = withContext(Dispatchers.IO) {
        if (!ObjectId.isValid(id)) {
            throw IllegalArgumentException("El id no es un ObjectId válido de MongoDB.")
        }
        val user = usersCollection.find(Filters.eq("_id", ObjectId(id))).firstOrNull()
        return@withContext if (user != null) {
            val (address, car, creditCard) = getUserDetails(user.id)
            user.toUserDto(address, creditCard, car)
        } else {
            throw IllegalArgumentException("No se encontró el usuario con el id proporcionado.")
        }
    }

    /*
    suspend fun updateById(id: String, user: User): User? = withContext(Dispatchers.IO) {
        usersCollection.findOneAndReplace(Filters.eq("_id", ObjectId(id)), user)
    }
     */

    suspend fun deleteById(id: String): Boolean = withContext(Dispatchers.IO) {
        val addressResult = addressCollection.findOneAndDelete(Filters.eq("userId", ObjectId(id)))
        val carResult = carCollection.findOneAndDelete(Filters.eq("userId", ObjectId(id)))
        val creditCardResult = creditCardCollection.findOneAndDelete(Filters.eq("userId", ObjectId(id)))
        val userResult = usersCollection.findOneAndDelete(Filters.eq("_id", ObjectId(id)))

        if (addressResult == null || carResult == null || creditCardResult == null || userResult == null) {
            throw IllegalArgumentException("No se encontró el usuario con el id proporcionado.")
        }
        return@withContext true
    }

    suspend fun deleteAll(): Boolean = withContext(Dispatchers.IO) {
        val addressResult = addressCollection.deleteMany(Document()).wasAcknowledged()
        val carResult = carCollection.deleteMany(Document()).wasAcknowledged()
        val creditCardResult = creditCardCollection.deleteMany(Document()).wasAcknowledged()
        val userResult = usersCollection.deleteMany(Document()).wasAcknowledged()

        if (!addressResult || !carResult || !creditCardResult || !userResult) {
            throw Exception("Error al eliminar los usuarios")
        }

        return@withContext true
    }
}
