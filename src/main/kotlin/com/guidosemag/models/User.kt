package com.guidosemag.models

import com.guidosemag.serializers.LocalDateTimeSerializer
import com.guidosemag.serializers.ObjectIdSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import java.time.LocalDateTime

@Serializable
data class User(
    @Serializable(with = ObjectIdSerializer::class)
    @BsonId
    val id: ObjectId = ObjectId(),
    val userName: String,
    val avatar: String,
    @Serializable(with = LocalDateTimeSerializer::class)
    val fecAlta: LocalDateTime,
    @Serializable(with = LocalDateTimeSerializer::class)
    val fecBirthday: LocalDateTime,
) {
    fun toDocument(): Document = Document.parse(Json.encodeToString(this))

    companion object {
        private val json = Json { ignoreUnknownKeys = true }

        fun fromDocument(document: Document): User = json.decodeFromString(document.toJson())
    }
}