import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateHooks(topic: string): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a viral content expert specializing in creating engaging hooks for social media posts. Your hooks should be attention-grabbing, emotionally resonant, and optimized for virality while maintaining authenticity and value."
        },
        {
          role: "user",
          content: `Generate 5 viral hooks for content about "${topic}". Each hook should be unique and compelling. Focus on creating curiosity, emotional impact, and value proposition.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from OpenAI');

    // Split the response into individual hooks and clean them up
    return response
      .split('\n')
      .filter(hook => hook.trim().length > 0)
      .map(hook => hook.replace(/^\d+\.\s*/, '').trim());

  } catch (error) {
    console.error('Error generating hooks:', error);
    throw error;
  }
} 