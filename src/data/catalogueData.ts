export interface CatalogueCategory {
  id: number;
  category: string;
  items: string[];
}

export interface SearchableItem {
  name: string;
  category: string;
  type: 'catalogue' | 'gallery';
}

export const CATALOGUE: CatalogueCategory[] = [
  {
    id: 1,
    category: 'Switches & Switch Accessories',
    items: [
      'Modular switches', '1-way switches', '2-way switches', 'Bell push switches',
      'Intermediate switches', 'Dimmer switches', 'Fan regulators', 'Selector switches',
      'Push-button switches', 'Changeover switches', 'Switch plates', 'Switch boxes',
      'Modular plates', 'Blank plates',
    ],
  },
  {
    id: 2,
    category: 'Sockets & Plugs',
    items: [
      '2-pin sockets', '3-pin sockets', '5A sockets', '6A sockets', '10A sockets',
      '16A sockets', '20A sockets', '32A sockets', 'Universal sockets', 'USB sockets',
      'USB-C charging sockets', '2-pin plugs', '3-pin plugs', '5A plugs', '16A plugs',
      'Multi-plugs', 'Extension boards', 'Travel adapters',
    ],
  },
  {
    id: 3,
    category: 'Wires & Cables',
    items: [
      'House wires', 'Flexible wires', 'Multicore cables', 'Coaxial cables',
      'Telephone cables', 'LAN cables', 'Speaker wires', 'CCTV cables',
      'Flat cables', 'Power cables', 'Extension wires', 'Cable rolls',
    ],
  },
  {
    id: 4,
    category: 'MCB, DB & Protection Accessories',
    items: [
      'MCBs', 'RCCBs', 'RCBOs', 'Isolators', 'Changeover switches',
      'Distribution boards', 'SP MCB', 'DP MCB', 'TP MCB', 'FP MCB',
      'Surge protection devices', 'Fuse holders', 'Cartridge fuses', 'Kit-kat fuses',
      'HRC fuses', 'Fuse links',
    ],
  },
  {
    id: 5,
    category: 'Electrical Boxes & Enclosures',
    items: [
      'PVC switch boxes', 'Metal switch boxes', 'Junction boxes', 'Modular boxes',
      'Surface boxes', 'Concealed boxes', 'Waterproof junction boxes', 'Electrical enclosures',
      'DB boxes', 'Meter boxes', 'Terminal boxes',
    ],
  },
  {
    id: 6,
    category: 'Conduit & Wiring Accessories',
    items: [
      'PVC conduit pipes', 'Flexible conduits', 'GI conduits', 'Conduit bends',
      'Conduit tees', 'Conduit junctions', 'Conduit saddles', 'Cable glands',
      'Cable clips', 'Cable ties', 'Wiring channels', 'Trunking',
      'Cable ducts',
    ],
  },
  {
    id: 7,
    category: 'Terminals & Connectors',
    items: [
      'Terminal blocks', 'Connector strips', 'Wire connectors', 'Cable lugs',
      'Ring terminals', 'Fork terminals', 'Pin terminals', 'Butt connectors',
      'Crimping terminals', 'WAGO-type connectors', 'Busbars', 'Copper links',
    ],
  },
  {
    id: 8,
    category: 'Electrical Tape & Insulation',
    items: [
      'PVC insulation tape', 'Teflon tape', 'Self-amalgamating tape',
      'Heat-shrink sleeves', 'Insulation sleeves', 'Cable markers',
      'Electrical insulating sheets',
    ],
  },
  {
    id: 9,
    category: 'Fan Accessories',
    items: [
      'Ceiling fan regulators', 'Fan capacitors', 'Fan hooks', 'Fan canopies',
      'Fan down rods', 'Fan bearings', 'Fan pull cords', 'Fan connectors',
      'Exhaust fan accessories',
    ],
  },
  {
    id: 10,
    category: 'Bulb & Lighting Accessories',
    items: [
      'LED bulbs', 'LED tubes', 'LED battens', 'LED panels', 'Downlights',
      'COB lights', 'Floodlights', 'Street lights', 'Bulb holders', 'Batten holders',
      'Pendant holders', 'Angle holders', 'Ceiling roses', 'Lamp sockets', 'LED drivers',
    ],
  },
  {
    id: 11,
    category: 'Extension & Power Accessories',
    items: [
      'Extension boards', 'Extension cords', 'Spike guards', 'Surge protectors',
      'Power strips', 'Multi-socket adapters', 'Heavy-duty extension boards',
      'Industrial plugs & sockets',
    ],
  },
  {
    id: 12,
    category: 'Switchgear & Control',
    items: [
      'Contactors', 'Overload relays', 'Relays', 'Timers', 'Push buttons',
      'Selector switches', 'Pilot lamps', 'Indicator lights', 'Limit switches',
      'Float switches', 'Emergency stop switches',
    ],
  },
  {
    id: 13,
    category: 'Earthing & Safety',
    items: [
      'Earthing rods', 'Earthing clamps', 'Earth electrodes', 'Earth wires',
      'Earth pits', 'Earthing accessories', 'Lightning arresters', 'Surge arresters',
      'Insulation gloves', 'Electrical safety mats', 'Warning signs',
    ],
  },
  {
    id: 14,
    category: 'Metering Accessories',
    items: [
      'Energy meters', 'Digital voltmeters', 'Digital ammeters', 'Analog meters',
      'CTs', 'Meter boxes', 'Meter terminals', 'Meter accessories',
    ],
  },
  {
    id: 15,
    category: 'Cable Management',
    items: [
      'Nylon cable ties', 'Stainless-steel cable ties', 'Cable clips', 'Cable clamps',
      'Cable glands', 'Cable markers', 'Spiral cable wrap', 'Velcro cable ties',
      'Cable trays', 'Cable trunking', 'Cable raceways',
    ],
  },
  {
    id: 16,
    category: 'Doorbell & Small Electrical Items',
    items: [
      'Electric bells', 'Doorbells', 'Doorbell switches', 'Buzzers', 'Chimes',
      'Adaptors', 'Small transformers', 'Battery holders', 'Terminal connectors',
    ],
  },
  {
    id: 17,
    category: 'Appliance Electrical Accessories',
    items: [
      'Refrigerator sockets', 'AC sockets', 'Geyser switches', 'Cooker switches',
      'Washing-machine sockets', 'Heavy-duty sockets', 'Isolator switches',
      'Appliance plugs', 'Appliance connectors',
    ],
  },
  {
    id: 18,
    category: 'Common Small Items for an Electrical Shop',
    items: [
      'Screws', 'Wall plugs', 'Rawl plugs', 'Washers', 'Nuts & bolts',
      'Cable clips', 'Lugs', 'Ferrules', 'Connectors', 'Fuse wire',
      'Cable markers', 'Heat-shrink tubing', 'Junction connectors',
      'Terminal strips', 'Insulation tape',
    ],
  },
];

