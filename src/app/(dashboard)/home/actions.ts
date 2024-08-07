'use server';

import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { parseStringPromise } from 'xml2js';
import ytdl from 'ytdl-core';

export async function getYoutubeVideoDetails(url: string) {
  const supabase = supabaseServerClient();

  try {
    const user = await getUserDetails();
    console.log(user);

    const info = await ytdl.getInfo(url);
    console.log(info, '-------===------');

    const title = info.videoDetails.title;
    const subTitles = info.player_response.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

    // Filter out only the English subtitles
    const englishSubtitles = subTitles.filter((track) => track.languageCode === 'en');
    if (englishSubtitles.length === 0) {
      throw 'No subtitles found.';
    }

    console.log('-------subtitle text-------');

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

    console.log('----store-----');

    const { data, error } = await supabase
      .from('youtube_content_generator')
      .insert({
        user_id: user?.id,
        youtube_title: title,
        url: url,
        transcription: subtitleTexts[0].text,
      })
      .select('id')
      .single();

    if (error) {
      throw error.message;
    }

    return { id: data.id };
  } catch (error) {
    console.log(error);

    return { error: `${error}` };
  }
}
