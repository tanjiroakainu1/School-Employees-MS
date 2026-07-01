/**
 * Chatbot AI test runner — run with: npm run test:chatbot
 */
import { runChatbotTests } from '../src/services/chatbotAI.js';

const { passed, failed, results } = runChatbotTests();

console.log('\n🎓 SAGE Chatbot AI Test Results\n');
console.log('='.repeat(50));
results.forEach((r) => console.log(r));
console.log('='.repeat(50));
console.log(`\n✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total:  ${passed + failed}`);
console.log(failed === 0 ? '\n🎉 All AI tests passed!\n' : '\n⚠️  Some tests failed.\n');

process.exit(failed > 0 ? 1 : 0);
