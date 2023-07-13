import styled from '@emotion/styled';

interface SectionProps {
  bgUrl?: string;
  bgColor?: string;
}

export const SectionContainer = styled('section')((props: SectionProps) => {
  const { bgUrl, bgColor } = props;
  return {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    background: bgUrl ? `url(${bgUrl}) center no-repeat` : 'none',
    backgroundColor: `${bgColor}`
  };
});

export const InnerSection = styled('div')`
  padding: 150px 40px;
  max-width: 1280px;
  width: 100%;
`;
