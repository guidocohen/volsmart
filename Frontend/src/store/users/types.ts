export interface User {
  id: string;
  user_name: string;
  direccion: string;
  auto: string;
  codigo_zip: string;
  geo_latitud: string;
  geo_longitud: string;
  auto_modelo: string;
  auto_tipo: string;
  auto_color: string;
  cuenta_numero: string;
  credit_card_num: string;
  credit_card_ccv: string;
  fec_birthday: string;
  color_favorito: string;
  cantidad_compras_realizadas: string;
}

export interface ErrorState {
  error: boolean;
  errorMessage: string;
}

export interface UsersState {
  usersCount: number;
  isUserDetailOpen: boolean;
  displayedUsers: User[] | null;
  users: User[] | null;
  userToShow?: User;
  searchByNameValue: string;
  isLoadingUsers: boolean;
  error: ErrorState;
}
