import styled from '@emotion/styled';
import Image from 'next/image';
import { mq } from '@/components/block/share/share.styles';
export const WorkerContainer = styled('div')`
  //margin-bottom: 120px;
`;

export const WorkerTitle = styled('strong')`
  display: block;
  margin-bottom: 48px;
  padding-bottom: 20px;
  font-size: 46px;
  font-weight: 700;
  color: #5d4251;
  border-bottom: 3px solid #5d4251;
  ${mq} {
    font-size: 30px;
  }
`;

export const PostorImage = styled(Image)`
  margin-right: 40px;
  ${mq} {
    margin-right: 0;
    margin-bottom: 40px;
    font-size: 16px;
  }
`;

export const PastorContainer = styled('div')`
  display: flex;
  justify-content: start;
  ${mq} {
    flex-direction: column;
    align-items: center;
  }
`;

export const PastorInfoBox = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PastorTitle = styled('strong')`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #5d4251;
  ${mq} {
    text-align: center;
    font-size: 16px;
  }
`;

export const PastorEmail = styled('span')`
  ${mq} {
    text-align: center;
    font-size: 14px;
  }
  > a {
    text-decoration: none;
  }
`;

export const HorizonRow = styled('hr')`
  width: 100%;
  height: 2px;
  margin: 20px 0;
  border-width: 0;
  background-color: transparent;
  ${mq} {
    background-color: #5d4251;
  }
`;
export const PastorCareer = styled('ul')`
  padding-left: 30px;
  color: #5d4251;
  font-size: 16px;
  ${mq} {
    padding-left: 20px;
    font-size: 14px;
  }
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
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 30px;
  margin-top: 40px;
  ${mq} {
    grid-column-gap: 5px;
    grid-template-columns: 1fr 3fr;
  }
`;

export const WorkerJob = styled('span')`
  display: inline-block;
  border-bottom: 2px solid #5d4251;
  padding: 15px 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #5d4251;
  ${mq} {
    padding: 20px 5px 10px;
    font-size: 13px;
  }
`;

export const WorkerListBox = styled('div')`
  border-bottom: 2px solid #5d425144;
`;
export const WorkerName = styled('span')`
  display: inline-block;
  padding: 15px 5px;
  font-size: 18px;
  font-weight: 600;
  color: #5d4251;
  ${mq} {
    padding: 20px 4px 10px;
    font-size: 13px;
  }
`;
