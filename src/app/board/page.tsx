'use client';
import {
  InnerSection,
  SectionContainer
} from '@/components/block/share/share.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  BoardTitle,
  ListContainer,
  ListTitle,
  WrapProfile,
  ProfileImage,
  ProfileName,
  ProfileInfo,
  MoreBtn,
  WrapMore,
  WrapSwiper,
  InnerSwiperSlide
} from '@/app/board/Board.styles';
import { LocalLoader } from '@/components/common/loader/LocalLoader';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import { ContentBlock, EditorState, RichUtils } from 'draft-js';

export default function BoardPage() {
  // const [limit, setLimit] = useState(20);
  const [isMoreLoading, setIsMoreLoading] = useState(true);
  const [bandPosts, setBandPosts] = useState<any[]>([]);
  const bandReqUrl = useRef(new URLSearchParams());

  useEffect(() => {
    // console.log('useEffect');
    fetch(`/api/band/posts`).then(async res => {
      const json = await res.json();
      const data = json.result_data;

      setBandPosts([...data.items]);
      bandReqUrl.current.delete('limit');
      bandReqUrl.current.delete('after');
      bandReqUrl.current.set('limit', data.paging.next_params.limit);
      bandReqUrl.current.set('after', data.paging.next_params.after);
      setIsMoreLoading(false);
    });
  }, []);
  const getDate = (uto: string) => {
    const dateInstance = new Date(uto);
    const year = dateInstance.getFullYear();
    const month = dateInstance.getMonth();
    const day = dateInstance.getDay();
    const date = dateInstance.getDate();
    const hour = dateInstance.getHours();
    const minutes = dateInstance.getMinutes();
    return `${year}년 ${month + 1}월 ${date}일 ${hour}:${minutes}`;
  };

  const handleOnClickMoreBtn = async () => {
    // console.log(bandReqUrl.current);
    // setIsMoreLoading(true);
    try {
      const res = await fetch(
        `/api/band/posts?${bandReqUrl.current.toString()}`
      );
      const json = await res.json();
      const paging = json.result_data.paging;
      setBandPosts(prevState => {
        return [...prevState, ...json.result_data.items];
      });
      bandReqUrl.current.delete('limit');
      bandReqUrl.current.delete('after');
      bandReqUrl.current.set('limit', paging.next_params.limit);
      bandReqUrl.current.set('after', paging.next_params.after);
      // setIsMoreLoading(false);
    } catch (e) {
      console.log(e);
      // setIsMoreLoading(false);
    }
  };

  // console.log(bandPosts);

  return (
    <LocalLoader isLoading={isMoreLoading}>
      <SectionContainer bgColor={'#fff'} style={{ minHeight: 'inherit' }}>
        <InnerSection>
          <BoardTitle>서문교회 소식</BoardTitle>
          <ListContainer>
            {bandPosts &&
              // @ts-ignore
              bandPosts.map((item, index) => (
                <li key={item.post_key}>
                  <WrapProfile>
                    {item.author.profile_image_url ? (
                      <ProfileImage
                        src={item.author.profile_image_url}
                        alt={'작성자 프로필 사진'}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <></>
                    )}
                    <div>
                      <ProfileName>{item.author.name}</ProfileName>
                      <ProfileInfo>{getDate(item.created_at)}</ProfileInfo>
                    </div>
                  </WrapProfile>
                  <ListTitle
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                  <WrapSwiper>
                    <Swiper
                      modules={[Pagination]}
                      spaceBetween={50}
                      loop={true}
                      pagination={{ clickable: true }}
                    >
                      {item?.photos.map((photo: any) => (
                        <SwiperSlide key={photo.photo_key}>
                          <InnerSwiperSlide>
                            <Image
                              src={photo.url}
                              alt={''}
                              fill={true}
                              style={{ objectFit: 'contain' }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </InnerSwiperSlide>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </WrapSwiper>
                </li>
              ))}
          </ListContainer>
          <WrapMore>
            <MoreBtn
              onClick={handleOnClickMoreBtn}
              variant={'outlined'}
              color={'secondary'}
            >
              더보기
            </MoreBtn>
          </WrapMore>
        </InnerSection>
      </SectionContainer>
    </LocalLoader>
  );
}
