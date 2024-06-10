package com.guidosemag.models

import com.guidosemag.serializers.ObjectIdSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId
import org.mindrot.jbcrypt.BCrypt

@Serializable
data class CreditCard(
    @Serializable(with = ObjectIdSerializer::class)
    @BsonId
    val id: ObjectId = ObjectId(),
    @Serializable(with = ObjectIdSerializer::class)
    val userId: ObjectId,
    val originalUserId: String,
    @SerialName("cuenta_numero")
    var cuentaNumero: String,
    @SerialName("credit_card_num")
    var creditCardNum: String,
    @SerialName("credit_card_ccv")
    var creditCardCcv: String
) {
    init {
        cuentaNumero = mask(this.cuentaNumero)
        creditCardNum = mask(this.creditCardNum)
        creditCardCcv = mask(this.creditCardCcv)
    }

    private fun mask(data: String): String {
        return if (data.length > 4) {
            "****" + data.takeLast(4)
        } else {
            "****"
        }
    }
}