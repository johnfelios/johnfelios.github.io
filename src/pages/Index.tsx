
import { useState } from "react";
import Header from "@/components/Header";
import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import GymInfo from "@/components/GymInfo";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700">
          <Calendar 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        
        <div className={`${isMobile ? 'p-3' : 'p-6'} flex-1`}>
          <div className="max-w-5xl mx-auto space-y-8">
            <GymInfo />
            <TimeSlots
              bookings={getFilteredBookings()}
              onBookPrivate={bookPrivate}
              onBookOpen={bookOpen}
              onJoinOpen={joinOpenRoom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
