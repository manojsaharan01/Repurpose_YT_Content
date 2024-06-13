# AI Youtube Content Generation Tool by [BuilderKit.ai](https://www.builderkit.ai)

`nextjs` `typescript` `openai` `supabase` `tailwindcss` `shadcn`

## Introduction

The YouTube Content Generator is an AI-powered tool that allows you to input any YouTube URL to receive a summary and then generate content for blog posts, tweets, Reddit posts, and LinkedIn posts in several languages. Integrated with Supabase for user authentication and data management, it also supports theme switching between light and dark modes.

<a href="https://youtube-content-generator.builderkit.ai/home" target="_blank" rel="noopener">
  <picture>
    <img alt="AI YouTube Content Generation Tool" src="https://youtube-content-generator.builderkit.ai/github-cover.webp" />
  </picture>
</a>

## Features

- 🤖 AI-powered content generation using OpenAI.
- 🔒 Integration with Supabase for authentication and database management.
- 💻 Responsive design using Next.js, TailwindCSS and Shadcn.
- 🎨 Theme switching between light and dark modes.
- 😃 User-friendly dashboard for managing and generating content.
- 🔗 Secure user authentication with OAuth support.

## Quickstart Guide

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or pnpm or yarn `(npm for me)`

### Installation

1. **Clone the repository:** **Starter**

   Use the Project URL based on your plan

   **Starter**

   ```sh
   git clone https://github.com/1811-Labs-LLC/BuilderKit-Starter.git [YOUR_APP_NAME]
   ```

   **Pro**

   ```sh
   git clone https://github.com/1811-Labs-LLC/BuilderKit-Pro.git [YOUR_APP_NAME]
   ```

   ```sh
   cd [YOUR_APP_NAME]

   git checkout youtube-summary-tool

   git remote remove origin
   ```

   Removing the `origin remote` ensures you can work locally without pushing changes back to the original repository.

   > - **However, note that after removing the remote, you won't be able to switch branches, so you'll need to clone the repository again if you want to work on another branch.**

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Environment Variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   OPENAI_API_KEY=<your-openai-api-key>
   NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY=<your-google-analytics-key>
   ```

4. **Create Table in Supabase:**

   > #### To Create a Table in Supabase
   >
   > - Go to the **SQL editor** section
   > - Click **New Query**
   > - Enter the **SQL Script** provided below for the given table

   First, Create an User table if you have not created one already.

   _Email, full name and avatar url is auto synced with the auth table managed by supabase. Once user sign in through google or email, password. The User table gets synced with the new user data._

   ```sql
   -- Create a table for public users
   create table users (
      id uuid references auth.users on delete cascade not null primary key,
      created_at timestamp with time zone not null default now(),
      email text not null,
      full_name text null,
      avatar_url text null,
      constraint users_email_key unique (email)
   );

   -- Set up Row Level Security (RLS)
   alter table users
   enable row level security;

   create policy "Users can insert their own row." on users
   for insert with check (auth.uid() = id);

   create policy "Users can update own row" on users
   for update using (auth.uid() = id);

   create policy "Users can read own row" on users
   for select using (auth.uid() = id);

   -- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
   create function public.handle_new_user()
   returns trigger as $$
   begin
   insert into public.users (id, email, full_name, avatar_url)
   values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
   return new;
   end;
   $$ language plpgsql security definer;
   create trigger on_auth_user_created_trigger
   after insert on auth.users
   for each row execute procedure public.handle_new_user();
   ```

   **Now, create the Youtube Content Generation table required for this tool.**

   ```sql
   -- Create a table for AI YouTube Summary And Content Generator
   create table youtube_content_generator (
      id uuid not null default uuid_generate_v4 (),
      created_at timestamp with time zone not null default now(),
      user_id uuid not null,
      url text not null,
      summary text null,
      youtube_title text not null,
      transcription text not null,
      language text null,
      generated_content jsonb null,
      constraint youtube_content_generator_pkey primary key (id),
      constraint youtube_content_generator_user_id_fkey foreign key (user_id) references users (id)
   );

   -- Set up Row Level Security (RLS)
   alter table youtube_content_generator
      enable row level security;

   create policy "Users can insert their own row." on youtube_content_generator
      for insert with check (auth.uid() = user_id);

   create policy "Users can update own row" on youtube_content_generator
      for update using (auth.uid() = user_id);

   create policy "Users can read own row" on youtube_content_generator
      for select using (auth.uid() = user_id);

   create policy "Users can delete own row" on youtube_content_generator
      for delete using (auth.uid() = user_id);
   ```

   > For all the tables, we enable the RLS policy by default with necessary permissions as mentioned in the script.

### Running the Application

1.  **Run the development server:**

    ```sh
    npm run dev
    ```

    This will start the development server on `http://localhost:3000`.

   > Note: To enable Google Authentication for your application, please refer to the [Supabase Setup Guide](https://docs.builderkit.ai/setup/supabase).

2. **Build for production:**

   ```sh
   npm run build
   ```

   This command compiles the application for production usage.

3. **Start the production server:**

   ```sh
   npm start
   ```

   This will start the application in production mode.

### Additional Scripts

- **Prepare Husky for Git hooks:**

  ```sh
  npm run prepare
  ```

- **Validate the code with Linting, Formatting & Typecheck:**

  ```sh
  npm run validate
  ```

## Requirements

- **Node.js**: Download and install from [here](https://nodejs.org/).
- **Supabase**: Create an account and a new project on [Supabase](https://supabase.com/). Obtain the `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your project settings.
- **OpenAI API Key**: Sign up for an API key on [OpenAI](https://openai.com/).

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.builderkit.ai/license) file for details.

## Contact

For any inquiries or issues, please open an issue on the [GitHub repository](https://github.com/1811-Labs-LLC/BuilderKit) or contact the author at [vatsal1811@gmail.com](mailto:vatsal1811@gmail.com).
