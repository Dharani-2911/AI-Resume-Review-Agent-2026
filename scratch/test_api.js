import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Parse .env manually
let apiKey = '';
try {
  const envPath = path.resolve('.env');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
  if (match) {
    apiKey = match[1].trim();
  }
} catch (e) {
  console.log('Could not read .env file', e.message);
}

console.log('Using API Key beginning with:', apiKey ? apiKey.substring(0, 10) : 'None');

const modelsToTest = [
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-1.5-pro',
  'gemini-2.0-pro-exp-02-05',
];

async function test() {
  if (!apiKey) {
    console.error('API key is empty');
    return;
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);

  for (const modelName of modelsToTest) {
    try {
      console.log(`\nTesting model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello');
      console.log(`✅ Success for ${modelName}! Response:`, result.response.text());
      return; // Stop if we find a working one
    } catch (error) {
      console.error(`❌ Failed for ${modelName}:`, error.message);
    }
  }
}

test();
