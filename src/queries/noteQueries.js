import axios from 'axios';
import { Firebase } from '../firebase/firebase';
import { useQuery } from 'react-query';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const useNotes = () => {
  return useQuery(
    'notes',
    async () => {
      const token = await Firebase.auth().currentUser.getIdToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get('/api/notes/', config);

      return data;
    },
    { refetchOnWindowFocus: false }
  );
};
