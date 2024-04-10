import { OpenAIStream, OpenAIStreamPayload } from '@/utils/open-ai-stream';
import { getUserDetails } from '@/utils/supabase/server';

export const POST = async (req: Request) => {
  const user = await getUserDetails();

  if (user == null) {
    throw 'Please login to create contents.';
  }

  const data = await req.formData();

  const topic = data.get('topic');
  const style = data.get('style');

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

  if (!prompt) return new Response('Missing prompt', { status: 400 });

  const payload: OpenAIStreamPayload = {
    messages: [{ role: 'user', content: prompt }],
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
    model: 'gpt-4-0125-preview',
    max_tokens: 1000,
    temperature: 0.9,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
};
