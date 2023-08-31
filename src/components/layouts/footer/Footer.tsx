/** @jsxImportSource @emotion/react */
'use client';

import React, { FC } from 'react';
import {
  DocFooter,
  InnerFooter,
  Address,
  TelePhone,
  Copyright
} from './footer.styles';

export const Footer: FC = () => {
  return (
    <DocFooter>
      <InnerFooter>
        <Address>주소 : 제주시 용문로 17길 23-6</Address>
        <TelePhone>Tel : 712-5593 Fax : 712-5592 목사관 : 712-5591</TelePhone>
        <Copyright>
          Copyright © 2023 제주서문교회 All Rights Reserved.
        </Copyright>
      </InnerFooter>
    </DocFooter>
  );
};
