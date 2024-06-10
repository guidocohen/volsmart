import axios, { HttpStatusCode } from 'axios';
import { getEndpoint } from '../getEndpoint';

interface GetUsersParams {
  jwt: string | null;
}

interface GetUsersResponse {
  ok: boolean;
  data: any;
  status: number;
}

export const getUsers = async ({ jwt }: GetUsersParams): Promise<GetUsersResponse> => {
  const usersUrl = getEndpoint(`users`);

  const resp = await axios.get(usersUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return { ok: resp.status === HttpStatusCode.Ok, data: resp.data, status: resp.status };
};

export const postSyncUsers = async ({
  jwt,
}: GetUsersParams): Promise<GetUsersResponse> => {
  const usersSyncUrl = getEndpoint(`users/sync`);

  const resp = await axios.post(
    usersSyncUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return {
    ok: resp.status === HttpStatusCode.Ok,
    data: resp.data,
    status: resp.status,
  };
};
