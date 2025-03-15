import { create } from 'zustand';
import api from '../services/api';
import Feedback from '../types/Feedback';

interface FeedbacksStore {
    feedbacks: Feedback[];
    errorCode: number | null;
    isFetching: boolean;
    fetchFeedbacks: () => Promise<void>;
    createFeedback: (feedback: Feedback) => Promise<void>;
}

const useFeedbacksStore = create<FeedbacksStore>((set: any, get: any) => ({
  feedbacks: [],
  errorCode: null,
  isFetching: false,

  fetchFeedbacks: async () => {
    if (get().feedbacks.length > 0 || get().isFetching) return; // Avoid refetch if already fetched or fetching

    set({ isFetching: true });

    try {
      const response = await api.get('/feedbacks');
      console.log(response.data);
      set({ feedbacks: response.data, errorCode: null });

    } catch (error) {
        const err : any = error; 
        console.error('Requisição da API falhou:', err);
        set({ errorCode: err.response?.status || 500 });
        setTimeout(() => {
            console.log('Tentando novamente...');
            set({ feedbacks: [] }); 
            get().fetchfeedbacks(); 
        }, 5000);

    } finally {
      set({ isFetching: false });
    }
  },

  createFeedback: async (feedback: Feedback) => {
    try {

      await api.post(`/feedbacks`, feedback);
      set((state: FeedbacksStore) => ({
        feedbacks: state.feedbacks.concat(feedback),
      }));
    } catch (error) {
      console.error('Failed to create feedback status:', error);
    }
  },
}));

export default useFeedbacksStore;