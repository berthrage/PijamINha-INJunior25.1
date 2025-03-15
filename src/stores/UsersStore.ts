import { create } from 'zustand';
import api from '../services/api';
import User from '../types/User';
import UserValidation from '../types/UserValidation';

interface UsersStore {
    users: User[];
    errorCode: number | null;
    isFetching: boolean;
    fetchUsers: () => Promise<void>;
    createUser: (user: User) => Promise<void>;
    validateUser: (user: UserValidation) => Promise<boolean>; // Return boolean
}

const useUsersStore = create<UsersStore>((set: any, get: any) => ({
  users: [],
  errorCode: null,
  isFetching: false,

  fetchUsers: async () => {
    if (get().users.length > 0 || get().isFetching) return; // Avoid refetch if already fetched or fetching

    set({ isFetching: true });

    try {
      const response = await api.get('/users');
      console.log(response.data);
      set({ users: response.data, errorCode: null });

    } catch (error) {
        const err : any = error; 
        console.error('Requisição da API falhou:', err);
        set({ errorCode: err.response?.status || 500 });
        setTimeout(() => {
            console.log('Tentando novamente...');
            set({ users: [] }); 
            get().fetchUsers(); 
        }, 5000);

    } finally {
      set({ isFetching: false });
    }
  },

  createUser: async (user: User) => {
    try {
      await api.post(`/users`, user);
      set((state: UsersStore) => ({
        users: state.users.concat(user),
      }));
    } catch (error) {
      console.error('Failed to create user status:', error);
    }
  },

  validateUser: async (user: UserValidation) => {
    try {
      await api.post(`/authenticate`, user);
      console.log('Usuário validado com sucesso!');
      return true; // Return true if validation is successful
    } catch (error) {
      console.error('Falha na autenticação do usuário.', error);
      return false; // Return false if validation fails
    }
  },
}));

export default useUsersStore;