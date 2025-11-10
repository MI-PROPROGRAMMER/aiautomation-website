/**
 * Centralized configuration for external links and URLs
 * Update these values in one place to change them across the entire application
 */

export const CALENDLY_LINK = "https://calendly.com/mi-tech0786";

const {
    VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID,
    VITE_EMAILJS_PUBLIC_KEY,
    VITE_EMAILJS_RECIPIENT_EMAIL,
    VITE_LINKEDIN_URL,
    VITE_TWITTER_URL,
    VITE_CONTACT_EMAIL,
} = import.meta.env;

/**
 * Contact form email configuration
 * To set up EmailJS:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Get your Public Key from Account > API Keys
 * 5. Update the values below with your EmailJS credentials
 */
export const EMAILJS_CONFIG = {
    SERVICE_ID: VITE_EMAILJS_SERVICE_ID ?? "service_i3yrpfj",
    TEMPLATE_ID: VITE_EMAILJS_TEMPLATE_ID ?? "template_vn1y573",
    PUBLIC_KEY: VITE_EMAILJS_PUBLIC_KEY ?? "0hGe-sdAvI-MwhtdZ",
    RECIPIENT_EMAIL: VITE_EMAILJS_RECIPIENT_EMAIL ?? "mi.tech0786@gmail.com",
};

export const CONTACT_EMAIL = VITE_CONTACT_EMAIL ?? "contact@apexifylabs.com";

export const SOCIAL_LINKS = {
    linkedin: VITE_LINKEDIN_URL ?? "https://www.linkedin.com/company/apexifylabs",
    twitter: VITE_TWITTER_URL ?? "https://twitter.com/apexifylabs",
    email: `mailto:${CONTACT_EMAIL}`,
};

