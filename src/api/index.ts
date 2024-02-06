import axios from 'axios';
import { LoginSchema, RegisterSchema } from '../utils/schemas';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/sign-in';
          break;
        case 400:
          window.location.href = '/400';
          break;
        case 404:
          window.location.href = '/auth/main';
          break;
        case 500:
          window.location.href = '/500';
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

const generateHeaders = () => {
  const token = localStorage.getItem('userToken');
  return {
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Private-Network': true,
  };
};

export const loginUser = ({ email, password }: LoginSchema) =>
  api.post('/auth/login', { email, password });

export const registerUser = ({
  email,
  password,
  firstName,
  lastName,
}: Omit<RegisterSchema, 'passwordConfirmation'>) =>
  api.post('/user', { email, password, firstName, lastName });

export const getUser = () => api.get('/user', { headers: generateHeaders() });

export const updateUser = (payload: any) =>
  api.patch('/user', payload, { headers: generateHeaders() });

export const inviteUser = (payload: string) =>
  api.post(`/invite`, { email: payload }, { headers: generateHeaders() });

// Workspaces

export const getWorkspaces = () => api.get('/workspaces', { headers: generateHeaders() });

export const getWorkspace = (workspaceId: string) =>
  api.get(`/workspaces/${workspaceId}`, { headers: generateHeaders() });

export const createWorkspace = (payload: any) =>
  api.post('/workspaces', payload, { headers: generateHeaders() });

export const updateWorkspace = ({ id, payload }: { id: string; payload: any }) =>
  api.patch(`/workspaces/${id}`, payload, { headers: generateHeaders() });

export const deleteWorkspace = (id: string) =>
  api.delete(`/workspaces/${id}`, { headers: generateHeaders() });

// Boards

export const getBoards = () => api.get('/boards', { headers: generateHeaders() });

export const getBoard = (id: string) => api.get(`/boards/${id}`, { headers: generateHeaders() });

export const createBoard = (payload: any) =>
  api.post('/boards', payload, { headers: generateHeaders() });

export const updateBoard = ({ id, payload }: { id: string; payload: any }) =>
  api.patch(`/boards/${id}`, payload, { headers: generateHeaders() });

export const deleteBoard = (id: string) =>
  api.delete(`/boards/${id}`, { headers: generateHeaders() });

// Lists

export const createList = (payload: any) =>
  api.post('/lists', payload, { headers: generateHeaders() });

export const updateList = ({ id, payload }: { id: string; payload: any }) =>
  api.patch(`/lists/${id}`, payload, { headers: generateHeaders() });

export const deleteList = (id: string) =>
  api.delete(`/lists/${id}`, { headers: generateHeaders() });

// Cards

export const getCard = (id: string) => api.get(`/cards/${id}`, { headers: generateHeaders() });

export const createCard = (payload: any) =>
  api.post('/cards', payload, { headers: generateHeaders() });

export const updateCard = ({ id, payload }: { id: string; payload: any }) =>
  api.patch(`/cards/${id}`, payload, { headers: generateHeaders() });

export const deleteCard = (id: string) =>
  api.delete(`/cards/${id}`, { headers: generateHeaders() });

//  Files

export const uploadCardFiles = (id: string, file: any) => {
  const formData = new FormData();
  formData.append('media', file);

  return api.post(`/files/card/${id}`, formData, { headers: generateHeaders() });
};

export const deleteCardFile = (id: string, payload: any) =>
  api.patch(`/files/card/${id}/delete`, payload, { headers: generateHeaders() });

//  Wrapper

export const updateCardWrapper = (cardId: string, payload: any) =>
  api.patch(`/wrapper/card/${cardId}`, payload, { headers: generateHeaders() });
