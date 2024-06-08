package com.guidosemag.dtos

import com.guidosemag.models.User
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.bson.Document
import org.bson.types.ObjectId
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId

@Serializable
data class UpdateUserDto(
    val userName: String?,
    val avatar: String?,
    val fecAlta: String?,
    val fecBirthday: String?
) {
    fun toDocument(): Document = Document.parse(Json.encodeToString(this))

    companion object {
        fun fromDocument(doc: Document): User {
            return User(
                id = ObjectId(),
                userName = doc.getString("userName"),
                avatar = doc.getString("avatar"),
                fecAlta = LocalDateTime.ofInstant(
                    Instant.parse(doc.getString("fecAlta")), ZoneId.systemDefault()
                ),
                fecBirthday = LocalDateTime.ofInstant(
                    Instant.parse(doc.getString("fecBirthday")), ZoneId.systemDefault()
                ),
            )
        }
    }
}