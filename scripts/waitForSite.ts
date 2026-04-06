import fetch from 'node-fetch';

export async function waitForSite(url: string, timeout = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log('Site is live!');
        return;
      }
    } catch {}
    await new Promise(r => setTimeout(r, 2000));
    console.log('Waiting for site...');
  }
  throw new Error(`Site did not become live: ${url}`);
}