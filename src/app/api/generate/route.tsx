// This route is used for generating custom social media content based on YouTube video.
// The API is called by the Youtube Content Generation component in the frontend where user can enter YouTube URL and generate scoial media content.

import { OpenAIStream, OpenAIStreamPayload } from '@/utils/open-ai-stream-generate';
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
    const { summary, type, language } = await req.json();

    // Validate that both topic and style are provided
    if (!summary || !type || !language) {
      throw new Error('Please provide all required fields.');
    }

    // TODO change prompt
    // Construct the prompt for the OpenAI content generation
    const prompt = `You are a writer, an expert at summarizing complex topics for ${type}. I will present you with a chunk of text. Feel free to restructure and reorder the flow of the text if it helps increase the clarity of the content. Use simple words and simple language. this is a summary of the video: ${summary}. The language of the content should be ${language}.`;

    // Configuration for the OpenAI API call
    const payload: OpenAIStreamPayload = {
      messages: [{ role: 'user', content: `type JSON ${prompt}` }],
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
      model: 'gpt-4-turbo',
      max_tokens: 2000,
      temperature: 0.9,
      response_format: { type: 'json_object' },
      functions: [
        {
          name: 'generateSocialMediaContent',
          description: 'Generate social media content based on the given inputs',
          parameters: {
            type: 'object',
            properties: {
              content_ideas: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['title', 'description'],
                  properties: {
                    title: {
                      type: 'string',
                      description:
                        'Title of content EG: Blog Post, Twitter Post, Reddit Post, LinkedIn Post. I want exact this format.',
                    },
                    description: {
                      type: 'string',
                      description:
                        'Description of the social media content. must be 100 to 150 words and use icons also if required',
                    },
                  },
                },
              },
            },
            required: ['content_ideas'],
          },
        },
      ],
      function_call: { name: 'generateSocialMediaContent' },
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
