package com.guidosemag.models

import com.guidosemag.serializers.ObjectIdSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

@Serializable
data class Car(
    @Serializable(with = ObjectIdSerializer::class)
    @BsonId
    val id: ObjectId = ObjectId(),
    @Serializable(with = ObjectIdSerializer::class)
    val userId: ObjectId,
    val originalUserId: String,
    val auto: String,
    @SerialName("auto_modelo")
    val modelo: String,
    @SerialName("auto_tipo")
    val tipo: String,
    @SerialName("auto_color")
    val color: String
)
