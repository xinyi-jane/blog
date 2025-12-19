// GitHub OAuth 代理服务
// 部署到 Vercel Serverless Functions
// Vercel 会自动识别 api/ 目录下的文件作为 Serverless Functions

export default async function handler(req, res) {
  // 处理 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query } = req;
  
  if (method === 'GET' && query.provider === 'github' && !query.code) {
    // 重定向到 GitHub OAuth
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: 'GITHUB_CLIENT_ID not configured' });
    }
    
    const redirectUri = process.env.OAUTH_REDIRECT_URI || 
      `https://${req.headers.host}/api/auth?provider=github`;
    const state = query.state || Math.random().toString(36).substring(7);
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=repo`;
    
    res.setHeader('Location', authUrl);
    return res.status(302).end();
  }
  
  if (method === 'GET' && query.provider === 'github' && query.code) {
    // 处理 OAuth 回调
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const code = query.code;
    
    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'OAuth credentials not configured' });
    }
    
    try {
      // 交换 access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
        }),
      });
      
      const tokenData = await tokenResponse.json();
      
      if (tokenData.error) {
        return res.status(400).json({ error: tokenData.error_description || tokenData.error });
      }
      
      // 重定向到 admin 页面，并传递 token
      // Decap CMS 会使用这个 token 进行后续认证
      const adminUrl = process.env.ADMIN_URL || 'https://xinyi-jane.github.io/blog/admin/';
      const redirectUrl = `${adminUrl}?token=${tokenData.access_token}`;
      
      res.setHeader('Location', redirectUrl);
      return res.status(302).end();
    } catch (error) {
      console.error('OAuth error:', error);
      return res.status(500).json({ error: error.message });
    }
  }
  
  return res.status(404).json({ error: 'Not found' });
}
