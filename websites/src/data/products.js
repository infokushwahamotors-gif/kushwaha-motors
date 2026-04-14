export const PRODUCTS = {
  twoWheeler: [
    {
      id:'tm007', name:'TM007', type:'इलेक्ट्रिक स्कुटर', tagline:'आधुनिक र सुरक्षित',
      price: { amount: '1,85,000', label: 'NPR', short: '1.85L' },
      specs:{ motor:'4200W', range:'150 KM', battery:'72V 45Ah Lithium', speed:'78 KM/H' },
      features:[
        '2 वर्ष/20,000 कि.मी. वारेन्टी',
        'चार्जिङ समय 3 घण्टा',
        'अगाडि र पछाडि डिस ब्रेक',
        'Tubeless टायर',
        'Reverse gear',
        'Hill hold',
        'Cruise control',
        'NFC, Remote control',
        'फोन चार्ज गर्ने पोर्ट',
        'Dual सक',
        '165 MM ground clearance',
        'LED light',
        'Anti -theft safety',
        '35 kmph speed for 150KM range'
      ],
      image:'/2Wheelers/TM007.jpeg', 
      images: ['/2Wheelers/TM007-2.jpeg', '/2Wheelers/TM007-3.jpeg'],
      availableColors: [
        { name: 'Electric Blue', hex: '#0066FF' },
        { name: 'Racing Red', hex: '#FF0000' },
        { name: 'Metallic Grey', hex: '#808080' },
        { name: 'Pearl White', hex: '#FFFFFF' }
      ],
      accent:'#00F0FF'
    },
    {
      id:'tm008', name:'TM008', type:'इलेक्ट्रिक स्कुटर', tagline:'शक्तिशाली र भरपर्दो',
      price: { amount: '1,95,000', label: 'NPR', short: '1.95L' },
      specs:{ motor:'4200W', range:'150 KM', battery:'72V 45Ah Lithium', speed:'78 KM/H' },
      features:[
        '2 वर्ष/20,000 कि.मी. वारेन्टी',
        'चार्जिङ समय 3 घण्टा',
        'अगाडि र पछाडि डिस ब्रेक',
        'Tubeless टायर',
        'Reverse gear',
        'Hill hold',
        'Cruise control',
        'NFC, Remote control',
        'फोन चार्ज गर्ने पोर्ट',
        'Dual सक',
        '165 MM ground clearance',
        'LED light',
        'Anti -theft safety',
        '35 kmph speed for 150KM range'
      ],
      image:'/2Wheelers/TM008.jpeg',
      images: ['/2Wheelers/TM008-2.jpeg', '/2Wheelers/TM008-3.jpeg'],
      availableColors: [
        { name: 'Crimson Red', hex: '#DC143C' },
        { name: 'Obsidian Black', hex: '#1A1A1A' },
        { name: 'Sky Blue', hex: '#87CEEB' },
        { name: 'Silver Streak', hex: '#C0C0C0' }
      ],
      accent:'#FF3366'
    },
    {
      id:'v7g', name:'V7G', type:'इलेक्ट्रिक स्कुटर', tagline:'स्मार्ट सहरी यात्रा',
      price: { amount: '2,15,000', label: 'NPR', short: '2.15L' },
      specs:{ motor:'4200W', range:'150 KM', battery:'72V 45Ah Lithium', speed:'78 KM/H' },
      features:[
        '2 वर्ष/20,000 कि.मी. वारेन्टी',
        'चार्जिङ समय 3 घण्टा',
        'अगाडि र पछाडि डिस ब्रेक',
        'Tubeless टायर',
        'Reverse gear',
        'Hill hold',
        'Cruise control',
        'NFC, Remote control',
        'फोन चार्ज गर्ने पोर्ट',
        'Dual सक',
        '165 MM ground clearance',
        'LED light',
        'Anti -theft safety',
        '35 kmph speed for 150KM range'
      ],
      image:'/2Wheelers/V7G.jpeg',
      images: [
        '/2Wheelers/V7G-1.jpeg', '/2Wheelers/V7G-2.jpeg', 
        '/2Wheelers/V7G-3.jpeg', '/2Wheelers/V7G-4.jpeg',
        '/2Wheelers/V7G-5.jpeg', '/2Wheelers/V7G-6.jpeg', '/2Wheelers/V7G-7.jpeg'
      ],
      availableColors: [
        { name: 'Mint Green', hex: '#98FF98' },
        { name: 'Vibrant Yellow', hex: '#FFD700' },
        { name: 'Ocean Blue', hex: '#000080' },
        { name: 'Classic White', hex: '#F5F5F5' }
      ],
      accent:'#00FF7F'
    },
  ],
  threeWheeler: [
    {
      id:'kme5l', name:'KM-E5L',
      type:'यात्री ई-रिक्शा',
      tagline:'६+१ सिट — शान र आराम',
      price: { amount: '3,50,000', label: 'NPR', short: '3.50L' },
      specs:{ motor:'३०००W', range:'१८०-२०० KM', battery:'७२V २३०Ah', capacity:'६+१ यात्री' },
      features:['भिडियो प्लेयर', 'पछाडि क्यामेरा', 'हिल क्लाइम्ब सेन्सर'],
      availableColors: [
        { name: 'Aqua Blue', hex: '#00FFFF' },
        { name: 'Bright Red', hex: '#EE4B2B' }
      ],
      image:'/3wheelers/KM-E5L.webp', accent:'#00F0FF'
    },
    {
      id:'ft3', name:'FT-3',
      type:'यात्री ई-रिक्शा',
      tagline:'सुरक्षित र भरपर्दो',
      price: { amount: '2,80,000', label: 'NPR', short: '2.80L' },
      specs:{ motor:'१५००W', range:'१४०-१६० KM', battery:'६०V १७२Ah', capacity:'४+१ यात्री' },
      features:['हिल क्लाइम्ब सेन्सर', 'पछाडि क्यामेरा', 'दोहोरो ब्रेक'],
      availableColors: [
        { name: 'Nature Green', hex: '#228B22' },
        { name: 'Misty Blue', hex: '#B0C4DE' }
      ],
      image:'/3wheelers/FT-3.webp', accent:'#00FF7F'
    },
    {
      id:'stf3', name:'STF-3',
      type:'यात्री ई-रिक्शा',
      tagline:'स्मार्ट सहरी यात्रा',
      price: { amount: '2,60,000', label: 'NPR', short: '2.60L' },
      specs:{ motor:'१२००W', range:'११०-१३० KM', battery:'४८V १४५Ah', capacity:'४+१ यात्री' },
      features:['हाई-लो गियर', 'म्युजिक प्लेयर', 'डिस्क ब्रेक'],
      availableColors: [
        { name: 'Sunshine Yellow', hex: '#FFDB58' },
        { name: 'Sky Blue', hex: '#87CEEB' }
      ],
      image:'/3wheelers/STF-3.webp', accent:'#00FF7F'
    },
    {
      id:'kmv3', name:'KM-V3',
      type:'स्कूल ई-बस',
      tagline:'१२+१ सुरक्षित सिटहरू',
      price: { amount: '4,20,000', label: 'NPR', short: '4.20L' },
      specs:{ motor:'२२००W', range:'१४०-१६० KM', battery:'६०V १७२Ah', capacity:'१२+१ यात्री' },
      features:['म्युजिक प्लेयर', 'पछाडि क्यामेरा', 'डिजिटल HUD'],
      availableColors: [
        { name: 'School Yellow', hex: '#FFD700' },
        { name: 'Pure White', hex: '#FFFFFF' }
      ],
      image:'/3wheelers/KM-V3.webp', accent:'#FFD700'
    },
    {
      id:'max60c', name:'YFKM MAX-60C',
      type:'भारी माल वाहक',
      tagline:'१००० KG क्षमता',
      price: { amount: '4,50,000', label: 'NPR', short: '4.50L' },
      specs:{ motor:'३५००W', range:'१५०-१८० KM', battery:'७२V २३०Ah', capacity:'१००० KG' },
      features:['स्वत: कुलिङ', '६×४ फिट बडी', 'पछाडि क्यामेरा'],
      availableColors: [
        { name: 'Industrial Red', hex: '#B22222' },
        { name: 'Deep Blue', hex: '#00008B' }
      ],
      image:'/3wheelers/YFKM%20MAX-60C.webp', accent:'#FF6B00'
    },
    {
      id:'lm3', name:'JC-48',
      type:'माल वाहक लोडर',
      tagline:'८०० KG क्षमता',
      price: { amount: '3,20,000', label: 'NPR', short: '3.20L' },
      specs:{ motor:'२२००W', range:'१४०-१६० KM', battery:'६०V १७२Ah', capacity:'८०० KG' },
      features:['हाई-लो गियर', '६×४ फिट बडी', 'म्युजिक प्लेयर'],
      availableColors: [
        { name: 'Electric Green', hex: '#7CFC00' },
        { name: 'Safety Orange', hex: '#FF8C00' }
      ],
      image:'/3wheelers/JC-48.webp', accent:'#FF6B00'
    },
  ],
};
