# Assignment Marker

A Next.js application that helps teachers grade student assignments using AI. The app allows teachers to upload assignments (including handwritten work), processes them with OCR, and provides AI-generated feedback.

## Features

- Create and save assignment details (name, grade level, subject, rubric)
- Upload student assignments as text or images
- OCR processing for handwritten assignments (supports English, French, Spanish)
- AI grading and feedback
- Mobile-friendly interface for taking photos of assignments

## Technology Stack

- **Frontend & Backend**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **OCR**: Google Cloud Vision API
- **AI Grading**: OpenAI API

## Local Development

### Prerequisites

- Node.js 16+ and npm
- Google Cloud Vision API credentials
- OpenAI API key

### Setup

1. Clone the repository
2. Install dependencies
   ```bash
   npm install