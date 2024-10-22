import axios from "axios";
import { toast } from "react-toastify";
import bodyParser from "body-parser";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllCars = async () => {
  try {
    const response = await api.get("/car/allcars", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong creating user, Please try again");
    throw error;
  }
};

// export const bookCar = async (date, carId, email, token) => {
//   try {
//     await api.post(
//       `/user/bookVisit/${carId}`,
//       {
//         email,
//         id: carId,
//         date: date,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//       console.info(date)
//     );
//   } catch (error) {
//     toast.error("Something went wrong, Please try again");
//     throw error;
//   }
// };

//function  to get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await api.get("/blog/allblogs", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

//function to add a car to favourite
export const toFav = async (id, email) => {
  try {
    await api.post(`/user/addFavourite/${id}`, {
      email,
    });
  } catch (e) {
    throw e;
  }
};

//function to get all favourite cars
export const getAllFav = async (email) => {
  try {
    const res = await api.post(`/user/allFavourite`, {
      email,
    });

    return res.data["favCarsID"];
  } catch (e) {
    toast.error("Something went wrong while fetching favourite cars");
    throw e;
  }
};

// function to create a booking
// Function to check if a booking with the same carId, startDate, and endDate already exists
export const checkExistingBooking = async (
  carId,
  userEmail,
  startDate,
  endDate
) => {
  try {
    const existingBooking = await api.get(`/booking/check`, {
      params: {
        carId: carId,
        userEmail: userEmail,
        startDate: startDate,
        endDate: endDate,
      },
    });

    return existingBooking.data.exists;
  } catch (error) {
    toast.error("Error checking existing booking");
    throw error;
  }
};

// Function to create a new booking
export const createBooking = async (
  carId,
  userEmail,
  startDate,
  endDate,
  address,
  phoneNumber,
  totalHours,
  totalAmount,
  transactionId
) => {
  try {
    // Check if a booking with the same carId, startDate, and endDate already exists
    const isExistingBooking = await checkExistingBooking(
      carId,
      userEmail,
      startDate,
      endDate
    );

    if (isExistingBooking) {
      throw new Error(
        "Duplicate booking detected. Please choose different dates or cars."
      );
    }

    // If no duplicate booking, proceed to create a new one
    const res = await api.post(`/booking/create`, {
      data: {
        carId: carId,
        userEmail: userEmail,
        startDate: startDate,
        endDate: endDate,
        address: address,
        phoneNumber: phoneNumber,
        totalHours: totalHours,
        totalAmount: totalAmount,
        transactionId: transactionId,
      },
    });

    return res.data.booking;
  } catch (error) {
    toast.error("Something went wrong creating booking. Please try again.");
    throw error;
  }
};

// previous version of code
// export const createBooking = async (
//   carId,
//   userEmail,
//   startDate,
//   endDate,
//   address,
//   phoneNumber,
//   totalHours,
//   totalAmount,
//   transactionId
// ) => {
//   try {
//     // Check if a booking with the same carId, startDate, and endDate already exists
//     const existingBooking = await api.get(`/booking/check`, {
//       params: {
//         carId: carId,
//         userEmail: userEmail,
//         startDate: startDate,
//         endDate: endDate,
//       },
//     });
//     if (existingBooking.data.exists) {
//       throw new Error(
//         "Duplicate booking detected. Please choose different dates or cars."
//       );
//     }

//     // If no duplicate booking, proceed to create a new one
//     const res = await api.post(`/booking/create`, {
//       data: {
//         carId: carId,
//         userEmail: userEmail,
//         startDate: startDate,
//         endDate: endDate,
//         address: address,
//         phoneNumber: phoneNumber,
//         totalHours: totalHours,
//         totalAmount: totalAmount,
//         transactionId: transactionId,
//       },
//     });

//     return res.data.booking;
//   } catch (error) {
//     toast.error("Something went wrong creating booking, Please try again");
//     throw error;
//   }
// };

export const getBookedTimeSlots = async (carId, userEmail) => {
  try {
    const response = await api.get(
      `/booking/booked-time-slots?carId=${carId}&userEmail=${userEmail}`
    );
    return response.data; // Adjust the response structure based on your API
  } catch (error) {
    throw error;
  }
};
