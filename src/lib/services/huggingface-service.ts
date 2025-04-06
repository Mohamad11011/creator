import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export interface ModelOption {
  id: string;
  name: string;
  description: string;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'mistralai/Mistral-7B-Instruct-v0.2',
    name: 'Mistral 7B',
    description: 'A powerful 7B parameter model with strong instruction-following capabilities'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
    name: 'DeepSeek Qwen',
    description: ''
  },{
    id: 'sd-legacy/stable-diffusion-v1-5',
    name: 'diffusion',
    description: ''
  },
  {
    id: 'meta-llama/Llama-2-7b-chat-hf',
    name: 'Llama 2 7B Chat',
    description: 'Meta\'s Llama 2 model optimized for chat'
  },
  {
    id: 'gpt2-large',
    name: 'GPT-2 Large',
    description: 'OpenAI\'s GPT-2 large model for text generation'
  },
  {
    id: 'facebook/opt-1.3b',
    name: 'OPT 1.3B',
    description: 'Meta\'s OPT model for text generation'
  }
];

export async function generateHooksWithModel(
  topic: string,
  modelId: string
): Promise<string[]> {
  try {
    // const prompt = `Generate 5 viral hooks for content about "${topic}". Each hook should be unique and compelling. Focus on creating curiosity, emotional impact, and value proposition. Format each hook on a new line.`;

    const response = await hf.textGeneration({
      model: modelId,
      inputs: topic,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false,
      },
    });

    if (!response.generated_text) {
      throw new Error('No response from Hugging Face model');
    }

    // Split the response into individual hooks and clean them up
    return response.generated_text
      .split('\n')
      .filter(hook => hook.trim().length > 0)
      .map(hook => hook.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 5); // Ensure we only return 5 hooks

  } catch (error) {
    console.error('Error generating hooks with Hugging Face:', error);
    throw error;
  }
} 