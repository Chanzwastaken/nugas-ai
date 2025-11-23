# Nugas.AI
https://nugas-ai.vercel.app/
**Biar AI yang bantuin tugas kamu.**

Nugas.AI is an AI-powered study assistant that helps students understand and study their academic documents. Upload a PDF, and get instant summaries, keywords, concept explanations, quizzes, and the ability to chat with your document.

## Features

- 📄 **PDF Upload**: Drag-and-drop interface for uploading academic documents (up to 20 MB)
- 🤖 **AI Analysis**: Automatic extraction of summaries, keywords, and key concepts
- 📝 **Interactive Quiz**: Multiple-choice questions generated from your document
- 💬 **Document Chat**: Ask questions about your document and get AI-powered answers
- 🎨 **Modern UI**: Clean, minimalist design built with TailwindCSS

## Technology Stack

- **Framework**: Next.js 14 (Pages Router)
- **Styling**: TailwindCSS
- **PDF Processing**: pdf-parse
- **AI**: OpenRouter API (Google Gemini 2.0 Flash)
- **Language**: TypeScript

## Architecture

### Project Structure

```
nugas-ai/
├── pages/
│   ├── api/
│   │   ├── upload-simple.ts    # PDF upload and text extraction
│   │   ├── analyze.ts           # Document analysis (summary, keywords, quiz, concepts)
│   │   └── chat.ts              # Q&A with document
│   ├── index.tsx                # Upload page
│   ├── dashboard.tsx            # Study dashboard
│   └── _app.tsx                 # App wrapper
├── components/
│   ├── Layout.tsx               # Main layout with navigation
│   ├── FileUpload.tsx           # Drag-and-drop file upload component
│   ├── QuizSection.tsx         # Interactive quiz component
│   └── ChatSection.tsx         # Chat interface component
├── lib/
│   ├── pdf-extractor.ts        # PDF text extraction utilities
│   ├── openrouter.ts           # OpenRouter API client
│   └── ai-prompts.ts           # AI prompt templates
├── styles/
│   └── globals.css             # Global styles and TailwindCSS
├── types/
│   └── index.ts                # TypeScript type definitions
└── public/                      # Static assets
```

### API Endpoints

1. **POST /api/upload-simple**
   - Accepts: `{ file: string (base64), filename: string }`
   - Returns: `{ success: boolean, text: string, numPages: number }`
   - Extracts text from uploaded PDF

2. **POST /api/analyze**
   - Accepts: `{ text: string }`
   - Returns: `{ success: boolean, summary: string, keywords: string, concepts: string, quiz: QuizData }`
   - Generates summary, keywords, concepts, and quiz using AI

3. **POST /api/chat**
   - Accepts: `{ text: string, question: string }`
   - Returns: `{ success: boolean, answer: string }`
   - Answers questions based on document content

### Data Flow

1. User uploads PDF → `/api/upload-simple` extracts text
2. Text stored in sessionStorage → User navigates to dashboard
3. Dashboard calls `/api/analyze` → Displays results
4. User asks questions → `/api/chat` provides answers

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation

1. **Clone or navigate to the project directory**

```bash
cd nugas-ai
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Getting an OpenRouter API Key:**
1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to your API keys section
4. Create a new API key
5. Copy the key and add it to `.env.local`

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Upload a Document**
   - Go to the home page
   - Drag and drop a PDF file or click to browse
   - Click "Process Document"

2. **View Analysis**
   - After processing, you'll be redirected to the dashboard
   - View the summary, keywords, and key concepts

3. **Take a Quiz**
   - Scroll to the quiz section
   - Select answers and submit
   - Review explanations for each question

4. **Chat with Document**
   - Scroll to the chat section
   - Type questions about the document
   - Get AI-powered answers

## AI Prompt Templates

The application uses carefully crafted prompts for each feature:

- **Summary**: Generates concise overviews with main topics
- **Keywords**: Extracts 10-15 essential terms
- **Concepts**: Identifies and explains 3-5 difficult concepts
- **Quiz**: Creates 5 multiple-choice questions with explanations
- **Chat**: Answers questions based solely on document content

All prompts are located in `lib/ai-prompts.ts` and can be customized.

## Branding

- **Name**: Nugas.AI
- **Tagline**: "Biar AI yang bantuin tugas kamu."
- **Colors**:
  - Primary Blue: `#2563EB`
  - Light Gray: `#F3F4F6`
  - White: `#FFFFFF`
- **Style**: Clean, academic, minimal, trustworthy

## Limitations (MVP)

- PDF files only (max 20 MB)
- No database - all processing is in-memory
- Stateless architecture - data stored in sessionStorage
- Single document processing at a time
- Text extraction limited to 50,000 characters for AI processing

## Troubleshooting

### PDF Upload Fails
- Ensure the file is a valid PDF
- Check file size is under 20 MB
- Verify the PDF contains extractable text (not just images)

### AI Analysis Fails
- Check your OpenRouter API key is set correctly
- Verify you have API credits/quota
- Check browser console for error messages

### Build Errors
- Ensure Node.js version is 18+
- Delete `node_modules` and `.next` folder, then run `npm install` again
- Check TypeScript errors with `npm run lint`

## Future Enhancements

- Support for multiple file formats (DOCX, TXT)
- User accounts and document history
- Export quiz results
- Multiple document comparison
- Advanced search within documents
- Mobile app version

## License

This project is proprietary software.

## Support

For issues or questions, please check the troubleshooting section or review the code documentation.

---

**Built with ❤️ for students who want to study smarter, not harder.**

