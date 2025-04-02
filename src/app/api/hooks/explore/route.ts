import { NextResponse } from 'next/server';
import { generateHooks } from '@/lib/services/hook-generator';
import { generateHooksWithModel } from '@/lib/services/huggingface-service';

export async function POST(request: Request) {
  try {
    const { topic, modelId } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const prompt = `Generate 5 creative content ideas or angles to expand on this hook: "${topic}". Each idea should be unique and provide a different perspective or approach.`;
    
    let hooks: string[];
    if (modelId) {
      // Use Hugging Face model
      hooks = await generateHooksWithModel(prompt, modelId);
    } else {
      // Use OpenAI model
      hooks = await generateHooks(prompt);
    }

    return NextResponse.json({ hooks });

  } catch (error) {
    console.error('Error in explore API:', error);
    return NextResponse.json(
      { error: 'Failed to generate content ideas' },
      { status: 500 }
    );
  }
} 