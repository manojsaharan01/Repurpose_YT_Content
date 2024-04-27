// This route is used for generating custom social media content based on user-defined topics and styles.
// The API is called by the Content Writer component in the frontend where users can specify the desired topic and style.

import { OpenAIStream, OpenAIStreamPayload } from '@/utils/open-ai-stream';
import { getUserDetails } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const user = await getUserDetails();

    // Check if user is logged in
    if (user == null) {
      throw new Error('Please login to create contents.');
    }

    // Parse JSON body from the request to get topic and style
    const { topic, style } = await req.json();

    // Validate that both topic and style are provided
    if (!topic || !style) {
      throw new Error('Missing topic or style in the request body.');
    }

    // Construct the prompt for the OpenAI content generation
    const prompt = `Generate 5 social media contents on the topic: ${topic}.
    Make sure the style of the content is around ${style}.
    
    The content should be at least 500 characters in length.
    Please format the result in a simple HTML format as follows and strictly follow the structure below:
    
    <section>
      <h2 style="font-weight: 600; margin-bottom: 0.5rem;">TITLE</h2>
      <p style="text-align: justify;">DESCRIPTION</p>
      <hr style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
    </section>
    
    Repeat this structure for each of the 5 social media contents. and first i dont want this`;

    // Configuration for the OpenAI API call
    const payload: OpenAIStreamPayload = {
      messages: [{ role: 'user', content: prompt }],
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
      model: 'gpt-4-0125-preview',
      max_tokens: 2000,
      temperature: 0.9,
    };

    // Call the OpenAI streaming function with the configured payload
    const stream = await OpenAIStream(payload);

    // Return the streaming response to the client
    return new Response(stream);
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.error();
  }
};
