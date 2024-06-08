package com.guidosemag.models

import kotlinx.serialization.Serializable

@Serializable
data class Order(
    val cantidadComprasRealizadas: Int
)