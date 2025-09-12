// api/sheets.js

// Vercelの設定画面で教える「秘密の鍵」を、ここで読み込んでいます
const SPREADSHEET_API_URL = process.env.APPS_SCRIPT_URL;
const SPREADSHEET_API_KEY = process.env.APPS_SCRIPT_API_KEY;

// この関数が、インターネットからのリクエストを受け取ります
export default async function handler(req, res) {
  // もしVercelに秘密の鍵を教えていなかったら、エラーを返します
  if (!SPREADSHEET_API_URL || !SPREADSHEET_API_KEY) {
    return res.status(500).json({ error: 'Proxy is not configured. Missing API URL or Key.' });
  }

  try {
    // ウェブサイトからの「?sheet=...&limit=...」という情報をそのまま受け取ります
    const queryParams = new URLSearchParams(req.query).toString();

    // ここが重要！秘密の鍵を付けて、スプレッドシートAPIのURLを完成させます
    const targetUrl = `${SPREADSHEET_API_URL}?api_key=${SPREADSHEET_API_KEY}&${queryParams}`;

    // 完成したURLを使って、スプレッドシートAPIにこっそりアクセスします
    const response = await fetch(targetUrl);
    const data = await response.json();

    // 誰でもこのAPIを使えるようにするおまじない
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // スプレッドシートAPIからの結果を、そのままウェブサイトに返します
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy failed to fetch from Apps Script:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}