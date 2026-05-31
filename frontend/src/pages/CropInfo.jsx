import { useState } from 'react';

const cropsData = [
  {
    id: 1,
    name: 'Wheat',
    image: '/crops/wheat.jpg',
    scientificName: 'Triticum aestivum',
    growthPeriod: '110-130 days',
    season: 'Rabi (Winter)',
    climate: 'Temperate, 20-25°C',
    soilType: 'Loamy, well-drained soil',
    sowingTime: 'October-November',
    harvestingTime: 'March-April',
    pesticides: 'Carbendazim, Propiconazole for rust control',
    fertilizers: 'NPK (120:60:40), Urea, DAP',
    description: 'Wheat is a cereal grain and one of the most important staple foods worldwide.'
  },
  {
    id: 2,
    name: 'Rice',
    image: '/crops/rice.jpg',
    scientificName: 'Oryza sativa',
    growthPeriod: '90-180 days',
    season: 'Kharif (Monsoon)',
    climate: 'Tropical/Subtropical, 20-35°C',
    soilType: 'Clayey, water-retentive soil',
    sowingTime: 'June-July',
    harvestingTime: 'October-November',
    pesticides: 'Imidacloprid, Chlorpyrifos for pests',
    fertilizers: 'NPK (80:40:40), Urea, MOP',
    description: 'Rice is the primary crop and food staple for more than half of the world\'s population.'
  },
  {
    id: 3,
    name: 'Maize (Corn)',
    image: '/crops/maize.jpg',
    scientificName: 'Zea mays',
    growthPeriod: '90-120 days',
    season: 'Kharif',
    climate: 'Warm, 21-27°C',
    soilType: 'Well-drained loamy soil',
    sowingTime: 'June-July',
    harvestingTime: 'September-October',
    pesticides: 'Lambda-cyhalothrin, Thiamethoxam',
    fertilizers: 'NPK (120:60:40), Urea, DAP',
    description: 'Maize is a versatile crop used for food, fodder, and industrial purposes.'
  },
  {
    id: 4,
    name: 'Potato',
    image: '/crops/potato.jpg',
    scientificName: 'Solanum tuberosum',
    growthPeriod: '90-120 days',
    season: 'Rabi',
    climate: 'Cool, 15-20°C',
    soilType: 'Sandy loam, well-drained',
    sowingTime: 'October-November',
    harvestingTime: 'February-March',
    pesticides: 'Mancozeb, Metalaxyl for blight',
    fertilizers: 'NPK (150:100:100), Compost',
    description: 'Potato is a starchy tuber and the world\'s fourth-largest food crop.'
  },
  {
    id: 5,
    name: 'Cotton',
    image: '/crops/cotton.jpg',
    scientificName: 'Gossypium hirsutum',
    growthPeriod: '150-200 days',
    season: 'Kharif',
    climate: 'Warm, 21-30°C',
    soilType: 'Black cotton soil, well-drained',
    sowingTime: 'May-June',
    harvestingTime: 'October-December',
    pesticides: 'Emamectin benzoate, Spinosad',
    fertilizers: 'NPK (120:60:60), Farm yard manure',
    description: 'Cotton is grown primarily for its fiber, used in textile production.'
  },
  {
    id: 6,
    name: 'Sugarcane',
    image: '/crops/sugarcane.jpg',
    scientificName: 'Saccharum officinarum',
    growthPeriod: '10-18 months',
    season: 'All year (tropical)',
    climate: 'Tropical, 20-30°C',
    soilType: 'Loamy, clayey soil',
    sowingTime: 'February-March, October-November',
    harvestingTime: 'December-March',
    pesticides: 'Carbofuran, Chlorpyrifos',
    fertilizers: 'NPK (200:80:80), Green manure',
    description: 'Sugarcane is the primary source of sugar and biofuel production.'
  },
  {
    id: 7,
    name: 'Soybean',
    image: '/crops/soybean.jpg',
    scientificName: 'Glycine max',
    growthPeriod: '90-120 days',
    season: 'Kharif',
    climate: 'Warm, 20-30°C',
    soilType: 'Well-drained loamy soil',
    sowingTime: 'June-July',
    harvestingTime: 'September-October',
    pesticides: 'Quinalphos, Dimethoate',
    fertilizers: 'NPK (20:80:40), Rhizobium culture',
    description: 'Soybean is a rich source of protein and oil, used in various food products.'
  },
  {
    id: 8,
    name: 'Tomato',
    image: '/crops/tomato.jpg',
    scientificName: 'Solanum lycopersicum',
    growthPeriod: '75-90 days',
    season: 'Rabi/Kharif',
    climate: 'Warm, 20-25°C',
    soilType: 'Well-drained sandy loam',
    sowingTime: 'November-December, June-July',
    harvestingTime: 'March-May, September-November',
    pesticides: 'Mancozeb, Carbendazim',
    fertilizers: 'NPK (150:100:100), Vermicompost',
    description: 'Tomato is a widely cultivated vegetable rich in vitamins and antioxidants.'
  },
  {
    id: 9,
    name: 'Onion',
    image: '/crops/onion.jpg',
    scientificName: 'Allium cepa',
    growthPeriod: '90-120 days',
    season: 'Rabi/Kharif',
    climate: 'Moderate, 13-24°C',
    soilType: 'Well-drained sandy loam',
    sowingTime: 'October-November, June-July',
    harvestingTime: 'February-March, September-October',
    pesticides: 'Mancozeb, Carbendazim for purple blotch',
    fertilizers: 'NPK (100:60:60), FYM',
    description: 'Onion is a bulb vegetable used extensively in cooking worldwide.'
  },
  {
    id: 10,
    name: 'Groundnut (Peanut)',
    image: '/crops/groundnut.jpg',
    scientificName: 'Arachis hypogaea',
    growthPeriod: '100-130 days',
    season: 'Kharif',
    climate: 'Warm, 20-30°C',
    soilType: 'Well-drained sandy loam',
    sowingTime: 'June-July',
    harvestingTime: 'October-November',
    pesticides: 'Chlorpyrifos, Quinalphos',
    fertilizers: 'NPK (20:80:40), Gypsum',
    description: 'Groundnut is an important oilseed crop and source of protein.'
  },
  {
    id: 11,
    name: 'Cassava',
    image: '/crops/cassava.jpg',
    scientificName: 'Manihot esculenta',
    growthPeriod: '6-12 months',
    season: 'Planted at onset of rains',
    climate: 'Tropical/Subtropical, 20-30°C',
    soilType: 'Well-drained sandy to clay loam',
    sowingTime: 'May-July',
    harvestingTime: '8-12 months after planting',
    pesticides: 'Carbosulfan, Chlorpyrifos for whiteflies/mites',
    fertilizers: 'NPK (50:25:50), Farm yard manure',
    description: 'A major root crop grown in tropical regions, crucial for food security and industrial starch production.'
  },
  {
    id: 12,
    name: 'Barley',
    image: '/crops/barley.jpg',
    scientificName: 'Hordeum vulgare',
    growthPeriod: '90-120 days',
    season: 'Rabi (Winter)',
    climate: 'Cool, 10-20°C',
    soilType: 'Well-drained loamy to sandy loam',
    sowingTime: 'October-November',
    harvestingTime: 'February-April',
    pesticides: 'Carbendazim, Mancozeb for leaf spot/blight',
    fertilizers: 'NPK (80:40:40), Urea, DAP',
    description: 'A versatile cereal grain used for animal feed, malt production, and human consumption, known for drought tolerance.'
  }
];

