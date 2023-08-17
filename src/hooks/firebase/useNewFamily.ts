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

export const useNewFamily = () => {
  const { writeDbData, readDbData } = useDatabase();

  const addNewFamily = async (name: string, file: File, date: string) => {
    const id = Date.now();
    const path = 'new-family/' + 'new_' + id;
    const imageFileName = 'new-family' + id;
    const formData = new FormData();
    formData.append('file', file, imageFileName);
    formData.append('upload_preset', 'newFamily');

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
        return writeDbData(path, {
          idx: id,
          name,
          date,
          publicId: public_id
        });
      });
  };

  const getNewFamily = async () => {
    const snapshot = await readDbData('/new-family');
    const data = await snapshot.val();
    const newFamily = await pipe(values)(data);
    return newFamily;
  };

  const deleteNewFamily = (id: string) => {
    const path = 'new-family/' + 'new_' + id;
    return writeDbData(path, null);
  };

  const updateNewFamily = (
    id: string,
    params: { name: string; date: string; publicId: string }
  ) => {
    const { name, date, publicId } = params;
    const path = 'new-family/' + 'new_' + id;
    return writeDbData(path, {
      idx: id,
      name,
      date,
      publicId
    });
  };

  return {
    addNewFamily,
    getNewFamily,
    deleteNewFamily,
    updateNewFamily
  };
};
