"use client";

import { parseDate } from "chrono-node";
import { CalendarIcon, Clock2Icon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/cn";
import { FieldDescription, FieldLabel } from "./ui/field";

export const formatDateOnly = (timestamp: number | Date) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const formatDateWithTime = (timestamp: number | Date) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface DateInputFieldProps {
  id?: string;
  label: string;
  value?: string | number | undefined;
  disabled?: boolean;
  required?: boolean;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  className?: string;
  showTime?: boolean;
}

export const DateInputField = ({
  id,
  label,
  value,
  onChange,
  disabled,
  required,
  placeholder = "Tomorrow or next week",
  className,
  showTime = false,
}: DateInputFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const parseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const formatDate = showTime ? formatDateWithTime : formatDateOnly;

  const valueToDate = React.useCallback((val: string | number | undefined): Date | undefined => {
    if (!val) return undefined;

    if (typeof val === "number") {
      return new Date(val);
    }

    if (typeof val === "string") {
      const isoDate = new Date(val);
      if (!isNaN(isoDate.getTime())) {
        return isoDate;
      }
      return parseDate(val) || undefined;
    }

    return undefined;
  }, []);

  const [date, setDate] = React.useState<Date | undefined>(() => valueToDate(value));
  const [inputValue, setInputValue] = React.useState<string>(() => {
    const initialDate = valueToDate(value);
    return initialDate ? formatDate(initialDate) : "";
  });
  const [month, setMonth] = React.useState<Date | undefined>(date);

  React.useEffect(() => {
    return () => {
      if (parseTimeoutRef.current) {
        clearTimeout(parseTimeoutRef.current);
      }
    };
  }, []);

  const isInternalChangeRef = React.useRef(false);

  React.useEffect(() => {
    const newDate = valueToDate(value);
    setDate(newDate);
    setMonth(newDate);

    if (!isInternalChangeRef.current) {
      setInputValue(newDate ? formatDate(newDate) : "");
    }

    isInternalChangeRef.current = false;
  }, [value, valueToDate, formatDate]);

  const handleInputChange = (inputVal: string) => {
    setInputValue(inputVal);

    if (parseTimeoutRef.current) {
      clearTimeout(parseTimeoutRef.current);
    }

    parseTimeoutRef.current = setTimeout(() => {
      if (inputVal === "") {
        setDate(undefined);
        setMonth(undefined);
        isInternalChangeRef.current = true;
        onChange(undefined);
      } else {
        const parsedDate = parseDate(inputVal);
        if (parsedDate) {
          setDate(parsedDate);
          setMonth(parsedDate);
          isInternalChangeRef.current = true;
          onChange(parsedDate.toISOString());
        }
      }
    }, 200);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDateTime = new Date(selectedDate);

      if (showTime && date) {
        // Preserve existing time when selecting a new date
        newDateTime.setHours(date.getHours());
        newDateTime.setMinutes(date.getMinutes());
        newDateTime.setSeconds(date.getSeconds());
        newDateTime.setMilliseconds(date.getMilliseconds());
      } else if (!showTime) {
        newDateTime.setHours(0, 0, 0, 0);
      }

      setDate(newDateTime);
      setInputValue(formatDate(newDateTime));
      isInternalChangeRef.current = true;
      onChange(newDateTime.toISOString());
    } else {
      setDate(undefined);
      setInputValue("");
      isInternalChangeRef.current = true;
      onChange(undefined);
    }
    setOpen(false);
  };

  const handleTimeChange = (timeValue: string) => {
    if (!showTime || !timeValue || !date) return;

    const [hours, minutes, seconds = 0] = timeValue.split(":").map(Number);
    const newDateTime = new Date(date);
    newDateTime.setHours(hours, minutes, seconds);

    setDate(newDateTime);
    setInputValue(formatDate(newDateTime));
    isInternalChangeRef.current = true;
    onChange(newDateTime.toISOString());
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <FieldLabel htmlFor={id} className={cn("", required && "required")}>
        {label ?? (showTime ? "Date and Time" : "Date")}
      </FieldLabel>
      <FieldDescription>
        Using <span className="bg-muted rounded px-2 font-medium">chrono-node</span> library to parse dates from natural
        language input.
      </FieldDescription>
      <div className="relative flex gap-2">
        <Input
          id={id}
          name={id}
          value={inputValue}
          placeholder={placeholder || "Tomorrow or next week"}
          disabled={disabled}
          className="bg-background pr-10 font-mono"
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            <Button type="button" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
              <CalendarIcon className="absolute size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden py-2" align="end">
            <Calendar
              mode="single"
              disabled={{ after: new Date(2052, 11, 31) }}
              selected={date}
              captionLayout="dropdown"
              endMonth={new Date(2050, 11, 31)}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
            />
            {showTime && (
              <div className="flex w-full flex-col gap-2 px-3">
                <Label htmlFor="time-to">Time</Label>
                <div className="relative flex w-full items-center gap-2">
                  <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
                  <Input
                    id="time-to"
                    type="time"
                    step="1"
                    value={date ? date.toTimeString().slice(0, 8) : "12:30:00"}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      {date && (
        <FieldDescription className="text-muted-foreground px-1 text-xs">
          Selected date: <span className="font-medium">{formatDate(date)}</span>
        </FieldDescription>
      )}
    </div>
  );
};
