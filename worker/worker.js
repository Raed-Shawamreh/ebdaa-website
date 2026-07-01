// Cloudflare Worker — عدّاد زيارات موقع Ebdaa
// نشر: wrangler deploy   (أو عبر Dashboard)
// يستخدم KV namespace اسمه STATS (اربطه في wrangler.toml)

const CORS = {
  'Access-Control-Allow-Origin': 'https://ebdaa.raedshaw.online',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    if (url.pathname === '/hit') {
      // زيادة عدّاد الزيارات (مع de-dup بسيط لكل IP لمدة ساعة)
      const ip = request.headers.get('CF-Connecting-IP') || 'anon';
      const dedupKey = `seen:${ip}`;
      const seen = await env.STATS.get(dedupKey);

      let visits = parseInt(await env.STATS.get('visits')) || 0;

      if (!seen) {
        visits += 1;
        await env.STATS.put('visits', String(visits));
        await env.STATS.put(dedupKey, '1', { expirationTtl: 3600 });
      }

      return new Response(JSON.stringify({ visits }), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    if (url.pathname === '/count') {
      // قراءة فقط بدون زيادة
      const visits = parseInt(await env.STATS.get('visits')) || 0;
      return new Response(JSON.stringify({ visits }), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    return new Response('Not Found', { status: 404, headers: CORS });
  },
};
