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
    height: '100vh',
    // marginTop: '80px',
    background: bgUrl ? `url(${bgUrl}) no-repeat center` : 'none',
    backgroundSize: 'cover',
    backgroundColor: `${bgColor}`
  };
});

export const SectionContainer2 = styled('section')((props: SectionProps) => {
  const { bgUrl, bgColor } = props;
  return {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    height: '100vh',
    // marginTop: '80px',
    backgroundColor: `${bgColor}`,
    background: bgUrl ? `url(${bgUrl}) no-repeat top` : 'none',
    backgroundSize: 'cover',
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#00000066',
      content: '""'
    }
  };
});

export const InnerSection = styled('div')`
  padding: 150px 40px;
  max-width: 1280px;
  width: 100%;
  z-index: 1;
`;
