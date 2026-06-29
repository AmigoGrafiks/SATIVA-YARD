const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// Use regex or eval to get the array.
// Actually, since it's just JSON-like objects, we can extract the array part.
const arrayMatch = content.match(/export const products: Product\[\] = (\[[\s\S]*?\]);/);
if (arrayMatch) {
  let productsStr = arrayMatch[1];
  
  // Replace description and strainType logic.
  let products = eval(productsStr);
  
  products.forEach(p => {
    if (p.category === 'Cannabis Flower') {
      let isIndoor = p.price >= 80;
      let isGreenhouse = p.name.toLowerCase().includes('green house') || p.name.toLowerCase().includes('green door');
      
      let growType = '';
      if (isIndoor) growType = 'Indoor';
      else if (isGreenhouse) growType = 'Greenhouse';
      else growType = 'Outdoor';
      
      let baseStrain = p.strainType.replace(/Indoor |Outdoor |Greenhouse /gi, '');
      if (baseStrain === 'N/A') {
        if (p.name.toLowerCase().includes('green house select') || p.name.toLowerCase().includes('green door')) {
           baseStrain = 'Indica'; // "Green house Sativa Or indica", "out door mainly its indica"
        } else if (p.name === 'Passion Fizz') {
           baseStrain = 'Hybrid';
        } else {
           baseStrain = 'Hybrid';
        }
      }
      
      // Keep 80% Indica as is, just prepend grow type
      if (baseStrain === '80% Indica') baseStrain = 'Indica'; // Simplify to Indica for description?
      
      p.strainType = `${growType} ${baseStrain}`.trim();
    }
    
    // Update description based on strain
    let dStrain = p.strainType.toLowerCase();
    if (dStrain.includes('sativa') && !dStrain.includes('hybrid')) {
      p.description = "Elevates your mood, brings energy, keeps you proactive.";
    } else if (dStrain.includes('indica') && !dStrain.includes('hybrid')) {
      p.description = "Drops your energy, sleeping pill, for full relaxation.";
    } else if (dStrain.includes('hybrid')) {
      p.description = "Levels up, keeps you not too low, not too high. For an easy day.";
    }
    
    // Pre-rolls and others also update description if they have strain
    if (p.category !== 'Cannabis Flower') {
      if (dStrain.includes('sativa') && !dStrain.includes('hybrid')) {
        p.description = "Elevates your mood, brings energy, keeps you proactive.";
      } else if (dStrain.includes('indica') && !dStrain.includes('hybrid')) {
        p.description = "Drops your energy, sleeping pill, for full relaxation.";
      } else if (dStrain.includes('hybrid')) {
        p.description = "Levels up, keeps you not too low, not too high. For an easy day.";
      }
    }
  });

  const updatedProductsStr = JSON.stringify(products, null, 2);
  content = content.replace(arrayMatch[0], `export const products: Product[] = ${updatedProductsStr};`);
  
  fs.writeFileSync('src/data.ts', content);
  console.log("Updated data.ts");
} else {
  console.log("Could not parse products array.");
}
