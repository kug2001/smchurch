import axios, { AxiosResponse } from 'axios';
import { pipe, values } from 'ramda';
import { useDatabase } from '@/hooks/firebase/useDatabase';

interface ResponseUpload {
  asset_id: string;
  public_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  url: string;
}

export const useHistoryBook = () => {
  const { addDbData, updateDbData, readDbData } = useDatabase();
  // const [imgList, setImgList] = useState<any[]>([]);

  const uploadImg = async (file: File) => {
    const id = Date.now();
    const imageFileName = 'history' + id;
    const formData = new FormData();
    formData.append('file', file, imageFileName);
    formData.append('upload_preset', 'history');

    const uploadRes: AxiosResponse<ResponseUpload> = await axios.post(
      `https://api.cloudinary.com/v1_1/dbh2jshsb/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    const { data } = uploadRes;
    const { public_id } = data;
    return { public_id, id };
  };

  const addHistoryBook = async (title: string, imgList: any[]) => {
    const id = Date.now();
    const dateInstance = new Date(id);
    const year = dateInstance.getFullYear();
    const month = dateInstance.getMonth() + 1;
    const day = dateInstance.getDate();
    const path = 'history';
    const createDate = `${year}-${month}-${day}`;
    return await addDbData(path, {
      title,
      imgList,
      createDate
    });
  };

  const updateHistoryBook = async (
    title: string,
    imgList: any[],
    createDate: string,
    id: string | null
  ) => {
    const path = 'history/' + id;
    return await updateDbData(path, {
      title,
      imgList,
      createDate,
      idx: id
    });
  };

  const getHistoryBook = async () => {
    const snapshot = await readDbData('/history');
    const data = await snapshot.val();
    return pipe(values)(data);
  };

  const getHistoryById = (id: string | null) => async () => {
    const snapshot = await readDbData(`/history/${id}`);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  };

  const deleteHistoryBook = (id: string) => {
    const path = 'history/' + id;
    return updateDbData(path, null);
  };

  return {
    addHistoryBook,
    getHistoryBook,
    deleteHistoryBook,
    updateHistoryBook,
    getHistoryById,
    uploadImg
  };
};