export const GALLERY_PRODUCTS = [
  { name: 'Girish Doorbell Box', details: 'Premium ABS doorbell enclosure for clean wiring and easy installation.' },
  { name: 'RayVolt MCB Box', details: 'Metal-backed MCB box for compact distribution board installations.' },
  { name: 'Round Ceiling Speaker', details: 'Circular designer speaker cover for false ceilings and recessed wiring.' },
  { name: '3 Pin Plug', details: 'Heavy-duty 3-pin plug with brass terminals for reliable power connection.' },
  { name: 'Bayonet Holder', details: 'Standard bayonet lamp holder suitable for residential lighting.' },
  { name: 'Multi Plug Adapter', details: '3-way adapter for powering multiple devices from a single outlet.' },
  { name: 'Metal Conduit', details: 'Flexible conduit for protecting electrical wiring runs.' },
  { name: 'Color Bulb Set', details: 'Decorative color bulbs for festive and accent lighting.' },
  { name: 'Pliers', details: 'Utility pliers for cutting, gripping and bending wires safely.' },
  { name: 'Capacitor 1.5uF', details: 'Motor-run capacitor rated for 440VAC and high temperature operation.' },
  { name: 'Classic 2 Pin Plug Top', details: 'Compact 2-pin plug top with brass pin inserts.' },
  { name: 'Screwdriver Set', details: 'Insulated screwdriver set for everyday electrical work.' },
];

export const CATEGORY_COLOR = '#0d9488';

export function searchAllItems(query: string): SearchableItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchableItem[] = [];

  for (const cat of CATALOGUE) {
    const matchedItems = cat.items.filter((item) => item.toLowerCase().includes(q));
    for (const item of matchedItems) {
      results.push({ name: item, category: cat.category, type: 'catalogue' });
    }
    if (!results.some((r) => r.category === cat.category) && cat.category.toLowerCase().includes(q)) {
      for (const item of matchedItems) {
        results.push({ name: item, category: cat.category, type: 'catalogue' });
      }
    }
  }

  for (const product of GALLERY_PRODUCTS) {
    if (product.name.toLowerCase().includes(q) || product.details.toLowerCase().includes(q)) {
      results.push({ name: product.name, category: 'Featured Products', type: 'gallery' });
    }
  }

  return results;
}
