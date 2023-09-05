import { pipe, values } from 'ramda';
import { useDatabase } from '@/hooks/firebase/useDatabase';

export const useBoard = () => {
  const { addDbData, updateDbData, readDbData } = useDatabase();

  const addBoard = (category: string, title: string, contents: string) => {
    const id = Date.now();
    const dateInstance = new Date(id);
    const path = 'board';
    const year = dateInstance.getUTCFullYear();
    const month = dateInstance.getUTCMonth();
    const day = dateInstance.getUTCDay();
    const createDate = `${year}-${month}-${day}`;
    return addDbData(path, {
      category,
      createDate,
      title,
      contents
    });
  };

  const getBoard = async () => {
    const snapshot = await readDbData('/board');
    const data = await snapshot.val();
    return pipe(values)(data);
  };

  const getBoardByIdx = (idx: string | null) => async () => {
    const snapshot = await readDbData(`/board/${idx}`);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  };

  const deleteBoard = (id: string) => {
    const path = 'board/' + id;
    return updateDbData(path, null);
  };

  const updateBoard = (
    idx: string,
    params: {
      title: string;
      contents: string;
      category: string;
      createDate: string;
    }
  ) => {
    const { title, contents, category, createDate } = params;
    const path = 'board/' + idx;
    return updateDbData(path, {
      idx,
      title,
      contents,
      category,
      createDate
    });
  };

  return {
    addBoard,
    getBoard,
    deleteBoard,
    updateBoard,
    getBoardByIdx
  };
};
