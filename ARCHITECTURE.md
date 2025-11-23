# Nugas.AI Architecture Documentation

## Overview

Nugas.AI is built as a stateless, serverless MVP using Next.js with the Pages Router. The application processes PDF documents in-memory without requiring a database, making it simple to deploy and scale.

## System Architecture

### High-Level Flow

```
User Upload → PDF Extraction → Text Storage (sessionStorage) → AI Analysis → Dashboard Display
                                                                    ↓
                                                              Chat Interface
```

### Component Architecture

#### Frontend (Client-Side)

1. **Pages**
   - `index.tsx`: Upload interface with drag-and-drop
   - `dashboard.tsx`: Main study dashboard with all features

2. **Components**
   - `Layout.tsx`: Navigation and page wrapper
   - `FileUpload.tsx`: File selection and validation
   - `QuizSection.tsx`: Interactive quiz with scoring
   - `ChatSection.tsx`: Real-time Q&A interface

3. **State Management**
   - React hooks (useState, useEffect)
   - sessionStorage for document persistence
   - No global state management (Redux/Zustand) needed for MVP

#### Backend (API Routes)

1. **Upload Endpoint** (`/api/upload-simple`)
   - Receives base64-encoded PDF
   - Validates file type and size
   - Extracts text using pdf-parse
   - Returns extracted text

2. **Analysis Endpoint** (`/api/analyze`)
   - Receives document text
   - Calls OpenRouter API 4 times in parallel:
     - Summary generation
     - Keyword extraction
     - Concept explanation
     - Quiz generation
   - Returns structured analysis data

3. **Chat Endpoint** (`/api/chat`)
   - Receives document text and user question
   - Calls OpenRouter API with chat prompt
   - Returns AI-generated answer

### Data Flow

#### Upload Flow

```
1. User selects PDF file
2. File converted to base64
3. POST /api/upload-simple
4. PDF buffer created from base64
5. pdf-parse extracts text
6. Text returned to client
7. Text stored in sessionStorage
8. Redirect to /dashboard
```

#### Analysis Flow

```
1. Dashboard loads
2. Text retrieved from sessionStorage
3. POST /api/analyze with text
4. Server creates 4 parallel OpenRouter API calls
5. All results combined into single response
6. Dashboard displays results
```

#### Chat Flow

```
1. User types question
2. POST /api/chat with text + question
3. Server calls OpenRouter API
4. Answer returned to client
5. Message added to chat history
```

## Technology Decisions

### Why Next.js Pages Router?

- Simpler setup for MVP
- Built-in API routes
- No need for separate backend server
- Easy deployment to Vercel/Netlify

### Why sessionStorage?

- No database required for MVP
- Simple state persistence
- Automatic cleanup on browser close
- Sufficient for single-session use

### Why pdf-parse?

- Lightweight and reliable
- Good text extraction quality
- Works well with Node.js Buffer
- No external dependencies

### Why OpenRouter?

- Access to multiple AI models
- Simple API interface
- Free tier available (Gemini 2.0 Flash)
- Unified API for different models

## API Integration

### OpenRouter API

**Model**: `google/gemini-2.0-flash-exp:free`

**Request Format**:
```json
{
  "model": "google/gemini-2.0-flash-exp:free",
  "messages": [
    {
      "role": "user",
      "content": "prompt text"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 2000
}
```

**Response Format**:
```json
{
  "choices": [
    {
      "message": {
        "content": "AI response text"
      }
    }
  ]
}
```

### Error Handling

- All API calls wrapped in try-catch
- User-friendly error messages
- Fallback UI states
- Retry mechanisms for failed requests

## Security Considerations

1. **File Validation**
   - Type checking (PDF only)
   - Size limits (20 MB)
   - Server-side validation

2. **API Key Security**
   - Stored in environment variables
   - Never exposed to client
   - Server-side only usage

3. **Input Sanitization**
   - Text truncation for large documents
   - Prompt injection prevention
   - Safe JSON parsing

## Performance Optimizations

1. **Parallel API Calls**
   - Analysis endpoint makes 4 parallel requests
   - Reduces total processing time

2. **Text Truncation**
   - Documents limited to 50,000 characters
   - Prevents token limit issues
   - Maintains context for analysis

3. **Client-Side Caching**
   - Analysis results stored in component state
   - No redundant API calls
   - sessionStorage for persistence

## Scalability Considerations

### Current Limitations

- Single document processing
- In-memory storage only
- No user accounts
- No document history

### Future Scaling Path

1. **Database Integration**
   - Store documents and analysis
   - User authentication
   - Document history

2. **Queue System**
   - Background job processing
   - Handle multiple documents
   - Rate limiting

3. **Caching Layer**
   - Redis for analysis results
   - Reduce API calls
   - Faster response times

4. **CDN Integration**
   - Static asset optimization
   - Global content delivery

## Deployment

### Recommended Platforms

1. **Vercel** (Recommended)
   - Native Next.js support
   - Automatic deployments
   - Environment variable management

2. **Netlify**
   - Easy setup
   - Good for static sites
   - Serverless functions

3. **Self-Hosted**
   - Docker containerization
   - Node.js server
   - Reverse proxy (nginx)

### Environment Variables

Required for production:
- `OPENROUTER_API_KEY`
- `NEXT_PUBLIC_APP_URL` (your domain)

## Monitoring & Logging

### Current Implementation

- Console logging for errors
- Error boundaries in React
- User-facing error messages

### Recommended Additions

- Error tracking (Sentry)
- Analytics (Google Analytics)
- API usage monitoring
- Performance metrics

## Testing Strategy

### Unit Tests (Recommended)

- PDF extraction functions
- Prompt generation
- API response parsing

### Integration Tests (Recommended)

- API endpoint testing
- End-to-end user flows
- Error scenarios

### Manual Testing Checklist

- [ ] PDF upload works
- [ ] Text extraction successful
- [ ] All analysis features work
- [ ] Quiz interaction works
- [ ] Chat functionality works
- [ ] Error handling works
- [ ] Mobile responsiveness

---

This architecture is designed for MVP simplicity while maintaining a path for future enhancements.

