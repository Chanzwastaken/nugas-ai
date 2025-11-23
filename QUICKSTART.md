# Quick Start Guide

Get Nugas.AI up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get OpenRouter API Key

1. Go to [https://openrouter.ai/](https://openrouter.ai/)
2. Sign up or log in
3. Navigate to "Keys" section
4. Click "Create Key"
5. Copy your API key

## Step 3: Configure Environment

Create a file named `.env.local` in the project root:

```env
OPENROUTER_API_KEY=sk-or-v1-your-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace `sk-or-v1-your-key-here` with your actual OpenRouter API key.

## Step 4: Run the Application

```bash
npm run dev
```

## Step 5: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Step 6: Test It Out

1. Upload a PDF document (academic paper, textbook chapter, etc.)
2. Wait for processing (usually 10-30 seconds)
3. Explore the dashboard:
   - Read the summary
   - Check keywords
   - Review concept explanations
   - Take the quiz
   - Chat with your document

## Troubleshooting

### "OPENROUTER_API_KEY is not set"
- Make sure `.env.local` exists in the project root
- Check that the file name is exactly `.env.local` (not `.env` or `.env.example`)
- Restart the dev server after creating/modifying `.env.local`

### "Failed to process PDF"
- Ensure the PDF has extractable text (not just images)
- Check file size is under 20 MB
- Verify the PDF is not corrupted

### Build Errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall
- Check Node.js version: `node --version` (should be 18+)

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Customize prompts in `lib/ai-prompts.ts`
- Modify styling in `styles/globals.css`

Happy studying! 🎓

