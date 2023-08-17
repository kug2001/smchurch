import { pipe, values } from 'ramda';
import { useDatabase } from '@/hooks/firebase/useDatabase';

export const useBoard = () => {
  const { writeDbData, readDbData } = useDatabase();

  const addBoard = (category: string, title: string, contents: string) => {
    const id = Date.now();
    const dateInstance = new Date(id);
    const path = 'board/' + 'content_' + id;
    const year = dateInstance.getUTCFullYear();
    const month = dateInstance.getUTCMonth();
    const day = dateInstance.getUTCDay();
    const createDate = `${year}-${month}-${day}`;
    return writeDbData(path, {
      idx: id,
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
    const snapshot = await readDbData(`/board/content_${idx}`);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  };

  const deleteBoard = (id: string) => {
    const path = 'board/' + 'content_' + id;
    return writeDbData(path, null);
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
    const path = 'board/' + 'content_' + idx;
    return writeDbData(path, {
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
