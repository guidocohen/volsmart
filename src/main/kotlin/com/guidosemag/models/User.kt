package com.guidosemag.models

import com.guidosemag.dtos.UserDto
import com.guidosemag.serializers.ObjectIdSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

@Serializable
data class User(
    @Serializable(with = ObjectIdSerializer::class)
    @BsonId
    val id: ObjectId = ObjectId(),
    val userId: String,
    @SerialName("user_name")
    val userName: String,
    val avatar: String,
    @SerialName("fec_alta")
    val fecAlta: String,
    @SerialName("fec_birthday")
    val fecBirthday: String,
    @SerialName("color_favorito")
    val colorFavorito: String,
    @SerialName("foto_dni")
    val fotoDni: String,
    val ip: String,
    val cantidadComprasRealizadas: Int,
) {
    fun toDocument(): Document = Document.parse(Json.encodeToString(this))

    companion object {
        private val json = Json { ignoreUnknownKeys = true }

        fun fromDocument(document: Document): User = json.decodeFromString(document.toJson())
    }

    fun toUserDto(address: Address?, creditCard: CreditCard?, car: Car?): UserDto = UserDto(
        id = this.userId,
        userName = this.userName,
        avatar = this.avatar,
        fecAlta = this.fecAlta,
        fecBirthday = this.fecBirthday,
        fotoDni = this.fotoDni,
        colorFavorito = this.colorFavorito,
        ip = this.ip,
        cantidadComprasRealizadas = this.cantidadComprasRealizadas,
        codigoZip = address?.codigoZip ?: "",
        direccion = address?.direccion ?: "",
        geoLatitud = address?.geoLatitud ?: "",
        geoLongitud = address?.geoLongitud ?: "",
        cuentaNumero = creditCard?.cuentaNumero ?: "",
        creditCardNum = creditCard?.creditCardNum ?: "",
        creditCardCcv = creditCard?.creditCardCcv ?: "",
        auto = car?.auto ?: "",
        autoModelo = car?.modelo ?: "",
        autoTipo = car?.tipo ?: "",
        autoColor = car?.color ?: "",
    )
}