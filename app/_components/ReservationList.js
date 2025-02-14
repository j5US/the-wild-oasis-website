"use client";

import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {

    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings,
        (curBookings, bookingId) => {
            return curBookings.filter(booking => booking.id !== bookingId)
        });

    const handleDelete = async (bookingId) => {
        optimisticDelete(bookingId);
        await deleteBooking(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard
                    onDelete={handleDelete}
                    booking={booking}
                    key={booking.id}
                />
            ))}
        </ul>
    );
}

export default ReservationList;
