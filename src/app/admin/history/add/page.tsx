'use client';
import {
  AddBtn,
  Description,
  FieldBox,
  FormContainer,
  InnerContainer,
  Label,
  SubmitBtn,
  TextField,
  Title
} from '@/app/admin/styles';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useState } from 'react';
import { useHistoryBook } from '@/hooks/firebase/useHistoryBook';
import { BookImg, BookImgContainer } from '@/app/admin/history/styles';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';

export default function HistoryBookAddPage() {
  const route = useRouter();
  const { addHistoryBook, uploadImg } = useHistoryBook();
  const { getCloudImg } = useCloudinary();
  const [file, setFile] = useState(null);
  const [imgList, setImgList] = useState<any[]>([]);
  const handleNewFamily = () => route.back();

  const handleFileChange = async (e: BaseSyntheticEvent) => {
    // console.log('imageFile', e.target.files[0]);
    const imgInfo = await uploadImg(e.target.files[0]);
    setImgList(prevState => {
      return [...prevState, { ...imgInfo }];
    });
  };

  const handleOnSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { value: title } = e.currentTarget.title;
    try {
      await addHistoryBook(title, imgList);
      route.push('/admin/history');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InnerContainer>
      <Title>
        엘범에 사진을 추가
        <AddBtn onClick={handleNewFamily}>엘범 현황</AddBtn>
      </Title>
      <Description>엘범에 새로운 사진을 등록합니다.</Description>
      <FieldBox>
        <Label htmlFor="imageFile">사진 업로드</Label>
        <TextField
          id="imageFile"
          name="imageFile"
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
        />
      </FieldBox>
      <BookImgContainer>
        {imgList.length > 0 &&
          imgList.map((item, index) => (
            <BookImg
              key={index}
              cldImg={getCloudImg(item.public_id)}
              width={200}
              height={150}
            />
          ))}
      </BookImgContainer>
      <FormContainer onSubmit={e => handleOnSubmit(e)}>
        <FieldBox>
          <Label htmlFor="title">사진 타이틀</Label>
          <TextField id="title" name="title" type="text" required={true} />
        </FieldBox>
        <SubmitBtn>엘범 등록하기</SubmitBtn>
      </FormContainer>
    </InnerContainer>
  );
}
