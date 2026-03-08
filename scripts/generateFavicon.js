import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagePath = join(__dirname, '../public/images/logo_short.png');
const buffer = fs.readFileSync(imagePath);
const base64 = buffer.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;

/* We scale by 2.2 and translate to ensure the logo is perfectly centered and large */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
    <g transform="translate(128, 128) scale(2.2) translate(-128, -128)">
        <image href="${dataUrl}" x="0" y="0" width="256" height="256" />
    </g>
</svg>`;

fs.writeFileSync(join(__dirname, '../public/favicon.svg'), svg);
console.log('Favicon generated at public/favicon.svg');
