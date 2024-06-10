import axios from 'axios';
import { getEndpoint } from '../../api/getEndpoint';

export const registerUser = async ({ userName, password }) => {
  try {
    const registerUserUrl = getEndpoint(`register`);
    const resp = await axios.post(registerUserUrl, { userName, password });

    return { ok: resp.status === axios.HttpStatusCode.Created, data: resp.data };
  } catch (error) {
    // console.warn(error);
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
