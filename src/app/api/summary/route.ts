import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import { parseStringPromise } from 'xml2js';
import { Json } from '@/types/supabase';

export async function POST(request: Request) {
  try {
    const user = await getUserDetails();
    const supabase = supabaseServerClient();

    if (user == null) {
      throw new Error('Please login to create contents.');
    }

    const { url } = await request.json();

    if (!url) {
      throw new Error('Please provide a valid YouTube URL.');
    }

    const videoData = await getYoutubeVideoDetails(url);

    if (videoData?.subtitles == null) {
      throw new Error('Error fetching YouTube video details.');
    }

    const prompt = `You are an expert writer skilled in summarizing complex topics. Your task is to create a summary for the video "${videoData.subtitles}". Please use simple language and restructure the content for clarity. The summary should be in English. Feel free to add new lines where appropriate. Make sure summury short and easy to understand. summury should be in plain text`;

    const payload = {
      messages: [{ role: 'user', content: prompt }],
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
      model: 'gpt-4-turbo',
      max_tokens: 500,
      temperature: 0.9,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await response.json();
    const summary = responseBody.choices[0]?.message?.content;

    const userId = user.id;

    const { data, error } = await supabase
      .from('youtube_content_generator')
      .insert([
        {
          user_id: userId,
          youtube_title: videoData?.title,
          url: url,
          summary: summary,
          chapters: (videoData?.chapters as unknown as Json) ?? undefined,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error('Error inserting data into database.');
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function getYoutubeVideoDetails(url: string) {
  try {
    const info = await ytdl.getInfo(url);

    const title = info.videoDetails.title;

    const chapters = info.videoDetails.chapters;

    const subtitles = info.player_response.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

    // Filter out only the English subtitles
    const englishSubtitles = subtitles.filter((track) => track.languageCode === 'en');

    const subtitleTexts = await Promise.all(
      englishSubtitles.map(async (subtitle) => {
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

    return { title, chapters, subtitles: subtitleTexts[0].text };
  } catch (error) {
    console.error('Error fetching YouTube video details:', error);
    return null;
  }
}
