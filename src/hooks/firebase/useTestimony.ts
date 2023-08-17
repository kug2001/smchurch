import { pipe, values } from 'ramda';
import { useDatabase } from '@/hooks/firebase/useDatabase';

export const useTestimony = () => {
  const { writeDbData, readDbData } = useDatabase();

  const addTestimony = (
    name: string,
    job: string,
    testimony: string,
    imageUrl: string
  ) => {
    const id = Date.now();
    const path = 'testimony/' + 'tes_' + id;
    return writeDbData(path, {
      idx: id,
      name,
      job,
      testimony,
      imageUrl
    });
  };

  const getTestimony = async () => {
    const snapshot = await readDbData('/testimony');
    const data = await snapshot.val();
    return pipe(values)(data);
  };

  const getTestimonyByIdx = (idx: string | null) => async () => {
    const snapshot = await readDbData(`/testimony/tes_${idx}`);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  };

  const deleteTestimony = (id: string) => {
    const path = 'testimony/' + 'tes_' + id;
    return writeDbData(path, null);
  };

  const updateTestimony = (
    idx: string,
    params: { name: string; job: string; testimony: string; imageUrl: string }
  ) => {
    const { name, testimony, imageUrl, job } = params;
    const path = 'testimony/' + 'tes_' + idx;
    return writeDbData(path, {
      idx,
      name,
      job,
      testimony,
      imageUrl
    });
  };

  return {
    addTestimony,
    getTestimony,
    deleteTestimony,
    updateTestimony,
    getTestimonyByIdx
  };
};
