import { create } from 'zustand';
import api from '../services/api';
import Pajama from '../types/Pajama'

interface PajamasStore {
    pajamas: Pajama[];
    errorCode: number | null;
    isFetching: boolean;
    fetchPajamas: () => Promise<void>;
}

const usePajamasStore = create<PajamasStore>((set: any, get: any) => ({
  pajamas: [],
  errorCode: null,
  isFetching: false,

  fetchPajamas: async () => {
    if (get().pajamas.length > 0 || get().isFetching) return; // Avoid refetch if already fetched or fetching

    set({ isFetching: true });

    try {
      const response = await api.get('/pajamas/');
      console.log(response.data);
      set({ pajamas: response.data, errorCode: null });

    } catch (error) {
        const err : any = error; 
        console.error('Requisição da API falhou:', err.response);
        set({ errorCode: err.response?.status || 500 });
        setTimeout(() => {
            console.log('Tentando novamente...');
            set({ pajamas: [] }); // Reset books for retry
            get().fetchPajamas(); // Retry 
        }, 5000);

    } finally {
      set({ isFetching: false });
    }
  },
}));

export default usePajamasStore;