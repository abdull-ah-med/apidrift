# Email Setup Guide

This project uses [Resend](https://resend.com) for sending emails from the contact form.

## Setup Steps

### 1. Install Resend Package

```bash
npm install resend
```

### 2. Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Navigate to API Keys section
3. Create a new API key
4. Copy the API key

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your values:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   EMAIL_FROM=onboarding@resend.dev
   EMAIL_TO=your-email@example.com
   ```

   - `RESEND_API_KEY`: Your Resend API key
   - `EMAIL_FROM`: The sender email (use `onboarding@resend.dev` for testing)
   - `EMAIL_TO`: Your email address where you want to receive form submissions

### 4. Verify Domain (Production Only)

For production, you need to verify your domain in Resend:

1. Go to Resend dashboard → Domains
2. Add your domain
3. Add the DNS records provided by Resend
4. Once verified, update `EMAIL_FROM` to use your domain (e.g., `contact@yourdomain.com`)

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the landing page
3. Click "Join the Waitlist" or "Get Started"
4. Fill in the email form and submit
5. Check your inbox for the email

## API Endpoint

**POST** `/api/contact`

Request body:
```json
{
  "email": "user@example.com",
  "message": "User's message here"
}
```

Response (success):
```json
{
  "success": true,
  "messageId": "email_id_from_resend"
}
```

Response (error):
```json
{
  "error": "Error message"
}
```

## Alternative Email Services

If you want to use a different email service instead of Resend, you can modify `/app/api/contact/route.ts`:

- **Nodemailer**: For using SMTP
- **SendGrid**: Another popular email API
- **AWS SES**: Amazon's email service
- **Mailgun**: Another email API option

## Troubleshooting

### "Cannot find module 'resend'"
Run `npm install resend` to install the package.

### "Failed to send email"
- Check that your `RESEND_API_KEY` is correct in `.env.local`
- Verify the API key is active in your Resend dashboard
- Check the server console for detailed error messages

### Emails not arriving
- Check spam folder
- Verify `EMAIL_TO` is correct
- For production, ensure domain is verified in Resend

## Free Tier Limits

Resend free tier includes:
- 3,000 emails per month
- 100 emails per day
- Perfect for testing and small projects

For production with higher volume, consider upgrading to a paid plan.
