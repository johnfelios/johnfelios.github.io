
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dates } from "@/utils/mockData";
import { format, parse } from "date-fns";

interface CalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const Calendar = ({ selectedDate, onSelectDate }: CalendarProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap py-2">
      <div className="flex gap-2 px-4 pb-3">
        {dates.map((date) => {
          const dateObj = parse(date, "yyyy-MM-dd", new Date());
          const isToday = date === dates[0];
          const isSelected = date === selectedDate;
          
          return (
            <Button
              key={date}
              variant={isSelected ? "default" : "outline"}
              className={`flex flex-col h-auto py-2 ${
                isSelected ? "bg-primary hover:bg-primary/90" : ""
              }`}
              onClick={() => onSelectDate(date)}
            >
              <span className="text-xs font-normal">
                {format(dateObj, "EEE")}
              </span>
              <span className="text-lg font-bold">{format(dateObj, "d")}</span>
              {isToday && <span className="text-xs mt-1">Today</span>}
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default Calendar;
