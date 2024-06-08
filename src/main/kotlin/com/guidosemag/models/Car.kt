package com.guidosemag.models

import kotlinx.serialization.Serializable

@Serializable
data class Car(
    val auto: String,
    val autoModelo: String,
    val autoTipo: String,
    val autoColor: String
)
