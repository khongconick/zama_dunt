# 🚀 Deploy Duck Hunt to Vercel

## Quick Deploy

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com/
   - Click "Add New" → "Project"

2. **Import Repository**
   - Choose "Import Git Repository"
   - Connect your GitHub account if not already
   - Select repository: `khongconick/zama_dunt`

3. **Configure Project**
   ```
   Framework Preset: Create React App
   Root Directory: frontend-fhe-dunt
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Environment Variables**
   Add these in Vercel dashboard under "Environment Variables":
   ```
   REACT_APP_FHEVM_CONTRACT_ADDRESS=0xA433850DC1738b07393ea54F7FE4e825924aC9b8
   REACT_APP_RELAYER_URL=https://relayer.testnet.zama.cloud
   REACT_APP_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
   REACT_APP_ETHERSCAN_API_KEY=your-etherscan-api-key
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your deployment URL: `https://your-project.vercel.app`

---

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Navigate to Frontend Directory
```bash
cd frontend-fhe-dunt
```

#### Step 4: Deploy
```bash
# For production
vercel --prod

# For preview
vercel
```

#### Step 5: Set Environment Variables
```bash
vercel env add REACT_APP_FHEVM_CONTRACT_ADDRESS
vercel env add REACT_APP_RELAYER_URL
vercel env add REACT_APP_SEPOLIA_RPC_URL
vercel env add REACT_APP_ETHERSCAN_API_KEY
```

---

## 📋 Pre-Deployment Checklist

- ✅ Update `frontend-fhe-dunt/.env` with production values
- ✅ Test build locally: `npm run build`
- ✅ Verify contract address is correct
- ✅ Check CORS headers in `vercel.json`
- ✅ Ensure WASM files are in `public/wasm/`

---

## 🔧 Configuration Files

### vercel.json
Already configured in `frontend-fhe-dunt/vercel.json` with:
- CORS headers for WASM
- Build settings
- Output directory

### package.json
Build scripts already set up:
- `npm start` - Development
- `npm run build` - Production build
- `npm test` - Run tests

---

## 🌐 After Deployment

1. **Test Your Deployment**
   - Connect wallet (MetaMask)
   - Buy plays
   - Play Duck Hunt
   - Submit score

2. **Update README**
   - Replace demo URL with your Vercel URL
   - Update badges

3. **Set Custom Domain (Optional)**
   - Go to Vercel dashboard
   - Project Settings → Domains
   - Add your custom domain

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild locally
cd frontend-fhe-dunt
rm -rf node_modules package-lock.json
npm install
npm run build
```

### WASM Loading Issues
- Check CORS headers in vercel.json
- Verify WASM files exist in `public/wasm/`
- Check browser console for errors

### Environment Variables Not Working
- Make sure variable names start with `REACT_APP_`
- Redeploy after adding env vars
- Check Vercel dashboard → Settings → Environment Variables

### MetaMask Connection Issues
- Verify contract address is correct
- Check network (Sepolia testnet)
- Clear browser cache

---

## 📊 Monitoring

- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → Logs
- **Performance**: Use Lighthouse in Chrome DevTools

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:
- `master` branch → Production
- Other branches → Preview deployments

To disable auto-deploy:
- Go to Project Settings → Git
- Configure deployment branches

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: https://github.com/khongconick/zama_dunt/issues

