# OCR Text Extractor

A modern web application for extracting text from images using Optical Character Recognition (OCR). Built with Express.js, TypeScript, and Tesseract.js for serverless deployment on Vercel.

## Features

- Upload images via click or drag-and-drop
- Support for multiple image formats (PNG, JPG, GIF, BMP, WEBP)
- Real-time text extraction using Tesseract.js
- Clean, responsive UI with shadcn/ui inspired design
- Copy extracted text to clipboard
- Download extracted text as TXT file
- File size validation (max 10MB)
- Progress indicators during processing
- Mobile-friendly responsive design

## Tech Stack

- **Backend**: Express.js with TypeScript
- **OCR Engine**: Tesseract.js
- **File Upload**: Multer
- **Frontend**: Vanilla JavaScript with modern CSS
- **Icons**: Phosphor Icons
- **Deployment**: Vercel (serverless)

## API Endpoints

### POST /api/ocr

Extract text from uploaded image.

**Request**: Multipart form data with `image` field
**Response**:

```json
{
  "text": "extracted text content",
  "filename": "original-filename.jpg",
  "size": 1234567
}
```

### GET /api/health

Health check endpoint.

**Response**:

```json
{
  "status": "OK",
  "timestamp": "2025-09-17T10:30:00.000Z"
}
```

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development server:

   ```bash
   pnpm run dev
   ```

3. Open http://localhost:3000

### Build

```bash
pnpm run build
```

## Deployment

The application is configured for serverless deployment on Vercel with the included `vercel.json` configuration.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

The application will be available at your Vercel domain.

## File Structure

```
├── src/
│   └── index.ts          # Express server and OCR API
├── public/
│   └── index.html        # Frontend application
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment config
└── README.md             # Documentation
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (production/development)

### File Upload Limits

- Maximum file size: 10MB
- Supported formats: JPEG, PNG, GIF, BMP, WEBP

## License

MIT
