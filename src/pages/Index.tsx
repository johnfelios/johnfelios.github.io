
import { useState } from "react";
import Header from "@/components/Header";
import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import { useBookings } from "@/hooks/useBookings";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const {
    selectedDate,
    setSelectedDate,
    getFilteredBookings,
    bookPrivate,
    bookOpen,
    joinOpenRoom
  } = useBookings();
  
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700">
          <Calendar 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        
        <div className={`${isMobile ? 'p-3' : 'p-4'} flex-1`}>
          <TimeSlots
            bookings={getFilteredBookings()}
            onBookPrivate={bookPrivate}
            onBookOpen={bookOpen}
            onJoinOpen={joinOpenRoom}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
