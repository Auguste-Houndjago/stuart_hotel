import { getHotelById } from "@/actions/getHotelById";
import AddHotelForm from "@/components/hotel/AddHotelForm"
import { auth } from "@clerk/nextjs";

interface HotelPageProps {
  params: {
    hotelId: string;
  };
}


export default async function Hotel({ params }: HotelPageProps) {
  console.log('hotelId : ' , params.hotelId);
  

  // const hotel = await getHotelById(params.hotelId);

const hotel =await getHotelById(params.hotelId)
const {userId} =auth()

if(!userId) return <div>Not authenticated...</div>

if(hotel && hotel.userId !== userId) return <div> acces refuser</div>

  return (
    <div>
      <AddHotelForm hotel={hotel} />
    </div>
  );
}