import { pipe, values } from 'ramda';
import { useDatabase } from '@/hooks/firebase/useDatabase';
import axios, { AxiosResponse } from 'axios';
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

export const useTestimony = () => {
  const { addDbData, updateDbData, readDbData } = useDatabase();

  const addTestimony = async (
    name: string,
    job: string,
    testimony: string,
    file: File
  ) => {
    const id = Date.now();
    const path = 'testimony';
    const imageFileName = 'testimony' + id;
    const formData = new FormData();
    formData.append('file', file, imageFileName);
    formData.append('upload_preset', 'testimony');
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
        return addDbData(path, {
          name,
          job,
          testimony,
          publicId: public_id
        });
      });
  };

  const getTestimony = async () => {
    const snapshot = await readDbData('/testimony');
    const data = await snapshot.val();
    return pipe(values)(data);
  };

  const getTestimonyByIdx = (idx: string | null) => async () => {
    const snapshot = await readDbData(`/testimony/${idx}`);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  };

  const deleteTestimony = (id: string) => {
    const path = 'testimony/' + id;
    return updateDbData(path, null);
  };

  const updateTestimony = (
    idx: string,
    params: { name: string; job: string; testimony: string; publicId: string }
  ) => {
    const { name, testimony, publicId, job } = params;
    const path = 'testimony/' + idx;
    return updateDbData(path, {
      idx,
      name,
      job,
      testimony,
      publicId
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
