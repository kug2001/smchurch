import { pipe, values } from 'ramda';
import { useDatabase } from '@/hooks/firebase/useDatabase';

export const useBoard = () => {
  const { addDbData, updateDbData, readDbData, paginationDbData } =
    useDatabase();

  const addBoard = (category: string, title: string, contents: string) => {
    const id = Date.now();
    const dateInstance = new Date(id);
    const path = 'board';
    const year = dateInstance.getFullYear();
    const month = dateInstance.getMonth() + 1;
    const day = dateInstance.getDate();

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
    // @ts-ignore
    return pipe(values, list => list.reverse())(data);
  };

  const getBoardPagination = async (id: string, pagePerItem: number) => {
    const snapshot = await paginationDbData('/board', id, pagePerItem);
    const data = await snapshot.val();
    console.log(values(data));
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
    getBoardByIdx,
    getBoardPagination
  };
};
