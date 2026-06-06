import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Daily Specials
  const specialsData = [
    { name: 'Almond Croissant', price: '$3.50', emoji: '🥐', tag: 'Best Seller', category: 'bakery', displayOrder: 1 },
    { name: 'Strawberry Coffeecake', price: '$18.00', emoji: '🍰', tag: 'Seasonal', category: 'bakery', displayOrder: 2 },
    { name: 'Rosemary Sea Salt Boule', price: '$9.00', emoji: '🍞', tag: 'New', category: 'bakery', displayOrder: 3 },
    { name: 'Seasonal Fruit Tart', price: '$6.50', emoji: '🥧', tag: 'Limited', category: 'dessert', displayOrder: 4 },
    { name: 'Pain au Chocolat', price: '$3.75', emoji: '🍫', tag: 'Classic', category: 'bakery', displayOrder: 5 },
    { name: 'Vanilla Bean Éclair', price: '$5.25', emoji: '🧁', tag: 'Fresh', category: 'dessert', displayOrder: 6 },
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
    { name: 'Sarah M.', location: 'Costa Mesa regular since 2008', rating: 5, text: 'The Wagon-Wheel Coffeecake is a weekly tradition in our house. I\'ve tried the cinnamon, blueberry, and pumpkin spice — they\'re all incredible. French\'s is truly a Costa Mesa treasure.', product: 'Wagon-Wheel Coffeecake' },
    { name: 'David L.', location: 'Newport Beach', rating: 5, text: 'We ordered a custom wedding cake and it exceeded all expectations. The team was so accommodating and the cake was absolutely stunning.', product: 'Custom Wedding Cake' },
    { name: 'Maria G.', location: 'Costa Mesa regular since 2015', rating: 5, text: 'I brought in my grandmother\'s recipe for her famous tres leches cake and they nailed it perfectly. The "Bring Your Recipe" service is such a special offering.', product: 'Bring Your Recipe' },
    { name: 'Tom R.', location: 'Huntington Beach', rating: 5, text: 'Best croissants in Orange County, hands down. Flaky, buttery perfection every single time. Worth every minute of the drive.', product: 'Almond Croissant' },
    { name: 'Jennifer K.', location: 'Costa Mesa regular since 2012', rating: 5, text: 'French\'s Bakery has been part of our family\'s celebrations for over a decade. Everything is made with such care and quality.', product: 'Birthday Cakes' },
    { name: 'Mike P.', location: 'Irvine', rating: 5, text: 'Their sourdough boule is incredible — crispy crust, tangy interior. And the French onion soup is the best I\'ve had outside of Paris.', product: 'Sourdough Boule' },
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
