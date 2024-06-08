package com.guidosemag.models

import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
//@Document(collection = "users")
data class User(
//    @Id val id: String,
    val id: String,
    val userName: String,
    val avatar: String,
//    val fecAlta: LocalDateTime,
//    val fecBirthday: LocalDateTime,
)