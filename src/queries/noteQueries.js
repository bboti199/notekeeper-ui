import axios from 'axios';
import { Firebase } from '../firebase/firebase';
import { useQuery } from 'react-query';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const getAuthHeader = async () => {
  const token = await Firebase.auth().currentUser.getIdToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};

export const useNotes = () => {
  return useQuery(
    'notes',
    async () => {
      const config = await getAuthHeader();

      const { data } = await axios.get('/api/notes/', config);

      return data;
    },
    { refetchOnWindowFocus: false }
  );
};

const getNoteById = async (key, id) => {
  const config = await getAuthHeader();

  const { data } = await axios.get(`/api/notes/${id}`, config);

  return data;
};

export const useNote = (noteId) => {
  return useQuery(['note', noteId], getNoteById, {
    enabled: noteId,
  });
};
