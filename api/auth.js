// GitHub OAuth 代理服务
// 部署到 Vercel Serverless Functions

export default async function handler(req, res) {
  const { method, query } = req;
  
  if (method === 'GET' && query.provider === 'github' && !query.code) {
    // 重定向到 GitHub OAuth
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: 'GITHUB_CLIENT_ID not configured' });
    }
    
    const origin = req.headers.origin || req.headers.host ? `https://${req.headers.host}` : '';
    const redirectUri = process.env.OAUTH_REDIRECT_URI || `${origin}/api/auth?provider=github`;
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
      
      // 注意：Decap CMS 需要特定的认证流程
      // 这里返回 token，但实际使用时 Decap CMS 会处理认证
      // 如果部署在 GitHub Pages，需要将 token 传递给 CMS
      const adminUrl = process.env.ADMIN_URL || '/admin/';
      res.setHeader('Location', `${adminUrl}?token=${tokenData.access_token}`);
      return res.status(302).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  return res.status(404).json({ error: 'Not found' });
}

