import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import "../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import 'react-datepicker/dist/react-datepicker.css'
import { useMutation } from 'react-query';
import UserDetailContext from '../context/userDetailContext';
import { DatePicker, Modal } from 'antd';
import { createBooking,getBookedTimeSlots } from "../utils/api.js";
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment/moment.js';
import { toast } from 'react-toastify';

const BookingModal = ({ closeModal, userEmail, carId, costPerHour }) => {
  const { RangePicker } = DatePicker;

  const { userDetails: { token } } = useContext(UserDetailContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

  useEffect(() => {
    // Assuming you have a function to get booked time slots based on the carId or userEmail
    const fetchBookedTimeSlots = async () => {
      try {
        const fetchedBookedTimeSlots = await getBookedTimeSlots(carId, userEmail);
        setBookedTimeSlots(fetchedBookedTimeSlots);
      } catch (error) {
        console.error('Error fetching booked time slots:', error);
      }
    };

    if (isOpenModal) {
      fetchBookedTimeSlots();
    }
  }, [isOpenModal, carId, userEmail]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (!e.target.value) {
      toast.error("Enter Address");
    }
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    if (!e.target.value) {
      toast.error("Enter Phone number");
    }
  };

  const selectTimeSlots = (dates) => {
    if (dates && dates.length === 2) {
      const [selectedStartDate, selectedEndDate] = dates;

      console.log("Start Date:", selectedStartDate.format('DD MM YYYY HH:mm'));
      console.log("End Date:", selectedEndDate.format('DD MM YYYY HH:mm'));

      const calculatedHours = selectedEndDate.diff(selectedStartDate, 'hours');
      console.log("Total Hours:", calculatedHours);

      setStartDate(selectedStartDate);
      setEndDate(selectedEndDate);
      setTotalHours(calculatedHours);
    } else {
      setStartDate(null);
      setEndDate(null);
      setTotalHours(0);
    }
  };

  const transactionId = "hdkas213hkj2";

  const { mutate } = useMutation({
    mutationFn: () => createBooking(carId, userEmail, startDate, endDate, address,phoneNumber, totalHours, totalHours * costPerHour, transactionId),
  });

  const formattedTotalAmount = (totalHours * costPerHour).toLocaleString();

  function onToken(token) {
    console.log(token);
  }

  const handleConfirmation = () => {
    const confirmed = window.confirm("Are you sure you want to place the booking?");
    if (confirmed && isFormValid) {
      // If user confirms and the form is valid, proceed with the booking
      mutate();
    } else {
      // If not confirmed or form is not valid, do nothing or show a message
      setIsFormValid(false); // Update state to show the message
    }
  };

  


  return (
    <div>
      <br />
      <Form>
      
      <FormGroup className="address_input d-inline-block me-4 mb-4">
          <input
            type="tel"
            placeholder="Phone Number"
            className="form-control"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </FormGroup>

      <FormGroup className="address_input d-inline-block me-4 mb-4">
          <input
            type="text"
            placeholder="Address"
            className="form-control"
            value={address}
            onChange={handleAddressChange}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <RangePicker format='DD MM YYYY HH:mm' showTime={{ format: 'HH:mm' }} onChange={selectTimeSlots} />
        </FormGroup>

        <FormGroup>
          <p style={{ fontSize: 18, fontWeight: 400, padding: 5 }}>Total Hours: {totalHours}</p>
          <p style={{ fontSize: 18, fontWeight: 400, padding: 5 }}>Cost Per Hour: {costPerHour}</p>
          <hr />
          <h2>Total Amount: {formattedTotalAmount}</h2>
        </FormGroup>

        {startDate && endDate && (
          <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <StripeCheckout
            shippingAddress
            token={onToken}
            stripeKey="my_PUBLISHABLE_stripekey"
          >
            <Button variant="outline-primary" onClick={handleConfirmation} disabled={!address && !phoneNumber && !startDate && !endDate}>Submit</Button>
          </StripeCheckout>
        </FormGroup>
        )}
      </Form>
      <Button variant="outline-primary" onClick={() => {setIsOpenModal(true)}}>See Booked Slot</Button>
      <Modal open={isOpenModal} closable={false} footer={false} title={'Booked Time Slot'}>
        {bookedTimeSlots.length > 0 ? (
          <ul>
            {bookedTimeSlots.map((timeSlot) => (
              <li key={timeSlot.id}>
               <strong> Start Date:</strong> {moment(timeSlot.startDate).format('MMMM/DD/YYYY  h:mm A')}, <br />
               <strong> End Date:</strong> {moment(timeSlot.endDate).format('MMMM/DD/YYYY  h:mm A')}
              </li>
            ))}
          </ul>
        ) : (
          <p>No booked time slot</p>
        )}
        <Button variant="outline-danger" onClick={() => setIsOpenModal(false)}>
          Close
        </Button>
      </Modal>
      <p>{carId}</p>
      <p>{userEmail}</p>
      <p>{costPerHour}</p>
      <p>Start Date: {startDate && startDate.format('DD MM YYYY HH:mm')}</p>
      <p>End Date: {endDate && endDate.format('DD MM YYYY HH:mm')}</p>
      <p>Total Hours: {totalHours}</p>
      <p>Address:{address}</p>
      <p>Phone Number:{phoneNumber}</p>

      <Button variant="outline-danger" onClick={() => { closeModal(false) }}>Close</Button>
    </div>
  );
}

export default BookingModal;
