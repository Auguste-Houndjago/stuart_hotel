import { HotelWithRooms } from "@/components/hotel/AddHotelForm"
import HotelCard from "@/components/hotel/HotelCard"


function HotelList({hotels}: {hotels: HotelWithRooms[]}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2=1 lg:grid-cols-1 gap-x-8 gap-y-12 mt-4">
      {/* {hotels.map((hotel) => <div key={hotel.id}>
        <HotelCard hotel={hotel} />
      </div>)} */}
      <h1 className="m-5">
        Bienvenue sur la page: le projet est toujours en cours
      </h1>
      <div className="m-1">
        <p>connecter vous et ajouter votre hotel en suivant le formulaire </p>
      </div>
    </div>
  )
}

export default HotelList