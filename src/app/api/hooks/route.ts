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

    let hooks: string[];
    
    if (modelId) {
      // Use Hugging Face model
      hooks = await generateHooksWithModel(topic, modelId);
    } else {
      // Use OpenAI model
      hooks = await generateHooks(topic);
    }

    return NextResponse.json({ hooks });

  } catch (error) {
    console.error('Error in hooks API:', error);
    return NextResponse.json(
      { error: 'Failed to generate hooks' },
      { status: 500 }
    );
  }
} 