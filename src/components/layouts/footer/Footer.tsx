/** @jsxImportSource @emotion/react */
'use client';

import React, { FC } from 'react';
import {
  DocFooter,
  InnerFooter,
  Address,
  Copyright,
  PhoneNumber
} from './footer.styles';

export const Footer: FC = () => {
  return (
    <DocFooter>
      <InnerFooter>
        <Address>주소 : 제주시 용문로 17길 23-6</Address>
        <PhoneNumber>Tel : (064)712-5593</PhoneNumber>
        <PhoneNumber>Fax : (064)712-5592</PhoneNumber>
        <PhoneNumber>목사관 : (064)712-5591</PhoneNumber>
        <Copyright>
          Copyright © 2023 제주서문교회 All Rights Reserved.
        </Copyright>
      </InnerFooter>
    </DocFooter>
  );
};
