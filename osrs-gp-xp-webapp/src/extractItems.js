const fs = require('fs');

const inputPath = './osrs-gp-xp-webapp/src/ItemID.json';
const outputPath = './osrs-gp-xp-webapp/src/TrainingItems.json';

const raw = fs.readFileSync(inputPath, 'utf8');
const data = JSON.parse(raw);

const keywords = [
  '(unf)', 'guam', 'marrentill', 'tarromin', 'harralander',
  'ranarr', 'toadflax', 'irit', 'avantoe', 'kwuarm', 'huasca', 'snapdragon',
  'cadantine', 'lantadyme', 'dwarf weed', 'torstol', 'brew(', 'super restore(',
  // Regular potions:
  'attack potion', 'antipoison', 'strength potion', 'restore potion', 'energy potion',
  'defence potion', 'agility potion', 'combat potion', 'prayer potion', 'prayer renewal potion',
  'prayer enhance', 'prayer regeneration potion', 'super attack', 'superantipoison',
  'fishing potion', 'super energy', 'super strength', 'super restore', 'super defence',
  'ranging potion', 'magic potion', 'stamina potion', 'blamish oil', 'zamorak brew',
  'guthix rest', 'sanfew serum', "relicym's balm", 'serum 207', 'weapon poison',
  'weapon poison(+)', 'weapon poison(++)', 'antidote(+)', 'antidote(++)',
  'bastion potion', 'battlemage potion', 'divine super attack potion',
  'divine super strength potion', 'divine super defence potion', 'divine ranging potion',
  'divine magic potion', 'divine bastion potion', 'divine battlemage potion'
];

const exclude = ['shield', 'bolts', 'mith', 'seed'];


const result = {};
for (const [name, id] of Object.entries(data)) {
  const lower = name.toLowerCase();
  if (
    keywords.some(k => lower.includes(k)) &&
    !exclude.some(e => lower.includes(e))
  ) {
    result[name] = id;
  }
}

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log('Extraction complete!');

