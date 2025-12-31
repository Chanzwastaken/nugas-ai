
const path = require('path');
const fs = require('fs');

// Load environment variables manually
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf8');
    content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // Remove quotes
            process.env[key] = value;
        }
    });
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const axios = require('axios');
const MODEL = 'mistralai/mistral-small-3.1-24b-instruct:free';

async function test() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    console.log('API Key present:', !!apiKey);
    console.log('Testing Model:', MODEL);

    try {
        const response = await axios.post(OPENROUTER_API_URL, {
            model: MODEL,
            messages: [{ role: 'user', content: 'Hello' }],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Nugas.AI',
            }
        });

        console.log('Success!', JSON.stringify(response.data, null, 2));

    } catch (error) {
        if (error.response) {
            console.error('Response Error:', error.response.status, error.response.data);
        } else {
            console.error('Axios Error:', error.message);
        }
    }
}

test();
