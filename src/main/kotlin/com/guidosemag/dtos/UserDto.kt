package com.guidosemag.dtos

import com.guidosemag.models.Address
import com.guidosemag.models.Car
import com.guidosemag.models.CreditCard
import com.guidosemag.models.User
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId

@Serializable
data class UserDto(
    val id: String,
    @SerialName("user_name")
    val userName: String,
    val avatar: String,
    @SerialName("fec_alta")
    val fecAlta: String,
    @SerialName("fec_birthday")
    val fecBirthday: String,
    @SerialName("foto_dni")
    val fotoDni: String,
    @SerialName("color_favorito")
    val colorFavorito: String,
    val ip: String,
    @SerialName("codigo_zip")
    val codigoZip: String,
    val direccion: String,
    @SerialName("geo_latitud")
    val geoLatitud: String,
    @SerialName("geo_longitud")
    val geoLongitud: String,
    @SerialName("cuenta_numero")
    val cuentaNumero: String,
    @SerialName("credit_card_num")
    val creditCardNum: String,
    @SerialName("credit_card_ccv")
    val creditCardCcv: String,
    val auto: String,
    @SerialName("auto_modelo")
    val autoModelo: String,
    @SerialName("auto_tipo")
    val autoTipo: String,
    @SerialName("auto_color")
    val autoColor: String,
    @SerialName("cantidad_compras_realizadas")
    val cantidadComprasRealizadas: Int,
) {
    fun toUser(): User {
        return User(
            userId = this.id,
            userName = this.userName,
            avatar = this.avatar,
            fecAlta = this.fecAlta,
            fecBirthday = this.fecBirthday,
            fotoDni = this.fotoDni,
            colorFavorito = this.colorFavorito,
            ip = this.ip,
            cantidadComprasRealizadas = this.cantidadComprasRealizadas
        )
    }

    fun toAddress(id: ObjectId): Address {
        return Address(
            userId= id,
            originalUserId = this.id,
            codigoZip = this.codigoZip,
            direccion = this.direccion,
            geoLatitud = this.geoLatitud,
            geoLongitud = this.geoLongitud
        )
    }

    fun toCar(id: ObjectId): Car {
        return Car(
            userId = id,
            originalUserId = this.id,
            auto = this.auto,
            modelo = this.autoModelo,
            tipo = this.autoTipo,
            color = this.autoColor,
        )
    }
    fun toCreditCard(id: ObjectId): CreditCard {
        return CreditCard(
            userId = id,
            originalUserId = this.id,
            cuentaNumero = this.cuentaNumero,
            creditCardNum = this.creditCardNum,
            creditCardCcv = this.creditCardCcv
        )
    }
}