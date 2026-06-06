import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Daily Specials
  const specialsData = [
    { name: '$1 Cupcakes on Tuesday!', price: '$1.00', emoji: '🧁', tag: 'Tuesday Special', category: 'bakery', displayOrder: 1 },
    { name: 'Cheese Danish', price: '$3.95', emoji: '🥐', tag: 'Best Seller', category: 'bakery', displayOrder: 2 },
    { name: 'Wagon Wheel Coffeecake', price: '$13.98+', emoji: '🍰', tag: 'Signature', category: 'bakery', displayOrder: 3 },
    { name: 'Carrot Cake Slice', price: '$5.50', emoji: '🥕', tag: 'Favorite', category: 'dessert', displayOrder: 4 },
    { name: 'French Bread', price: '$4.50', emoji: '🥖', tag: 'Fresh Baked', category: 'bakery', displayOrder: 5 },
    { name: 'Cookies (per dozen)', price: '$12.00', emoji: '🍪', tag: 'Classic', category: 'bakery', displayOrder: 6 },
  ];

  for (const special of specialsData) {
    await prisma.dailySpecial.upsert({
      where: { id: `special-${special.displayOrder}` },
      update: special,
      create: { id: `special-${special.displayOrder}`, ...special },
    });
  }

  // Seed Flavors
  const flavorsData = [
    { name: 'Cinnamon', category: 'Classic', popular: true },
    { name: 'Blueberry', category: 'Fruit', popular: true },
    { name: 'Apple', category: 'Fruit', popular: false },
    { name: 'Pecan', category: 'Nut', popular: true },
    { name: 'Walnut', category: 'Nut', popular: false },
    { name: 'Raspberry', category: 'Fruit', popular: false },
    { name: 'Lemon', category: 'Fruit', popular: false },
    { name: 'Orange', category: 'Fruit', popular: false },
    { name: 'Chocolate Chip', category: 'Classic', popular: true },
    { name: 'Marble', category: 'Classic', popular: false },
    { name: 'Sour Cream', category: 'Classic', popular: false },
    { name: 'Cream Cheese', category: 'Classic', popular: true },
    { name: 'Strawberry', category: 'Fruit', popular: false },
    { name: 'Cherry', category: 'Fruit', popular: false },
    { name: 'Peach', category: 'Fruit', popular: false },
    { name: 'Pineapple', category: 'Fruit', popular: false },
    { name: 'Almond', category: 'Nut', popular: false },
    { name: 'Hazelnut', category: 'Nut', popular: false },
    { name: 'Coconut', category: 'Nut', popular: false },
    { name: 'Pumpkin Spice', category: 'Seasonal', popular: true },
    { name: 'Gingerbread', category: 'Seasonal', popular: false },
    { name: 'Cranberry', category: 'Seasonal', popular: false },
    { name: 'Eggnog', category: 'Seasonal', popular: false },
    { name: 'Maple', category: 'Classic', popular: false },
    { name: 'Brown Sugar', category: 'Classic', popular: false },
    { name: 'Vanilla', category: 'Classic', popular: false },
    { name: 'Red Velvet', category: 'Classic', popular: false },
    { name: 'Carrot', category: 'Classic', popular: false },
    { name: 'Banana', category: 'Fruit', popular: false },
    { name: 'Blackberry', category: 'Fruit', popular: false },
    { name: 'Mango', category: 'Fruit', popular: false },
    { name: 'Apricot', category: 'Fruit', popular: false },
    { name: 'Rhubarb', category: 'Fruit', popular: false },
    { name: 'Pistachio', category: 'Nut', popular: false },
    { name: 'Macadamia', category: 'Nut', popular: false },
    { name: 'Peanut Butter', category: 'Nut', popular: false },
    { name: 'Apple Cider', category: 'Seasonal', popular: false },
    { name: 'Peppermint', category: 'Seasonal', popular: false },
    { name: 'Spiced Pear', category: 'Seasonal', popular: false },
    { name: 'Toffee', category: 'Classic', popular: false },
    { name: 'Caramel', category: 'Classic', popular: false },
    { name: 'Mocha', category: 'Classic', popular: false },
  ];

  for (let i = 0; i < flavorsData.length; i++) {
    const flavor = flavorsData[i];
    await prisma.flavor.upsert({
      where: { id: `flavor-${i + 1}` },
      update: flavor,
      create: { id: `flavor-${i + 1}`, ...flavor },
    });
  }

  // Seed Testimonials
  const testimonialsData = [
    { name: 'tweav', location: 'Aliso Viejo', rating: 5, text: 'We always get cakes for special occasions from French\'s. Their cakes are a bit pricey, but worth every penny.', product: 'Custom Cakes' },
    { name: 'Rebecca W.', location: 'Costa Mesa', rating: 5, text: 'We came for the cookies. We loved them all. Fresh, baked to right consistency, perfect balance of flavors and served with a smile.', product: 'Cookies' },
    { name: 'Hairycalgrad', location: 'Temecula', rating: 5, text: 'Go on a Tuesday for the $1.00 cupcakes, they are the best.', product: 'Tuesday Cupcakes' },
    { name: 'Tinaray107', location: 'Utah', rating: 4, text: 'This is by far the best bakery for goodies. Cookies, pastries, cakes. Outrageously delectable.', product: 'Pastries & Cakes' },
    { name: 'auroracoleman09', location: 'Costa Mesa', rating: 5, text: 'This bakery is one of a kind and has the best selection of Cheese Danishes.', product: 'Cheese Danishes' },
    { name: 'Yelp Reviewer', location: 'Costa Mesa', rating: 5, text: 'Through the years my wife has had several cakes from French\'s and they have all been delicious. The staff is always friendly, helpful and accommodating.', product: 'Custom Cakes' },
    { name: 'Yelp Reviewer', location: 'Orange County', rating: 5, text: 'The desserts are wonderful! We purchased carrot cake & it was divine. We also purchased German chocolate cake.', product: 'Carrot Cake' },
    { name: 'Yelp Reviewer', location: 'Costa Mesa', rating: 5, text: 'Additionally, the French Bread was crispy on the outside and deliciously soft inside. Customer service was extremely nice, samples were offered.', product: 'French Bread' },
  ];

  for (let i = 0; i < testimonialsData.length; i++) {
    const testimonial = testimonialsData[i];
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${i + 1}` },
      update: testimonial,
      create: { id: `testimonial-${i + 1}`, ...testimonial },
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
