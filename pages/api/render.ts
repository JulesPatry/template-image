// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nodeHtmlToImage from 'node-html-to-image';
import fs from 'fs';

const renderCss = `<style>${fs.readFileSync('styles/render.css').toString()}</style>`;
const image = fs.readFileSync('public/aw-icon.png');
// @ts-ignore
const base64Image = new Buffer.from(image).toString('base64');
const dataURI = 'data:image/jpeg;base64,' + base64Image;

type Data = {
  name: string;
};

const head = '<head>';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  let html = (req.query.r || '') as string;
  console.log(html);

  const headIndex = html.indexOf(head);
  if (headIndex) {
    html = html.substring(0, headIndex + head.length) + renderCss + html.substring(headIndex + head.length, html.length);
  }

  const image = await nodeHtmlToImage({
    html,
    content: { imageSource: dataURI },
  });
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
}

// <html>
//         <head>
//           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap">
//         </head>
//         <body>
//           <img src="{{imageSource}}" style="width:504px; height:568px;margin-bottom: 20px;" />
//           <h1  style="margin-bottom: 200px;">
//             Check out what I just did! #cool
//           </h1>
//         </body>
//       </html>
