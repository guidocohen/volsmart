import axios from 'axios';
import { getEndpoint } from '../../api/getEndpoint';

interface LoginLocalResponse {
  ok: boolean;
  data: any;
}

export const loginLocal = async ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}): Promise<LoginLocalResponse> => {
  if (!userName || !password) {
    throw new Error('No se recibieron los datos necesarios para iniciar sesión.');
  }

  const loginUserLocalUrl = getEndpoint(`login`);
  const resp = await axios.post(loginUserLocalUrl, { userName, password });

  return { ok: resp.status === axios.HttpStatusCode.Ok, data: resp.data };
};
