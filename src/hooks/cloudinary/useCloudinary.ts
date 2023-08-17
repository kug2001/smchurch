'use client';

import { useContext } from 'react';
import { firebaseContext, FirebaseContext } from '@/provider/FirebaseProvider';
import { AdvancedImage } from '@cloudinary/react';
export const useCloudinary = () => {
  const { cld } = useContext<FirebaseContext>(firebaseContext);
  const getCloudImg = (publicId: string) => {
    return cld.image(publicId);
  };
  return { getCloudImg, AdvancedImage };
};
