package com.guidosemag.models

import com.guidosemag.serializers.ObjectIdSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

@Serializable
data class CreditCard(
    @Serializable(with = ObjectIdSerializer::class)
    @BsonId
    val id: ObjectId = ObjectId(),
    @Serializable(with = ObjectIdSerializer::class)
    val userId: ObjectId,
    val originalUserId: String,
    @SerialName("cuenta_numero")
    val cuentaNumero: String,
    @SerialName("credit_card_num")
    val creditCardNum: String,
    @SerialName("credit_card_ccv")
    val creditCardCcv: String
)