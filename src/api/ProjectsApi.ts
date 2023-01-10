import { Env } from "../env/Env";
import IApiResult from "./IApiResponse";

async function fetchToken(password: string | null): Promise<IApiResult> {
  if (password == null || password === '') {
    return {
      message: 'Password cannot be empty',
      errorCode: 1
    };
  }
  const url = Env.PROJECTS_URL + '/api/session';
  try {
    let response: Response = await fetch(
      url, {
        method: 'GET',
        headers: {
          'Authorization': password
        }
      });
    if (response.status === 401) {
      return {
        message: 'Password is incorrect.',
        errorCode: 1
      };
    }
    if (response.status !== 200) {
      return {
        message: 'Something unexpected went wrong.',
        errorCode: 1
      };
    }
    try {
      const token: { token: string } = await response.json();
      return {
        message: token.token,
        errorCode: 0
      }
    }
    catch {
      return {
        message: 'Received unexpected format.',
        errorCode: 1
      }
    }
  }
  catch {
    return {
      message: 'Unable to connect to server',
      errorCode: 1
    };
  }
}

async function isTokenValid(token: string | null): Promise<boolean> {
  if (token == null) return false;
  const url = Env.PROJECTS_URL + "/api/session";
  try {
    let response: Response = await fetch(
      url, {
        method: 'POST',
        headers: {
          'Authorization': token
        }
      });
    if (response.status !== 200) {
      return false;
    }
    return true;
  }
  catch
  {
    console.log('Could not connect to server.');
    return false;
  }
  
}

export default {
  isTokenValid,
  fetchToken
}