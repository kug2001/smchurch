import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const bandReqURL = new URL('https://openapi.band.us/v2/band/posts');
  const searchPrams = new URL(request.url).searchParams;
  const limit = searchPrams.get('limit');
  const after = searchPrams.get('after');
  const bandReqSearchPrams = bandReqURL.searchParams;
  bandReqSearchPrams.set(
    'access_token',
    `${process.env.NAVER_BAND_ACCESS_TOKEN}`
  );
  bandReqSearchPrams.set('band_key', `${process.env.NAVER_BAND_KEY}`);
  limit && bandReqSearchPrams.set('limit', limit);
  after && bandReqSearchPrams.set('after', after);
  // console.log(bandReqSearchPrams);
  try {
    const res = await fetch(bandReqURL);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
