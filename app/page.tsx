import { getHotels } from "@/actions/getHotels";
import HotelList from "@/components/hotel/HotelList";

interface HomeProps {
  searchParams: {
    title: string,
    country: string,
    state: string,
    city: string,
  }
}

export default async function Home({searchParams}: HomeProps) {

  const hotels = await getHotels(searchParams)

  if(!hotels) return (<div>No hotels found...</div>)

  return (
    <div>
      <div>Salut  Shi no Shenzhen (comment tu peut ecrire un nom pareil )</div>
      
      <HotelList hotels={hotels} />
    </div>
  );
}