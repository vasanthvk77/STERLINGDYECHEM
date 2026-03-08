import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'src', 'data', 'db.json');
const rawData = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(rawData);

const brandImages = {
    'Silicone Inks': '/images/cat_silicone.png',
    'Oilbase Non PVC': '/images/cat_oilbase.png',
    'Specialitys': '/images/cat_specialitys.png',
    'Waterbase Pigments': '/images/cat_waterbase.png',
    'Eco friendly water based textile inks': '/images/cat_eco.png'
};

const brandDescriptions = {
    'Silicone Inks': 'Premium silicone printing inks for high-stretch athletic wear and difficult-to-print substrates.',
    'Oilbase Non PVC': 'Vibrant oil-based PVC-free ink solutions for eco-friendly modern industrial printing.',
    'Specialitys': 'Highly specialized textile effect inks featuring metallic shimmers, glow, and color changing properties.',
    'Waterbase Pigments': 'Smooth water-based color pigments for pure, natural textile dyeing and soft hand feel.',
    'Eco friendly water based textile inks': 'Sustainable eco-friendly printing inks seamlessly blending with natural organic cotton.'
};

const catalogMap = new Map();

if (db.products) {
    db.products.forEach(p => {
        const catName = p.category || 'Uncategorized';

        if (!catalogMap.has(catName)) {
            catalogMap.set(catName, {
                id: 'cat_' + Date.now() + Math.floor(Math.random() * 1000),
                brand: catName,
                description: brandDescriptions[catName] || 'High quality products for ' + catName,
                image: brandImages[catName] || '/images/products/reactive.png',
                products: []
            });
        }

        // Add product to this category
        const cat = catalogMap.get(catName);
        cat.products.push(p);
    });
}

// Format the new db object
const newDb = {
    ...db,
    catalog: Array.from(catalogMap.values()),
};

// We can safely remove the old flat arrays to enforce the new architecture
delete newDb.products;
delete newDb.homePageProducts;

fs.writeFileSync(dbPath, JSON.stringify(newDb, null, 2));
console.log('Successfully restructured db.json into nested catalog structure.');
