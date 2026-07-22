# QuizAI Telegram Bot

Telegram bot for QuizAI with native Chapa payments.

## Features
- 📚 Grade-based quiz selection
- 🔒 Locked quizzes with Chapa payments
- 📊 Student reports
- 🤖 AI-powered quiz results

## Deployment

### Render
1. Push to GitHub
2. Connect repo to Render
3. Add environment variables

### Docker
```bash
docker build -t quizai-telegram-bot .
docker run -p 3000:3000 --env-file .env quizai-telegram-bot