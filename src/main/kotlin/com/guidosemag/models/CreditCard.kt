package com.guidosemag.models

import kotlinx.serialization.Serializable

@Serializable
data class CreditCard(
    val creditCardNum: String,
    val creditCardCcv: String
)