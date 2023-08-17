import styled from '@emotion/styled';
import Image from 'next/image';

export const WorkerContainer = styled('div')`
  //margin-bottom: 120px;
`;

export const WorkerTitle = styled('strong')`
  display: block;
  margin-bottom: 40px;
  font-size: 70px;
  font-weight: 700;
  color: #5d4251;
`;

export const PostorImage = styled(Image)`
  margin-right: 40px;
`;

export const PastorContainer = styled('div')`
  display: flex;
  justify-content: start;
`;

export const PastorInfoBox = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PastorTitle = styled('strong')`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
  color: #5d4251;
`;

export const PastorEmail = styled('span')``;

export const HorizonRow = styled('hr')`
  width: 100%;
  height: 2px;
  margin: 30px 0;
  border-width: 0;
  background: #5d4251;
`;
export const PastorCareer = styled('ul')`
  padding-left: 30px;
  color: #5d4251;
  font-size: 18px;
  & li {
    list-style-type: disc;
    list-style-position: outside;
  }
  & li + li {
    margin-top: 20px;
  }
`;

export const WorkerInfoContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 30px;
  margin-top: 40px;
`;

export const WorkerJob = styled('span')`
  display: inline-block;
  border-bottom: 3px solid #5d4251;
  padding: 15px 20px;
  font-size: 24px;
  color: #5d4251;
`;

export const WorkerListBox = styled('div')`
  border-bottom: 2px solid #5d425144;
`;
export const WorkerName = styled('span')`
  display: inline-block;
  padding: 15px 5px;
  font-size: 24px;
  color: #5d4251;
`;
