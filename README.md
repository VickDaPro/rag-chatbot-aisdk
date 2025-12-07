# RAG Chatbot with AI SDK

A modern Retrieval-Augmented Generation (RAG) chatbot built with [Next.js](https://nextjs.org), [Vercel AI SDK](https://sdk.vercel.ai), and vector-powered search. This application allows users to upload PDF documents, which are processed and stored in a vector database, enabling intelligent semantic search and AI-powered conversations grounded in your knowledge base.

## Features

### 📄 Document Management

- **PDF Upload & Processing**: Upload PDF documents that are automatically processed and chunked
- **Intelligent Chunking**: Uses recursive character text splitting with overlap for optimal chunk management
- **Vector Embeddings**: Converts document chunks into embeddings using OpenAI's `text-embedding-3-small` model for semantic understanding

### 🔍 Semantic Search

- **Vector Database**: PostgreSQL with pgvector extension for efficient similarity search
- **Cosine Distance Similarity**: Uses HNSW indexing for fast approximate nearest neighbor search
- **Configurable Thresholds**: Adjustable similarity thresholds for search result relevance

### 💬 AI-Powered Chat

- **Multi-Model Support**: Integrates with Google Generative AI and OpenAI models via Vercel AI SDK
- **Tool-Enabled Conversations**: AI can autonomously search the knowledge base using the `searchKnowledgeBase` tool
- **Streaming Responses**: Real-time response streaming for improved user experience
- **Context-Aware Responses**: Conversations are grounded in uploaded documents for accurate, relevant answers

### 🎨 User Interface

- **Modern Component Library**: Built with Radix UI primitives and fully customizable components
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Dark Mode Support**: Theme switching with `next-themes`
- **Real-time Chat Interface**: Interactive conversation UI with message streaming and loading states
- **Visual Elements**: Charts (via Recharts), carousels, accordions, and more

### 🔐 Authentication & Security

- **Clerk Integration**: User authentication and management with Clerk
- **Type-Safe Database**: Drizzle ORM with TypeScript for safe database operations

## Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **UI Library**: [React 19](https://react.dev) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with custom component library
- **UI Components**: [Radix UI](https://www.radix-ui.com)
- **Forms**: [React Hook Form](https://react-hook-form.com) with Zod validation
- **Visualization**: [Recharts](https://recharts.org), [Embla Carousel](https://www.embla-carousel.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Animations**: [Motion](https://motion.dev)

### Backend & AI

- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai) for streaming and tool integration
- **AI Models**:
  - [Google Generative AI](https://ai.google.dev) (via `@ai-sdk/google`)
  - [OpenAI](https://openai.com) (via `@ai-sdk/openai`)
- **Text Processing**: [LangChain Text Splitters](https://js.langchain.com) for document chunking
- **Embeddings**: OpenAI text-embedding-3-small model

### Database

- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Database**: PostgreSQL with Neon (serverless)
- **Vector Extension**: pgvector for semantic search capabilities
- **Migrations**: Drizzle migrations for schema management

### PDF Processing

- **PDF Parsing**: [pdf-parse](https://www.npmjs.com/package/pdf-parse)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (or Neon serverless instance)
- OpenAI API key
- Google Generative AI API key
- Clerk authentication credentials

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rag-chatbot-aisdk
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables in `.env.local`:

```env
# Database
DATABASE_URL=postgresql://...

# AI Models
OPENAI_API_KEY=sk_...
GOOGLE_GENERATIVE_AI_API_KEY=...

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

4. Run database migrations:

```bash
npm run db:push
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Upload Documents

1. Navigate to the `/upload` page
2. Select a PDF file from your computer
3. The document will be processed, chunked, and indexed in the vector database

### Chat with Your Knowledge Base

1. Navigate to the `/chat` page
2. Type your questions about the uploaded documents
3. The AI will search your knowledge base and provide context-aware answers
4. The chatbot can autonomously use the `searchKnowledgeBase` tool to find relevant information

## Project Structure

- `/app` - Next.js app directory with pages and API routes
  - `/api/chat` - Chat endpoint handling RAG queries
  - `/chat` - Chat interface page
  - `/upload` - PDF upload page
- `/components` - React components
  - `/ai-elements` - Custom components for AI interactions
  - `/ui` - Reusable UI components
- `/lib` - Utility functions
  - `db-config.ts` - Database configuration
  - `db-schema.ts` - Database schema definition
  - `search.ts` - Vector search implementation
  - `embeddings.ts` - Embedding generation
  - `chunking.ts` - Document chunking logic
- `/migrations` - Database schema migrations
- `/types` - TypeScript type definitions

## Configuration

### Search Settings

Adjust similarity search thresholds and limits in `/lib/search.ts`:

- `limit`: Maximum number of documents to return (default: 5)
- `threshold`: Cosine similarity threshold (default: 0.5)

### Chunking Settings

Customize document chunking in `/lib/chunking.ts`:

- `chunkSize`: Size of each text chunk (default: 150)
- `chunkOverlap`: Overlap between chunks (default: 20)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key for embeddings
- `GOOGLE_GENERATIVE_AI_API_KEY` - Google Generative AI API key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

## License

MIT
