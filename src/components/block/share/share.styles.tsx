import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface SectionProps {
  bgUrl?: string;
  bgColor?: string;
}

export const mq = `@media (max-width: 768px)`;

export const SectionContainer = styled('div')((props: SectionProps) => {
  const { bgUrl, bgColor } = props;
  return {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '1160px',
    // width: '100%',
    // marginTop: '80px',
    background: bgUrl ? `url(${bgUrl}) no-repeat center` : 'none',
    backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    // backdropFilter: 'blur(1000px)',
    backgroundColor: `${bgColor}`
  };
});

export const SectionContainer2 = styled(motion.section)(
  (props: SectionProps) => {
    const { bgUrl, bgColor } = props;
    return {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      position: 'relative',
      // height: '100vh',
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
  }
);

export const InnerSection = styled('div')`
  padding: 120px 40px;
  max-width: 1024px;
  width: 100%;
  z-index: 1;
  ${mq} {
    padding: 60px 20px;
    &.new_family {
      padding: 60px 0;
    }
  }
`;
