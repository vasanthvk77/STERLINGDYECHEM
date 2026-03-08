import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'src', 'data', 'db.json');

const dbRaw = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(dbRaw);

if (!db.catalog) {
    console.log("No catalog found.");
    process.exit(1);
}

const generateId = () => 'sub_' + Math.random().toString(36).substr(2, 9);
const generateProdId = () => 'p_' + Math.random().toString(36).substr(2, 9);

const getSubtypeImage = (name) => {
    const lName = name.toLowerCase();
    if (lName.includes('bristal')) return '/images/type_bristal.png';
    if (lName.includes('hydesity')) return '/images/type_hydesity.png';
    if (lName.includes('heat transfer')) return '/images/type_heat_transfer.png';
    if (lName.includes('glossy')) return '/images/type_glossy.png';
    return '/images/type_default.png';
};

const newCatalog = db.catalog.map(brand => {
    const products = brand.products || [];
    const subtypesMap = {};

    products.forEach((p, idx) => {
        let subtypeName = p.name || 'General';

        if (!subtypesMap[subtypeName]) {
            subtypesMap[subtypeName] = {
                id: generateId(),
                name: subtypeName,
                image: getSubtypeImage(subtypeName),
                description: p.app || `High performance ${subtypeName}`,
                products: []
            };
        }

        subtypesMap[subtypeName].products.push({
            id: p.id === '3' || p.id === '1' ? generateProdId() : p.id + '_' + idx, // fixing duplicates
            name: p.name,
            category: brand.brand,
            cas: p.cas,
            app: p.app,
            image: p.image
        });
    });

    return {
        id: brand.id,
        brand: brand.brand,
        description: brand.description,
        image: brand.image,
        subtypes: Object.values(subtypesMap)
    };
});

db.catalog = newCatalog;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Successfully migrated to 3-level hierarchy!");
