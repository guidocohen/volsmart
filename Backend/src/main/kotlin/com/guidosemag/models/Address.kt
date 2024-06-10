package com.guidosemag.models

import com.guidosemag.serializers.ObjectIdSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

@Serializable
data class Address(
    @Serializable(with = ObjectIdSerializer::class)
    @BsonId
    val id: ObjectId = ObjectId(),
    @Serializable(with = ObjectIdSerializer::class)
    val userId: ObjectId,
    val originalUserId: String,
    @SerialName("codigo_zip")
    val codigoZip: String,
    val direccion: String,
    @SerialName("geo_latitud")
    val geoLatitud: String,
    @SerialName("geo_longitud")
    val geoLongitud: String
)
