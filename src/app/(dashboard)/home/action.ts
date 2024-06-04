'use server';

import { Json } from '@/types/supabase';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { parseStringPromise } from 'xml2js';
import ytdl from 'ytdl-core';

export async function getYoutubeVideoDetails(url: string) {
  const info = await ytdl.getInfo(url);

  const title = info.videoDetails.title;
  const chapters = info.videoDetails.chapters;
  const subTitles = info.player_response.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

  // Filter out only the English subtitles
  const englishSubtitles = subTitles.filter((track) => track.languageCode === 'en');

  if (englishSubtitles.length === 0) {
    throw new Error('No subtitles found.');
  }

  const supabase = supabaseServerClient();
  const user = await getUserDetails();
  const userId = user?.id;

  const { data, error } = await supabase
    .from('youtube_content_generator')
    .insert({
      user_id: userId!,
      youtube_title: title,
      url: url,
      chapters: (chapters as unknown as Json) ?? undefined,
    })
    .select('*')
    .single();

  if (error) {
    return 'Error inserting data into database.';
  }

  if (!data) {
    return 'Error fetching YouTube video details.';
  }

  return data;
}

export const getYouTubeVideoSubTitle = async (url: string) => {
  try {
    const info = await ytdl.getInfo(url);

    // Get the subtitles from the video
    const subTitles = info.player_response.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

    // Get the subtitle text from the first English subtitle
    const subtitleTexts = await Promise.all(
      subTitles.map(async (subtitle) => {
        const response = await fetch(subtitle.baseUrl);
        const xml = await response.text();
        const parsed = await parseStringPromise(xml);
        const texts = parsed.transcript.text.map((item: any) => item._).join(' ');
        return {
          language: subtitle.languageCode,
          name: subtitle.name.simpleText,
          text: texts,
        };
      })
    );
    const subTitle = subtitleTexts[0].text;

    return subTitle;
  } catch (error) {
    console.error('Error fetching YouTube video details:', error);
    return `${error}`;
  }
};

export const saveSummary = async (summary: string, id: string) => {
  const supabase = supabaseServerClient();

  try {
    const { data, error } = await supabase.from('youtube_content_generator').update({ summary }).eq('id', id);

    if (error) {
      throw error.message;
    }

    return data;
  } catch (error) {
    return `${error}`;
  }
};