export default function CropInfo() {
  const [selectedCrop, setSelectedCrop] = useState(null);

  return (
    <div className="container">
      <h2>Crop Information</h2>
      <p style={{ margin: '15px 0', color: '#666' }}>
        Learn about common crops, their requirements, and best practices
      </p>
      
      <div className="grid">
        {cropsData.map(crop => (
          <div className="card" key={crop.id}>
            <img 
              src={crop.image} 
              alt={crop.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=' + crop.name; }}
            />
            <h3>{crop.name}</h3>
            <p style={{ color: '#666', margin: '10px 0' }}>{crop.description}</p>
            <button className="btn" onClick={() => setSelectedCrop(crop)} style={{ marginTop: '10px' }}>
              Learn More
            </button>
          </div>
        ))}
      </div>

      {selectedCrop && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.7)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => setSelectedCrop(null)}>
          <div className="card" style={{ maxWidth: '700px', width: '100%', maxHeight: '90vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <h2>{selectedCrop.name}</h2>
            <img 
              src={selectedCrop.image} 
              alt={selectedCrop.name}
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', margin: '15px 0' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600x250?text=' + selectedCrop.name; }}
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div><strong>Scientific Name:</strong><br/>{selectedCrop.scientificName}</div>
              <div><strong>Growth Period:</strong><br/>{selectedCrop.growthPeriod}</div>
              <div><strong>Season:</strong><br/>{selectedCrop.season}</div>
              <div><strong>Climate:</strong><br/>{selectedCrop.climate}</div>
              <div><strong>Soil Type:</strong><br/>{selectedCrop.soilType}</div>
              <div><strong>Sowing Time:</strong><br/>{selectedCrop.sowingTime}</div>
              <div><strong>Harvesting Time:</strong><br/>{selectedCrop.harvestingTime}</div>
              <div><strong>Pesticides:</strong><br/>{selectedCrop.pesticides}</div>
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <strong>Fertilizers:</strong><br/>
              {selectedCrop.fertilizers}
            </div>
            
            <button className="btn" onClick={() => setSelectedCrop(null)} style={{ marginTop: '20px' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}