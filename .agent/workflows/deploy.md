---
description: How to deploy the Nugas.AI application
---

# Deploying Nugas.AI

This guide covers multiple deployment options for the Nugas.AI application.

## Prerequisites

Before deploying, ensure you have:
- An OpenRouter API key ([Get one here](https://openrouter.ai/))
- A GitHub account (recommended for most deployment options)
- Your project pushed to a GitHub repository

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest option for Next.js applications and offers a generous free tier.

### Steps:

1. **Push your code to GitHub** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/nugas-ai.git
   git push -u origin main
   ```

2. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

3. **Import your project**
   - Click "Add New Project"
   - Select your `nugas-ai` repository
   - Vercel will auto-detect Next.js settings

4. **Configure environment variables**
   - In the deployment settings, add these environment variables:
     - `OPENROUTER_API_KEY`: Your OpenRouter API key
     - `NEXT_PUBLIC_APP_URL`: Will be auto-filled after first deployment

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)

6. **Update the app URL**
   - After deployment, copy your Vercel URL (e.g., `https://nugas-ai.vercel.app`)
   - Go to Settings → Environment Variables
   - Update `NEXT_PUBLIC_APP_URL` with your Vercel URL
   - Redeploy the application

### Automatic Deployments
Every push to your `main` branch will automatically trigger a new deployment.

---

## Option 2: Deploy to Netlify

Netlify is another excellent option with a generous free tier.

### Steps:

1. **Push your code to GitHub** (if not already done)

2. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

3. **Create a new site**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

4. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Show advanced" and add environment variables:
     - `OPENROUTER_API_KEY`: Your OpenRouter API key

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete

6. **Update environment variables**
   - After deployment, go to Site settings → Environment variables
   - Add/update `NEXT_PUBLIC_APP_URL` with your Netlify URL
   - Trigger a redeploy

---

## Option 3: Deploy to Railway

Railway offers a simple deployment process with a free tier.

### Steps:

1. **Push your code to GitHub** (if not already done)

2. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

3. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `nugas-ai` repository

4. **Configure environment variables**
   - Click on your deployment
   - Go to "Variables" tab
   - Add:
     - `OPENROUTER_API_KEY`: Your OpenRouter API key
     - `NEXT_PUBLIC_APP_URL`: Your Railway URL (will be provided after deployment)

5. **Deploy**
   - Railway will automatically detect Next.js and deploy
   - Wait for the build to complete

6. **Get your URL**
   - Click "Settings" → "Generate Domain"
   - Update `NEXT_PUBLIC_APP_URL` with this domain
   - Redeploy if needed

---

## Option 4: Deploy to a VPS (DigitalOcean, AWS, etc.)

For more control, you can deploy to a Virtual Private Server.

### Steps:

1. **Set up your server**
   - Create a VPS instance (Ubuntu 22.04 recommended)
   - SSH into your server

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2 (process manager)**
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone your repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nugas-ai.git
   cd nugas-ai
   ```

5. **Install dependencies**
   ```bash
   npm install
   ```

6. **Create environment file**
   ```bash
   nano .env.local
   ```
   Add:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   NEXT_PUBLIC_APP_URL=http://your-server-ip:3000
   ```

7. **Build the application**
   ```bash
   npm run build
   ```

8. **Start with PM2**
   ```bash
   pm2 start npm --name "nugas-ai" -- start
   pm2 save
   pm2 startup
   ```

9. **Set up Nginx (optional, for custom domain)**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/nugas-ai
   ```
   
   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/nugas-ai /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Set up SSL with Let's Encrypt (optional)**
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d your-domain.com
    ```

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Verify the application loads correctly
- [ ] Test PDF upload functionality
- [ ] Test AI analysis features (summary, keywords, concepts)
- [ ] Test quiz generation
- [ ] Test chat functionality
- [ ] Check that all environment variables are set correctly
- [ ] Monitor API usage on OpenRouter dashboard
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (most platforms do this automatically)

---

## Monitoring and Maintenance

### Check Application Logs
- **Vercel**: Dashboard → Your Project → Deployments → View Function Logs
- **Netlify**: Site → Deploys → Deploy log
- **Railway**: Project → Deployments → Logs
- **VPS**: `pm2 logs nugas-ai`

### Update Your Application
1. Make changes to your code
2. Commit and push to GitHub
3. Most platforms will auto-deploy, or trigger a manual deploy

### Monitor API Usage
- Check your OpenRouter dashboard regularly
- Set up usage alerts if available
- Consider implementing rate limiting for production

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version is 18 or higher
- Check build logs for specific errors

### Environment Variables Not Working
- Ensure variables are set in the deployment platform
- Remember: `NEXT_PUBLIC_*` variables are embedded at build time
- Redeploy after changing environment variables

### API Calls Failing
- Verify `OPENROUTER_API_KEY` is set correctly
- Check API quota/credits on OpenRouter
- Review function logs for detailed error messages

### PDF Upload Not Working
- Check file size limits on your hosting platform
- Verify serverless function timeout settings (increase if needed)
- For Vercel: Free tier has 10s timeout, Pro has 60s

---

## Cost Considerations

### Free Tier Limits
- **Vercel**: 100GB bandwidth, 100 hours build time/month
- **Netlify**: 100GB bandwidth, 300 build minutes/month
- **Railway**: $5 free credit/month
- **OpenRouter**: Pay-per-use (Gemini 2.0 Flash is very affordable)

### Recommended for Production
- Start with Vercel or Netlify free tier
- Monitor usage and upgrade if needed
- Set up billing alerts on OpenRouter

---

**Need help?** Check the [README.md](../README.md) for additional troubleshooting tips.
