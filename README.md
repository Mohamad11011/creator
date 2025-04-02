# HookAI - AI-Powered Social Media Hook Generator

HookAI is a powerful tool that helps content creators generate viral hooks for their social media content using AI. It leverages both OpenAI's GPT-4 and various Hugging Face models to create engaging, attention-grabbing hooks while incorporating insights from trending topics across various social media platforms.

## Features

- 🤖 AI-powered hook generation using multiple models:
  - OpenAI GPT-4 (default)
  - Mistral 7B
  - Llama 2 7B Chat
  - GPT-2 Large
  - OPT 1.3B
- 🎯 Topic-specific hook suggestions
- 📱 Social media platform integration (Twitter, Reddit, LinkedIn, Google Trends)
- 🌗 Dark mode support
- 📋 Easy copy-to-clipboard functionality
- 🎨 Modern, responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Hugging Face API key (optional, for using alternative models)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd creator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here  # Optional
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- OpenAI API
- Hugging Face API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
