"use client";

import {
    Clock3,
    MapPin,
} from "lucide-react";

export default function PickupCard() {

    return (

        <div className="rounded-3xl bg-green-600 p-6 text-white">

            <div className="flex items-center gap-2">

                <MapPin size={18}/>

                <span className="font-semibold">
                    Pickup Store
                </span>

            </div>

            <h2 className="mt-3 text-2xl font-bold">
                Bhatbhateni Supermarket
            </h2>

            <p className="mt-1 text-green-100">
                Putalisadak, Kathmandu
            </p>

            <div className="mt-5 flex items-center gap-2">

                <Clock3 size={18}/>

                Ready in 15-20 mins

            </div>

        </div>

    );

}