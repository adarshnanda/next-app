"use client";
import { useState } from "react";
export default function DateForm() {
  const [reservationMap, setReservationMap] = useState<Map<string, string[]>>(
    new Map()
  );

  console.log("reservationMap", reservationMap);

  /**
   * Get dates between two dates
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Date[]}
   * @example
   * getDatesBetweenDates(new Date("2022-01-01"), new Date("2022-01-05"));
   * // [Sun Jan 01 2022 00:00:00 GMT+0530 (India Standard Time), Mon Jan 02 2022 00:00:00 GMT+0530 (India Standard Time), Tue Jan 03 2022 00:00:00 GMT+0530 (India Standard Time), Wed Jan 04 2022 00:00:00 GMT+0530 (India Standard Time)]
   */
  interface GetDatesBetweenDates {
    (startDate: string, endDate: string): string[];
  }
  const getDatesBetweenDates: GetDatesBetweenDates = (startDate, endDate) => {
    let dates: string[] = [];
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    while (startDateObj < endDateObj) {
      const dateString: string = startDateObj.toISOString().split("T")[0];
      dates = [...dates, dateString];
      startDateObj.setDate(startDateObj.getDate() + 1);
    }
    return dates;
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const checkIn = formData.get("check-in") as string;
    const checkOut = formData.get("check-out") as string;
    const dates = getDatesBetweenDates(checkIn, checkOut);
    console.log("Dates: ", dates);
    setReservationMap((prev: Map<string, string[]>) => {
      const newMap = new Map(prev);
      dates.forEach((date) => {
        if (newMap.has(date)) {
          newMap.set(date, [...newMap.get(date)!, name]);
        } else {
          newMap.set(date, [name]);
        }
      });
      //newMap.set(checkIn as string, [name]);
      return newMap;
    });
    e.currentTarget.reset();
  };
  return (
    <>
      <form
        className="grid grid-rows-4 grid-columns-1 gap-4 mx-auto"
        onSubmit={onFormSubmit}
      >
        <label
          htmlFor="name"
          className="flex gap-6 flex-wrap justify-between items-center	"
        >
          Name
          <input type="text" id="name" name="name" className="w-1/2" required />
        </label>

        <label
          htmlFor="check-in"
          className="flex gap-6 flex-wrap justify-between	items-center"
        >
          Check in Date
          <input
            type="date"
            id="check-in"
            name="check-in"
            className="w-1/2"
            required
          />
        </label>
        <label
          htmlFor="check-out"
          className="flex gap-6 flex-wrap justify-between items-center	"
        >
          Check out Date
          <input
            type="date"
            id="check-out"
            name="check-out"
            className="w-1/2"
            required
          />
        </label>

        <button
          type="submit"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Submit
        </button>
      </form>
      {reservationMap.size > 0 && (
        <table className="table-fixed text-center border-2 w-full">
          <thead>
            <tr className="border-2">
              <th className="border-2">Date</th>
              <th className="border-2">Names</th>
            </tr>
          </thead>
          <tbody>
            {[...reservationMap].sort().map(([date, names]) => (
              <tr key={date} className="border-2">
                <td className="border-2">{date}</td>
                <td className="border-2">{names.join(" & ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
