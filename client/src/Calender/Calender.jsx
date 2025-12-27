import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { FiCalendar, FiPlus } from "react-icons/fi";
import axios from "axios";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://cct7c1zv-3000.inc1.devtunnels.ms/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to mock data if API fails
        setEvents([
          { date: "2025-12-14", label: "AC Check", type: "preventive" },
          { date: "2025-12-20", label: "Machine Failure", type: "breakdown" },
          { date: "2025-12-27", label: "Inspection", type: "inspection" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  function handleDateClick(date) {
    setSelectedDate(date);
    setShowModal(true);
  }

  function addEvent(e) {
    e.preventDefault();
    const label = e.target.label.value;

    setEvents([
      ...events,
      { date: format(selectedDate, "yyyy-MM-dd"), label, type: "preventive" }
    ]);

    setShowModal(false);
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Calender View</h2>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
          New
        </button>
      </div>

      {/* Calendar Container */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm w-full">
        {loading ? (
          <div>Loading events...</div>
        ) : (
          <Calendar
            className="custom-calendar w-full"
            onClickDay={handleDateClick}
            value={selectedDate}
            tileContent={({ date }) => {
              const event = events.find(
                e => new Date(e.date).toDateString() === date.toDateString()
              );

              return event ? (
                <div className={`mt-1 text-xs font-semibold px-2 py-1 rounded event-${event.type}`}>
                  {event.label}
                </div>
              ) : null;
            }}
          />
        )}
      </div>

      {/* Modal (unchanged) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-bold mb-3">
              Schedule on {format(selectedDate, "PPP")}
            </h3>

            <form onSubmit={addEvent} className="space-y-3">
              <input
                name="label"
                placeholder="Maintenance title"
                className="w-full border rounded-lg px-3 py-2"
                required
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border rounded-lg py-2"
                >
                  Cancel
                </button>

                <button className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg py-2">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}