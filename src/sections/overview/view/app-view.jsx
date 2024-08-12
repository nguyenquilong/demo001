import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Typography, Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


export default function AppView() {
  const [events, setEvents] = useState([
    {
      title: 'test 001',
      start: '2024-08-13T00:00',
    },
    {
      title: 'test 002',
      start: '2024-08-14T16:03',
    },
  ]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDateTime, setNewEventDateTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedResource, setSelectedResource] = useState('');
  const [dateOption, setDateOption] = useState('today'); // 'today', 'recurring', 'dateRange'
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateClick = (info) => {
    const clickedDate = new Date(info.dateStr);
    const today = new Date();

    if (clickedDate < today.setHours(0, 0, 0, 0)) {
      return;
    }
    setNewEventDateTime(info.dateStr + 'T00:00');
    setIsAddEventOpen(true);
  };

  const handleAddEvent = () => {
    const newEvent = {
      title: `${newEventTitle} (${selectedResource})`,
      start: dateOption === 'dateRange' && dateRange[0] && dateRange[1] ? dateRange[0].toISOString() : newEventDateTime,
      end: dateOption === 'dateRange' && dateRange[0] && dateRange[1] ? dateRange[1].toISOString() : null,
      isTime: dateOption // 'today', 'recurring', 'dateRange'
    };
    setEvents([...events, newEvent]);
    setIsAddEventOpen(false);
    setNewEventTitle('');
    setNewEventDateTime('');
    setSelectedResource('');
    setDateOption('today');
    setDateRange([null, null]);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    debugger
    setIsEventDetailsOpen(true);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      selectedEvent.remove(); 
      setIsEventDetailsOpen(false); 
      setSelectedEvent(null); 
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          selectable
          dayCellClassNames={(arg) => {
            const date = new Date(arg.date);
            const today = new Date();
            if (date < today) {
              return 'fc-day-disabled';
            }
            return '';
          }}
        />

        {/* Modal thêm sự kiện mới */}
        <Modal
          open={isAddEventOpen}
          onClose={() => setIsAddEventOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: 24,
            }}
          >
            <h2 id="simple-modal-title">Add New Order</h2>
            <TextField
              label="Task Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Resource</InputLabel>
              <Select
                value={selectedResource}
                onChange={(e) => setSelectedResource(e.target.value)}
              >
                <MenuItem value="Phòng họp">Phòng họp</MenuItem>
                <MenuItem value="Máy tính">Máy tính</MenuItem>
                <MenuItem value="Máy chiếu">Máy chiếu</MenuItem>
              </Select>
            </FormControl>
            <FormControl component="fieldset" margin="normal">
              <RadioGroup
                value={dateOption}
                onChange={(e) => setDateOption(e.target.value)}
              >
                <FormControlLabel value="today" control={<Radio />} label="Hôm nay" />
                <FormControlLabel value="recurring" control={<Radio />} label="Chọn lặp lại" />
                <FormControlLabel value="dateRange" control={<Radio />} label="Chọn thời gian dài" />
              </RadioGroup>
            </FormControl>
            {dateOption === 'dateRange' ? (
              <DateRangePicker
                startText="Start"
                endText="End"
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} fullWidth margin="normal" />
                    <TextField {...endProps} fullWidth margin="normal" />
                  </>
                )}
              />
            ) : (
              <TextField
                label="Date & Time"
                type="datetime-local"
                value={newEventDateTime}
                onChange={(e) => setNewEventDateTime(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().slice(0, 16), // Định dạng YYYY-MM-DDTHH:mm
                }}
              />
            )}
            <Button variant="contained" color="primary" onClick={handleAddEvent}>
              Add Order
            </Button>
          </div>
        </Modal>

        {/* Modal hiển thị chi tiết sự kiện */}
        <Modal
          open={isEventDetailsOpen}
          onClose={() => setIsEventDetailsOpen(false)}
          aria-labelledby="event-modal-title"
          aria-describedby="event-modal-description"
        >
          <div
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: 24,
            }}
          >
            <h2 id="event-modal-title">Event Details</h2>
            {selectedEvent && (
              <>
                <Typography variant="h6" gutterBottom>
                  Title: {selectedEvent.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Date & Time: {selectedEvent.extendedProps.isTime} - {JSON.stringify(selectedEvent)} - {JSON.stringify(selectedEvent.endStr)}
                  -
                  { selectedEvent.extendedProps.isTime === 'dateRange' ?  `${selectedEvent.startStr}  -  ${selectedEvent.endStr}` : selectedEvent.startStr }
                  
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEventDetailsOpen(false)}
                  sx={{ mr: 2 }}
                >
                  Close
                </Button>
                <Button variant="contained" color="error" onClick={handleDeleteEvent}>
                  Delete Event
                </Button>
              </>
            )}
          </div>
        </Modal>
      </div>
    </Container>
    </LocalizationProvider>
  );
}
