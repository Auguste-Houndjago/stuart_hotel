// import Image from "next/image";
// import { PageProps } from '../.next/types/app/layout';
 import AddHotelForm from "@/components/hotel/AddHotelForm";

import { Button } from "@/components/ui/button"

// import { UserButton } from "@clerk/nextjs";



export default function Home() {
  return (
    <div>
      home page
      {/* <Button variant={"outline"}>
        hello me
      </Button> */}

      <AddHotelForm/>

    </div>
  );
}
