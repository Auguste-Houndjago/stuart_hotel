/* eslint-disable react-hooks/rules-of-hooks */
/**
 * eslint-disable react-hooks/rules-of-hooks
 *
 * @format
 */

/* eslint-disable react-hooks/exhaustive-deps */
/**
 * @format
 */
"use client"
import { Booking, Hotel, Room } from "@prisma/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import Image from "next/image"

import {
  AirVent,
  Bath,
  Bed,
  Home,
  BedDouble,
  Castle,
  MountainSnow,
  Ship,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  VolumeX,
  Wifi,
  MapPin,
} from "lucide-react"
import { Separator } from "../ui/separator"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import { useToast } from "@/components/ui/use-toast"
import { differenceInCalendarDays } from "date-fns"
import { useAuth } from "@clerk/nextjs"
import useBookRoom from "@/hooks/useBookRoom"
import useLocation from "@/hooks/useLocation"
import moment from "moment"
import AmenityItem from "../AmenityItem"

interface MyBookingsClientProps {
  booking: Booking & { Room: Room | null } & { Hotel: Hotel | null }
}

const MyBookingsClient: React.FC<MyBookingsClientProps> = ({ booking }) => {
  const { setRoomData, paymentIntentId, setClientSecret, setPaymentIntentId } =
    useBookRoom()
  const [bookingIsLoading, setBookingIsLoading] = useState(false)
  const { getCountryByCode, getStateByCode } = useLocation()
  const { userId } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { Hotel, Room } = booking


  if (!Hotel || !Room) return <div>Missing Data...</div>

  const country = getCountryByCode(Hotel.country)
  const state = getStateByCode(Hotel.country, Hotel.state)

  const startDate = moment(booking.startDate).format("MMMM Do YYYY")
  const endDate = moment(booking.endDate).format("MMMM Do YYYY")
  const dayCount = differenceInCalendarDays(booking.endDate, booking.startDate)

  const handleBookRoom = () => {
    if (!userId)
      return toast({
        variant: "destructive",
        description: "Oups Make sure you are logged in.",
      })

    if (!Hotel?.userId)
      return toast({
        variant: "destructive",
        description: "Something went wrong, refresh the page and try again!.",
      })

    setBookingIsLoading(true)

    const bookingRoomData = {
      room: Room,
      totalPrice: booking.totalPrice,
      breakFastIncluded: booking.breakFastIncluded,
      startDate: booking.startDate,
      endDate: booking.endDate,
    }

    setRoomData(bookingRoomData)

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        booking: {
          hotelOwnerId: Hotel.userId,
          hotelId: Hotel.id,
          roomId: Room.id,
          startDate: bookingRoomData.startDate,
          endDate: bookingRoomData.endDate,
          breakFastIncluded: bookingRoomData.breakFastIncluded,
          totalPrice: bookingRoomData.totalPrice,
        },
        payment_intent_id: paymentIntentId,
      }),
    })
      .then((res) => {
        setBookingIsLoading(false)
        if (res.status === 401) {
          return router.push("/login")
        }

        return res.json()
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret)
        setPaymentIntentId(data.paymentIntent.id)
        router.push("/book-room")
      })
      .catch((error: any) => {
        console.log("Error", error)
        toast({
          variant: "destructive",
          description: `ERROR! ${error.message}`,
        })
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{Hotel.title}</CardTitle>
        <CardDescription>
          <div className='font-semibold mt-4'>
            <AmenityItem>
              <MapPin className='h-4 w-4' />
              {country?.name}, {state?.name}, {Hotel.city}{" "}
            </AmenityItem>
            <p className='py-2'>{Hotel.locationDescription}</p>
          </div>
        </CardDescription>
        <CardTitle>{Room.title}</CardTitle>
        <CardDescription>{Room.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='aspect-square overflow-hidden relative h-[200px] rounded-lg'>
          <Image
            fill
            src={Room.image}
            alt={Room.title}
            className='object-cover'
          />
        </div>
        <div className='grid grid-cols-2 gap-4 content-start text-sm'>
          <AmenityItem>
            <Bed className='h-4 w-4' />
            {Room.bedCount} Bed{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Users className='h-4 w-4' />
            {Room.guestCount} Guest{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Bath className='h-4 w-4' />
            {Room.bathRoomCount} BathRoom{"(s)"}
          </AmenityItem>
          {!!Room.kingBed && (
            <AmenityItem>
              <BedDouble className='h-4 w-4' />
              {Room.kingBed} King Bed{"(s)"}
            </AmenityItem>
          )}
          {!!Room.queenBed && (
            <AmenityItem>
              <Bed className='h-4 w-4' />
              {Room.queenBed} Queen Bed{"(s)"}
            </AmenityItem>
          )}
          {Room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className='h-4 w-4' />
              Room Services
            </AmenityItem>
          )}
          {Room.Tv && (
            <AmenityItem>
              <Tv className='h-4 w-4' />
              TV
            </AmenityItem>
          )}
          {Room.balcony && (
            <AmenityItem>
              <Home className='h-4 w-4' />
              Balcony
            </AmenityItem>
          )}
          {Room.freeWifi && (
            <AmenityItem>
              <Wifi className='h-4 w-4' />
              Frre Wifi
            </AmenityItem>
          )}
          {Room.cityView && (
            <AmenityItem>
              <Castle className='h-4 w-4' />
              City View
            </AmenityItem>
          )}
          {Room.oceanView && (
            <AmenityItem>
              <Ship className='h-4 w-4' />
              Ocean View
            </AmenityItem>
          )}
          {Room.forestView && (
            <AmenityItem>
              <Trees className='h-4 w-4' />
              Forest View
            </AmenityItem>
          )}
          {Room.mountainView && (
            <AmenityItem>
              <MountainSnow className='h-4 w-4' />
              Mountain View
            </AmenityItem>
          )}
          {Room.airCondition && (
            <AmenityItem>
              <AirVent className='h-4 w-4' />
              Air Condition
            </AmenityItem>
          )}
          {Room.soundProoFed && (
            <AmenityItem>
              <VolumeX className='h-4 w-4' />
              Sound Proofed
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className='flex gapp-4 justify-between'>
          <div>
            Room Price: <span className='font-bold'>${Room.roomPrice}</span>
          </div>
          {!!Room.breackFastPrice && (
            <div>
              BreakFast Price:{" "}
              <span className='font-bold'>${Room.breackFastPrice}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className='flex flex-col gap-2'>
          <CardTitle>Booking Details</CardTitle>
          <div className='text-primary/50'>
            <div>
              Room booked by {booking.userName} for {dayCount} days -{" "}
              {moment(booking.bookedAt).fromNow()}
            </div>
            <div>Check-in: {startDate} at 5PM</div>
            <div>Check-out: {endDate} at 5PM</div>
            {booking.breakFastIncluded && <div>Breakfast will be served</div>}
            {booking.payementStatus ? (
              <div className='text-teal-500'>
                Paid ${booking.totalPrice} - Room Reserved
              </div>
            ) : (
              <div className='text-rose-500'>
                Not Paid ${booking.totalPrice} - Room Not Resered
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button
          disabled={bookingIsLoading}
          variant='outline'
          onClick={() => router.push(`/hotel-details/${Hotel.id}`)}>
          View Hotel
        </Button>
        {!booking.payementStatus && booking.userId === userId && (
          <Button
            disabled={bookingIsLoading}
            onClick={() => handleBookRoom()}>
            {bookingIsLoading ? "Processing..." : "Pay Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default MyBookingsClient
