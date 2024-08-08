'use server';

import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import { parseStringPromise } from 'xml2js';
import { HttpsProxyAgent } from 'https-proxy-agent';
import ytdl from '@distube/ytdl-core';

export async function getYoutubeVideoDetails(url: string) {
  const supabase = supabaseServerClient();

  try {
    const user = await getUserDetails();

    console.log(url);

    const proxyAgent = new HttpsProxyAgent('http://fixie:XpmfoBVu8iczd45@criterium.usefixie.com:80');

    // @ts-expect-error qhot fix for testing purpose
    const agent = ytdl.createAgent([
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.85517,
        hostOnly: false,
        httpOnly: false,
        name: '__Secure-1PAPISID',
        path: '/',
        sameSite: 'unspecified',
        secure: true,
        session: false,
        storeId: '0',
        value: 'N2TzBXVXOmaqCDbm/A_CxiOp9l7RXU1Zwm',
        id: 1,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.85536,
        hostOnly: false,
        httpOnly: true,
        name: '__Secure-1PSID',
        path: '/',
        sameSite: 'unspecified',
        secure: true,
        session: false,
        storeId: '0',
        value:
          'g.a000mgj3BadC9aBFDqnefaEkMdR5p3nmr9y1X5GMEnJXCL_a4EUyHpEBHWjLu95xfCtKawLynAACgYKAWESARQSFQHGX2Mi1S7ixAvQ_HlZd_wRYDuXfBoVAUF8yKoCA1nMz_8g8ZCf_XnqiA2u0076',
        id: 2,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1754663038.637558,
        hostOnly: false,
        httpOnly: true,
        name: '__Secure-1PSIDCC',
        path: '/',
        sameSite: 'unspecified',
        secure: true,
        session: false,
        storeId: '0',
        value: 'AKEyXzXzgoI8eOhmf5N0NkDmxGRT_fPtJkRuzGZlo1_XNMrLvbbHdsZEmVAxk5dMt6vMSgmc',
        id: 3,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1754662991.289394,
        hostOnly: false,
        httpOnly: true,
        name: '__Secure-1PSIDTS',
        path: '/',
        sameSite: 'unspecified',
        secure: true,
        session: false,
        storeId: '0',
        value: 'sidts-CjIB4E2dkTYGlQnKOdpkFSFzfG8YxidNL6TA8D0Qx65yIG-z4pQHFEPC3GzdGAUPh8hYIxAA',
        id: 4,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.855203,
        hostOnly: false,
        httpOnly: false,
        name: '__Secure-3PAPISID',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: 'N2TzBXVXOmaqCDbm/A_CxiOp9l7RXU1Zwm',
        id: 5,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.855381,
        hostOnly: false,
        httpOnly: true,
        name: '__Secure-3PSID',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value:
          'g.a000mgj3BadC9aBFDqnefaEkMdR5p3nmr9y1X5GMEnJXCL_a4EUyImI6rECazGIq4_D87yLNbgACgYKAZgSARQSFQHGX2MiKeTvZsoQ3Ybg0XFQzOPFXhoVAUF8yKpC9_0dg5FPLkm4XNlW5tlA0076',
        id: 6,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1754663038.637588,
        hostOnly: false,
        httpOnly: true,
        name: '__Secure-3PSIDCC',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: 'AKEyXzW3x91zI8Nj80PxVDvzbt0rfpTasDCpXID_o7EZsnUmh2ACvDjhSkbz1JKOvaoF8ZiTvmM',
        id: 7,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1754662991.289595,
        hostOnly: false,
        httpOnly: true,
        name: '__Secure-3PSIDTS',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value: 'sidts-CjIB4E2dkTYGlQnKOdpkFSFzfG8YxidNL6TA8D0Qx65yIG-z4pQHFEPC3GzdGAUPh8hYIxAA',
        id: 8,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.855099,
        hostOnly: false,
        httpOnly: false,
        name: 'APISID',
        path: '/',
        sameSite: 'unspecified',
        secure: false,
        session: false,
        storeId: '0',
        value: 'Kmvrr-MXZDlhaNni/AZj79obT7ip-hh1sL',
        id: 9,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.854999,
        hostOnly: false,
        httpOnly: true,
        name: 'HSID',
        path: '/',
        sameSite: 'unspecified',
        secure: false,
        session: false,
        storeId: '0',
        value: 'An4FkpXaldF8byEPi',
        id: 10,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1745434286.818483,
        hostOnly: false,
        httpOnly: true,
        name: 'LOGIN_INFO',
        path: '/',
        sameSite: 'no_restriction',
        secure: true,
        session: false,
        storeId: '0',
        value:
          'AFmmF2swRgIhAOM3QRVNh180NUxDl0liMGSa3PxV1ilPCRu4HhjO7j6CAiEA9Z8PRZKDrL29Ab0lFTWR8-oW7O4sFRBKDTh-ZLOGTJs:QUQ3MjNmeXkxeWRaanVjS250WkpwTWZyd3RfeFc4Q3JZZ2x2RllkNW10bGNBYU9Palhlckd2dnNlLXdoMG9QdzBhUVZjZFlhaVhJODlJUHY1Tk5wOTczdEdOai13TzFnUXBkSFhFS1o3Q0pjOFlseU1qeUxCZkZUdGdmaVQ2ZFB2YkVrc2xmWWJEcjhOU1ZOYVlOZll4NHQ4Z2ZpX0FrMlBR',
        id: 11,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757687036.048806,
        hostOnly: false,
        httpOnly: false,
        name: 'PREF',
        path: '/',
        sameSite: 'unspecified',
        secure: true,
        session: false,
        storeId: '0',
        value: 'f7=4100&tz=Asia.Calcutta&f4=4000000&f6=40000000',
        id: 12,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.855131,
        hostOnly: false,
        httpOnly: false,
        name: 'SAPISID',
        path: '/',
        sameSite: 'unspecified',
        secure: true,
        session: false,
        storeId: '0',
        value: 'N2TzBXVXOmaqCDbm/A_CxiOp9l7RXU1Zwm',
        id: 13,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.85534,
        hostOnly: false,
        httpOnly: false,
        name: 'SID',
        path: '/',
        sameSite: 'unspecified',
        secure: false,
        session: false,
        storeId: '0',
        value:
          'g.a000mgj3BadC9aBFDqnefaEkMdR5p3nmr9y1X5GMEnJXCL_a4EUyXPuy5NvJFQCQ8zwkGS94bAACgYKARYSARQSFQHGX2Mic6R4hCXmkRooUDcLD-tIxxoVAUF8yKrhzOnSesAb_Eqzoz4Z5zgH0076',
        id: 14,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1754663038.637501,
        hostOnly: false,
        httpOnly: false,
        name: 'SIDCC',
        path: '/',
        sameSite: 'unspecified',
        secure: false,
        session: false,
        storeId: '0',
        value: 'AKEyXzXFo3rNuvxI0R2-w386RHyY-AKokB18G_74J9NHaLHjPBZgsR4CLHze0freem6htiC-uQ',
        id: 15,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1757451703.855043,
        hostOnly: false,
        httpOnly: true,
        name: 'SSID',
        path: '/',
        sameSite: 'unspecified',
        secure: true,
        session: false,
        storeId: '0',
        value: 'Agx3GHawnZCw3Kzi-',
        id: 16,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1723127041,
        hostOnly: false,
        httpOnly: false,
        name: 'ST-3opvp5',
        path: '/',
        sameSite: 'unspecified',
        secure: false,
        session: false,
        storeId: '0',
        value:
          'session_logininfo=AFmmF2swRgIhAOM3QRVNh180NUxDl0liMGSa3PxV1ilPCRu4HhjO7j6CAiEA9Z8PRZKDrL29Ab0lFTWR8-oW7O4sFRBKDTh-ZLOGTJs%3AQUQ3MjNmeXkxeWRaanVjS250WkpwTWZyd3RfeFc4Q3JZZ2x2RllkNW10bGNBYU9Palhlckd2dnNlLXdoMG9QdzBhUVZjZFlhaVhJODlJUHY1Tk5wOTczdEdOai13TzFnUXBkSFhFS1o3Q0pjOFlseU1qeUxCZkZUdGdmaVQ2ZFB2YkVrc2xmWWJEcjhOU1ZOYVlOZll4NHQ4Z2ZpX0FrMlBR',
        id: 17,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1723127041,
        hostOnly: false,
        httpOnly: false,
        name: 'ST-tladcw',
        path: '/',
        sameSite: 'unspecified',
        secure: false,
        session: false,
        storeId: '0',
        value:
          'session_logininfo=AFmmF2swRgIhAOM3QRVNh180NUxDl0liMGSa3PxV1ilPCRu4HhjO7j6CAiEA9Z8PRZKDrL29Ab0lFTWR8-oW7O4sFRBKDTh-ZLOGTJs%3AQUQ3MjNmeXkxeWRaanVjS250WkpwTWZyd3RfeFc4Q3JZZ2x2RllkNW10bGNBYU9Palhlckd2dnNlLXdoMG9QdzBhUVZjZFlhaVhJODlJUHY1Tk5wOTczdEdOai13TzFnUXBkSFhFS1o3Q0pjOFlseU1qeUxCZkZUdGdmaVQ2ZFB2YkVrc2xmWWJEcjhOU1ZOYVlOZll4NHQ4Z2ZpX0FrMlBR',
        id: 18,
      },
      {
        domain: '.youtube.com',
        expirationDate: 1723127042,
        hostOnly: false,
        httpOnly: false,
        name: 'ST-xuwub9',
        path: '/',
        sameSite: 'unspecified',
        secure: false,
        session: false,
        storeId: '0',
        value:
          'session_logininfo=AFmmF2swRgIhAOM3QRVNh180NUxDl0liMGSa3PxV1ilPCRu4HhjO7j6CAiEA9Z8PRZKDrL29Ab0lFTWR8-oW7O4sFRBKDTh-ZLOGTJs%3AQUQ3MjNmeXkxeWRaanVjS250WkpwTWZyd3RfeFc4Q3JZZ2x2RllkNW10bGNBYU9Palhlckd2dnNlLXdoMG9QdzBhUVZjZFlhaVhJODlJUHY1Tk5wOTczdEdOai13TzFnUXBkSFhFS1o3Q0pjOFlseU1qeUxCZkZUdGdmaVQ2ZFB2YkVrc2xmWWJEcjhOU1ZOYVlOZll4NHQ4Z2ZpX0FrMlBR',
        id: 19,
      },
    ]);

    // Get video info
    const info = await ytdl.getBasicInfo(url, { agent });
    // console.log(info, '-------===------');

    const title = info.videoDetails.title;
    const subTitles = info.player_response.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

    // Filter out only the English subtitles
    const englishSubtitles = subTitles.filter((track) => track.languageCode === 'en');
    if (englishSubtitles.length === 0) {
      throw 'No subtitles found.';
    }

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
    console.error(error);
    return { error: `${error}` };
  }
}
