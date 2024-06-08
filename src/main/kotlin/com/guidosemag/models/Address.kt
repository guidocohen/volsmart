package com.guidosemag.models

import kotlinx.serialization.Serializable

@Serializable
data class Address(
    val codigoZip: String,
    val direccion: String,
    val geoLatitud: String,
    val geoLongitud: String
)
