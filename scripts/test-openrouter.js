
const { callOpenRouter } = require('../lib/openrouter');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

async function test() {
    console.log('Testing OpenRouter with model:', 'google/gemini-2.0-flash-exp:free');
    try {
        const result = await callOpenRouter('Say hello in one word.');
        console.log('Success! Result:', result);
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();
