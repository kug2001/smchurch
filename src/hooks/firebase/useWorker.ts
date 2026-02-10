import { pipe, values } from 'ramda';
import { useDatabase } from '@/hooks/firebase/useDatabase';

export interface WorkerGroup {
  idx: string;
  job: string;
  workers: string;
  order: number;
}

export const useWorker = () => {
  const { addDbData, updateDbData, readDbData } = useDatabase();

  const addWorker = async (job: string, workers: string, order: number) => {
    return addDbData('worker', { job, workers, order });
  };

  const getWorker = async () => {
    const snapshot = await readDbData('/worker');
    const data = await snapshot.val();
    if (!data) return [];
    const list: WorkerGroup[] = pipe(values)(data);
    return list.sort((a, b) => a.order - b.order);
  };

  const getWorkerByIdx = (idx: string | null) => async () => {
    const snapshot = await readDbData(`/worker/${idx}`);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  };

  const deleteWorker = (id: string) => {
    const path = 'worker/' + id;
    return updateDbData(path, null);
  };

  const updateWorker = (
    idx: string,
    params: { job: string; workers: string; order: number }
  ) => {
    const { job, workers, order } = params;
    const path = 'worker/' + idx;
    return updateDbData(path, { idx, job, workers, order });
  };

  return {
    addWorker,
    getWorker,
    getWorkerByIdx,
    deleteWorker,
    updateWorker
  };
};
