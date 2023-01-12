import { Env } from "../env/Env";
import { IDescription } from "./AppData";
import IApiResult from "./IApiResponse";

export interface INewProject {
  name: string,
  shortDescriptions: IDescription[],
  longDescriptions: IDescription[],
  technologies: string[],
  site: string,
  source: string,
  favoriteLevel: number
}

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

async function submitProject(project: INewProject): Promise<IApiResult> {
  const token = getToken();
  if (token == null) return {
    message: 'Not logged in.',
    errorCode: 1
  };
  const url = Env.PROJECTS_URL + '/api/projects';
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);
  try {
    const response: Response = await fetch(
      url,
      {
        signal: controller.signal,
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    clearTimeout(id);
    if (response.status !== 200) return {
      message: 'Failed to upload project',
      errorCode: 1
    };
    return {
      message: 'Uploaded successfully',
      errorCode: 0
    };
  }
  catch {
    return {
      message: 'Could not connect to server.',
      errorCode: 1
    }
  }
}

function getToken(): string | null {
  return window.localStorage.getItem("SESSION_TOKEN");
}

export default {
  isTokenValid,
  fetchToken,
  submitProject
}