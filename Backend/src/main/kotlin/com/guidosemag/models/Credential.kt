package com.guidosemag.models

import com.guidosemag.serializers.ObjectIdSerializer
import kotlinx.serialization.Serializable
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.mindrot.jbcrypt.BCrypt

@Serializable
data class Credential(
    @Serializable(with = ObjectIdSerializer::class)
    @BsonId
    val id: ObjectId = ObjectId(),
    val userName: String,
    var password: String
) {
    fun encrypt(data: String) {
        password = BCrypt.hashpw(data, BCrypt.gensalt())
    }

    fun checkPassword(input: String): Boolean {
        return BCrypt.checkpw(input, password)
    }
}
