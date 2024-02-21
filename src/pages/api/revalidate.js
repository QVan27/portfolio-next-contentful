export default async function handler(req, res) {
  // Contentful sends secrets as a header
  const secret = req.headers['secret'];
  // Contentful sends additional info in the body, like the page type, id etc
  const body = JSON.parse(req.body);
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.CMS_SECRET_TOKEN) {
    // You can check invalid logs in your host, Vercel/Netlify etc
    return res.status(401).json({ message: 'Invalid token' });
  }
  try {
    // Revalidate this page only when this webhook is called
    // And yes the way Contentful sends the slug is messy :(
    await res.unstable_revalidate(body?.sys?.contentType?.sys?.id);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}