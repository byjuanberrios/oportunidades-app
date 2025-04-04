import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setFilters } from "../store/opportunitiesSlice";
import { RootState, AppDispatch } from "../store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { OPPORTUNITY_TYPE_LABELS } from "@/lib/constants";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

const OpportunitiesFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate, type } = useSelector(
    (state: RootState) => state.opportunities.filters
  );
  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  useEffect(() => {
    dispatch(
      setFilters({
        startDate: date?.from?.toISOString(),
        endDate: date?.to?.toISOString(),
      })
    );
  }, [date, dispatch]);

  const handleTypeChange = (value: string) => {
    dispatch(setFilters({ type: value === "all" ? null : value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setDate(undefined);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-6 justify-end bg-gray-100 rounded-sm p-3">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Label htmlFor="type">Tipo</Label>
        <Select onValueChange={handleTypeChange} value={type || "all"}>
          <SelectTrigger className="w-full md:w-40 bg-white">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {Object.entries(OPPORTUNITY_TYPE_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Label htmlFor="type">Fechas</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/yyyy")} -{" "}
                    {format(date.to, "dd/MM/yyyy")}
                  </>
                ) : (
                  format(date.from, "dd/MM/yyyy")
                )
              ) : (
                <span>Seleccionar fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => handleClearFilters()}
      >
        Quitar filtros
      </Button>
    </div>
  );
};

export default OpportunitiesFilter;
