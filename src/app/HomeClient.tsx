'use client';

import React, { useRef } from 'react';
import { useModal } from '@/components/provider/ModalProvider';
import { useTestimony } from '@/hooks/firebase/useTestimony';
import { useCloudinary } from '@/hooks/cloudinary/useCloudinary';
import useSWR from 'swr';
import { TestimonyPerson } from '@/app/admin/testimony/page';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import { AdvancedImage } from '@cloudinary/react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';

interface PopUpInfo {
  name: string;
  job: string;
  htmlContent: string;
}

export default function HomeClient() {
  const { handleOpenModal } = useModal();
  const { getTestimony } = useTestimony();
  const { getCloudImg } = useCloudinary();
  const testimonyRef = useRef(null);
  const { data, isLoading } = useSWR<TestimonyPerson[]>(
    'testimony',
    getTestimony
  );

  const handleOnClick = (props: PopUpInfo) => {
    const { job, name, htmlContent } = props;
    handleOpenModal({ name, job, htmlContent });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  const handleGoToTestimony = () => {
    // @ts-ignore
    testimonyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <LocalLoader isLoading={isLoading}>
      {/* Cover Section */}
      <div className="relative">
        <div
          className="flex justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/img/cover_bg_2026.jpeg')",
            backgroundColor: '#ffffff11',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="relative flex h-[50vh] w-full items-end justify-center pb-12 md:h-[90vh] md:pb-20">
            <motion.button
              onClick={handleGoToTestimony}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-1.5 rounded-full bg-white/90 px-6 py-3 text-sm font-bold text-zinc-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl md:px-8 md:py-3.5 md:text-base"
            >
              간증보기
              <ChevronDown className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Testimony Section */}
      <div className="relative bg-zinc-50" ref={testimonyRef}>
        <div className="mx-auto w-full max-w-[1024px] px-5 py-16 md:px-10 md:py-24">
          <div className="mb-4 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Testimony
            </p>
            <h3 className="text-2xl font-bold text-foreground md:text-4xl">
              제주서문교회 가족을 소개합니다
            </h3>
            <Separator className="mx-auto mt-6 max-w-[60px] bg-primary/40" />
          </div>

          <div className="flex justify-center py-12 md:py-16">
            <motion.ul
              className="grid grid-cols-[repeat(6,50px)] gap-[3px] place-items-center md:grid-cols-[repeat(10,100px)] lg:grid-cols-[repeat(10,100px)]"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ gridColumnGap: '3px', gridRowGap: '3px' }}
            >
              {data?.map(({ idx, name, job, publicId, testimony }) => (
                <motion.li
                  key={idx}
                  variants={item}
                  className="group relative text-[0px]"
                >
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative block overflow-hidden rounded-md p-0 text-[0px] shadow-sm transition-shadow group-hover:shadow-md"
                    onClick={() =>
                      handleOnClick({
                        name,
                        job,
                        htmlContent: testimony
                      })
                    }
                  >
                    <AdvancedImage
                      cldImg={getCloudImg(publicId)}
                      className="h-[50px] w-[50px] rounded-md md:h-auto md:w-auto"
                    />
                    {/* Hover overlay with name */}
                    <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="mb-1 text-[10px] font-medium text-white md:mb-2 md:text-xs">
                        {name}
                      </span>
                    </span>
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="relative">
        <div
          className="bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/img/intro_bg.jpeg')",
            backgroundColor: '#000000aa',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="mx-auto w-full max-w-[1024px] px-5 py-16 md:px-10 md:py-24">
            <h3 className="sr-only">제주 서문교회 인사</h3>
            <motion.strong
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="block text-center text-2xl font-bold text-white md:text-4xl"
            >
              제주서문교회에 오신 것을 환영합니다.
            </motion.strong>
            <Separator className="mx-auto my-8 max-w-[60px] bg-white/30" />
            <div className="flex justify-center">
              <p className="max-w-[500px] px-5 text-center text-sm italic leading-8 text-white/80 md:text-base md:leading-9">
                사람이 온다는 건 <br />
                실은 어마어마한 일이다. <br />
                그는 <br />
                그의 과거와 <br />
                현재와 <br />
                그리고 <br />
                그의 미래와 함께 오기 때문이다. <br />
                한 사람의 일생이 오기 때문이다. <br />
                부서지기 쉬운 <br />
                그래서 부서지기도 했을 <br />
                마음이 오는 것이다. – 그 갈피를 아마 <br />
                바람은 더듬어볼 수 있을 <br />
                마음, <br />
                내 마음이 그런 마음을 흉내 낸다면 <br />
                필경 환대가 될 것이다.
              </p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-10 text-center text-sm leading-7 text-white/90 md:text-lg md:leading-9"
            >
              정현종 님의 &apos;방문객&apos;이란 시입니다. <br />
              제주서문교회는 예수님께서 한 영혼을 천하보다 귀하게 여기신 것처럼
              <br /> 한 생명을 예수님의 마음으로 환대하며 섬기는
              신앙공동체입니다. <br />이 사명을 위해 가르치고 치유하며 전파하는{' '}
              <br />
              사역의 동역자로 여러분을 초대합니다.
            </motion.p>
          </div>
        </div>
      </div>
    </LocalLoader>
  );
}
