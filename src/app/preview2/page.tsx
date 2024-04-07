import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubmitButton } from '@/components/SubmitButton';
import { redirect } from 'next/navigation';
import { getUserDetails, supabaseServerClient } from '@/utils/supabase/server';
import openaiCreateContent from '@/utils/openai';
import { revalidatePath } from 'next/cache';

const items = [
  { title: 'Title of the content generated', timestamp: '20 secs ago' },
  { title: 'Title of the content generated', timestamp: '20 secs ago' },
  { title: 'Title of the content generated', timestamp: '20 secs ago' },
];

//todo temporary i used white bg color in future we will change it
const page = () => {
  const createContentFn = async (formData: FormData) => {
    'use server';

    const topic = formData.get('topic') as string;
    const style = formData.get('style') as string;

    if (!topic || !style) {
      return redirect(`/preview?error=Required fields are missing.`);
    }

    const supabase = supabaseServerClient();
    const user = await getUserDetails();

    if (user == null) {
      return redirect(`/preview?error=Please login to create contents.`);
    }

    try {
      const response = await openaiCreateContent(topic, style);

      const { error } = await supabase.from('content_creations').insert({
        user_id: user.id,
        topic,
        style,
        results: response.outputs,
      });

      if (error) {
        throw new Error(error.message);
      }

      revalidatePath('/preview');
    } catch (error) {
      console.error(error);
      return redirect(`/preview?error=Generation failed. Please try again.`);
    }
  };
  return (
    <div className='bg-white '>
      <div className='block md:flex items-start justify-center'>
        <div className='w-full md:w-1/2 border-r pr-10 flex flex-col justify-between'>
          <div className=''>
            <div className=''>
              <p className='text-[#27262B] text-xl font-bold leading-10'>Name of the tool</p>
            </div>
            <div className='mt-[24px] mb-[16px]'>
              <p className='text-[#27262B] text-lg font-semibold leading-6'>Content</p>
            </div>
            <div className='mb-8'>
              <Textarea className='bg-[#9f9f9f21] h-[185px]' />
            </div>
            <div className='mt-[32px] mb-[16px]'>
              <p className='text-[#27262B] text-lg font-semibold leading-6'>Select tone</p>
            </div>
            <div className=''>
              <Select>
                <SelectTrigger className='w-full bg-[#9f9f9f21]'>
                  <SelectValue placeholder='Select the tone from dropdown' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Educational'>Educational</SelectItem>
                  <SelectItem value='happy'>Happy</SelectItem>
                  <SelectItem value='hurry'>Hurry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='mt-5'>
            <SubmitButton className='w-full' onClick={createContentFn}>
              Generate
            </SubmitButton>
          </div>
        </div>

        <div className='w-full md:w-1/2 ml-10'>
          <Tabs defaultValue='output' className='w-full'>
            <div className='flex justify-center'>
              <TabsList className='rounded-full p-1'>
                <TabsTrigger className='rounded-full' value='output'>
                  Output
                </TabsTrigger>
                <TabsTrigger className='rounded-full' value='history'>
                  History
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='output' className=''>
              <div className='h-[400px] bg-[#9f9f9f21] rounded-lg'>
                <p className='p-5'>See the output here</p>
              </div>
            </TabsContent>
            <TabsContent value='history'>
              <div className='h-[400px] bg-[#9f9f9f21] rounded-lg p-[18px] space-y-4'>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className='px-2 py-1 gap-4 flex items-center rounded-lg hover:bg-[#ECECEC] cursor-pointer'>
                    <div className='text-[#B9B9B9] font-semibold'>{index + 1}</div>
                    <div className='space-y-1'>
                      <p className='text-[#3E3E3E] text-base font-bold leading-5'>{item.title}</p>
                      <p className='text-[#A2A2A2] text-[12px] fony-bold leading-4'>{item.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;
