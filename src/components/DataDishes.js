import greekSalad from '../assets/greek-salad.webp';
import bruchetta from '../assets/bruchetta.webp';
import lemonDessert from '../assets/lemon dessert.webp';
 const dishes = [
    {
        nom: "Greek salad",
        price: 12.99,
        description: "A classic Greek salad featuring crisp lettuce, sweet peppers, briny olives, and our signature Chicago-style feta, topped with crunchy garlic and rosemary croutons.",
        image: greekSalad
    },
    {
        nom: "Bruschetta",
        price: 5.99,
        description: "Our Bruschetta begins with thick slices of rustic sourdough that has been smeared with garlic and seasoned with salt and cold-pressed extra virgin olive oil.",
        image: bruchetta
    },
    {
        nom:"Lemon Dessert",
        price: 5.00,
        description: "This cherished lemon dessert is inspired by grandma’s original recipe, with every ingredient thoughtfully sourced for timeless authenticity and nostalgic flavor.",
        image: lemonDessert
    }
]
export default dishes;