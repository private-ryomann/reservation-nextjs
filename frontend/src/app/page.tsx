import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import { Header } from "./components/Header";
import { RestaurantCard } from "./components/RestaurantCard";

export type RestaurantCardType = {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
};

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const resutaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
    },
  });

  return resutaurants;
};

export default async function Home() {
  const resutaurants = await fetchRestaurants();
  console.log(resutaurants);
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {resutaurants.map((resutaurant) => (
          <RestaurantCard key={resutaurant.id} restaurant={resutaurant} />
        ))}
      </div>
    </main>
  );
}
