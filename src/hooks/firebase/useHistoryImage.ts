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

export const useHistoryImage = () => {
  const { addDbData, updateDbData, readDbData } = useDatabase();

  const addHistoryImage = async (title: string, file: File) => {
    const id = Date.now();
    const path = 'history';
    const imageFileName = 'history' + id;
    const formData = new FormData();
    formData.append('file', file, imageFileName);
    formData.append('upload_preset', 'history');

    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/dbh2jshsb/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then((uploadRes: AxiosResponse<ResponseUpload>) => {
        const { data } = uploadRes;
        const { public_id } = data;
        // console.log('res', uploadRes);
        return addDbData(path, {
          title,
          publicId: public_id,
          createDate: id
        });
      });
  };

  const getHistoryImage = async () => {
    const snapshot = await readDbData('/history');
    const data = await snapshot.val();
    return pipe(values)(data);
  };

  const deleteHistoryImage = (id: string) => {
    const path = 'history/' + id;
    return updateDbData(path, null);
  };

  return {
    addHistoryImage,
    getHistoryImage,
    deleteHistoryImage
  };
};
