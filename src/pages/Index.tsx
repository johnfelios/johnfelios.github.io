
import { useState } from "react";
import Header from "@/components/Header";
import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import { useBookings } from "@/hooks/useBookings";
import { rooms } from "@/utils/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedRoom,
    setSelectedRoom,
    getFilteredBookings,
    bookPrivate,
    bookOpen,
    joinOpenRoom
  } = useBookings();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-white border-b">
          <Calendar 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
        
        <Tabs value={selectedRoom} onValueChange={setSelectedRoom} className="flex-1">
          <div className="sticky top-[72px] z-10 bg-white border-b">
            <TabsList className="w-full p-0 h-12 bg-white">
              {rooms.map(room => (
                <TabsTrigger
                  key={room.id}
                  value={room.id}
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {room.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {rooms.map(room => (
            <TabsContent key={room.id} value={room.id} className="p-4 flex-1">
              <TimeSlots
                bookings={getFilteredBookings()}
                onBookPrivate={bookPrivate}
                onBookOpen={bookOpen}
                onJoinOpen={joinOpenRoom}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
