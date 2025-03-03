import { NextRequest, NextResponse } from 'next/server';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const languageHint = formData.get('language') as string || 'en';

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Create a temporary file for processing
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Initialize Vision client with environment variables
    const visionClient = new ImageAnnotatorClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
    });
    
    // Perform OCR
    const [result] = await visionClient.documentTextDetection({
      image: { content: buffer },
      imageContext: {
        languageHints: [languageHint],
      },
    });
    
    const fullTextAnnotation = result.fullTextAnnotation;
    
    return NextResponse.json({
      success: true,
      text: fullTextAnnotation?.text || '',
      confidence:
        result.textAnnotations && result.textAnnotations.length > 0
          ? result.textAnnotations[0].confidence
          : 0,
    });
  } catch (error) {
    console.error('Vision API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}