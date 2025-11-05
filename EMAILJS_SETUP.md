# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form on your website to send emails to `mi.tech0786@gmail.com`.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month on free tier)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions:
   - For Gmail: Click "Connect Account" and authorize EmailJS
   - Note down your **Service ID** (e.g., `service_xxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Choose a template type or start from scratch
4. Set up your template with these variables:
   - `{{from_name}}` - Sender's full name
   - `{{from_email}}` - Sender's email address
   - `{{company}}` - Sender's company (optional)
   - `{{message}}` - The message content
   - `{{to_email}}` - Recipient email (will be `mi.tech0786@gmail.com`)

### Example Template:

**Subject:** New Contact Form Submission from {{from_name}}

**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00B4D8 0%, #0077B6 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Contact Form Message</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">You have a new inquiry from your website</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="margin-bottom: 30px;">
                <div style="display: inline-block; background-color: #00B4D8; color: #ffffff; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  Contact Details
                </div>
              </div>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #333333; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; width: 120px;">Name:</strong>
                    <span style="color: #666666; font-size: 15px;">{{from_name}}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #333333; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; width: 120px;">Email:</strong>
                    <a href="mailto:{{from_email}}" style="color: #00B4D8; font-size: 15px; text-decoration: none;">{{from_email}}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #333333; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; width: 120px;">Company:</strong>
                    <span style="color: #666666; font-size: 15px;">{{company}}</span>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 30px;">
                <div style="background-color: #f8f9fa; border-left: 4px solid #00B4D8; padding: 20px; border-radius: 6px;">
                  <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 16px; font-weight: 600;">Message:</h3>
                  <p style="margin: 0; color: #555555; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                This email was sent from your website contact form at ApexifyLabs
              </p>
              <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px;">
                <a href="mailto:{{from_email}}" style="color: #00B4D8; text-decoration: none;">Reply to {{from_email}}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Plain Text Version (backup):**
```
Hello,

You have received a new message from your website contact form:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NAME: {{from_name}}
EMAIL: {{from_email}}
COMPANY: {{company}}

MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: {{from_email}}

This email was sent from your website contact form.
```

5. Set **To Email** to: `mi.tech0786@gmail.com`
6. Set **From Name** to: `{{from_name}}`
7. Set **Reply To** to: `{{from_email}}` (so you can reply directly)
8. Click **Save**
9. Note down your **Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
3. Copy the key (e.g., `xxxxxxxxxxxxxxxxxxxx`)

## Step 5: Update Configuration

1. Open `src/config/constants.ts`
2. Replace the placeholder values in `EMAILJS_CONFIG`:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: "service_xxxxx",        // Your Service ID from Step 2
  TEMPLATE_ID: "template_xxxxx",     // Your Template ID from Step 3
  PUBLIC_KEY: "xxxxxxxxxxxxxxxxxxxx", // Your Public Key from Step 4
  RECIPIENT_EMAIL: "mi.tech0786@gmail.com", // Already set correctly
};
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email inbox (`mi.tech0786@gmail.com`) for the message

## Troubleshooting

### Form shows "Configuration Required" error
- Make sure you've updated all three values in `EMAILJS_CONFIG`
- Ensure there are no extra spaces or quotes in the values

### Email not received
- Check your spam folder
- Verify the "To Email" in your EmailJS template is correct
- Check the EmailJS dashboard for any error logs
- Make sure your email service is connected properly

### Form validation errors
- Ensure all required fields (*) are filled
- Email must be in valid format (contains @)
- Message field cannot be empty

## Security Notes

- The Public Key is safe to expose in frontend code (it's designed for client-side use)
- EmailJS free tier allows 200 emails per month
- For higher volume, consider upgrading to a paid plan

## Need Help?

If you encounter issues:
1. Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Verify all configuration values are correct
3. Check browser console for any error messages

