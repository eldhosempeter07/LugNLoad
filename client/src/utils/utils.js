import axios from "axios";

export const vehicleTypes = [
  {
    type: "Small Van",
    maxDimensions: { length: 2.0, width: 1.2, height: 1.2 },
  },
  {
    type: "Medium Van",
    maxDimensions: { length: 2.5, width: 1.5, height: 1.5 },
  },
  {
    type: "Large Van",
    maxDimensions: { length: 3.0, width: 1.8, height: 1.8 },
  },
];

export const radioOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const getMinimumDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  let month = (now.getMonth() + 1).toString();
  month = month.length === 1 ? "0" + month : month;
  let day = now.getDate().toString();
  day = day.length === 1 ? "0" + day : day;
  return `${year}-${month}-${day}`;
};

export const getMinimumTime = () => {
  const now = new Date();
  now.setHours(now.getHours() - 8);
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = (hours % 12 || 12).toString().padStart(2, "0");
  return `${hours}:${minutes} ${ampm}`;
};

export const sliceAfterFourWords = (text) => {
  const words = text.split(" ");
  if (words.length > 4) {
    const firstFourWords = words.slice(0, 4).join(" ");
    return firstFourWords;
  }
  return text;
};

export const convertTo12HourFormat = (time24) => {
  // Split the time string into hours and minutes
  var timeSplit = time24.split(":");
  var hours = parseInt(timeSplit[0], 10);
  var minutes = parseInt(timeSplit[1], 10);

  // Determine AM or PM
  var suffix = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Pad minutes with leading zeros if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Form the 12-hour format string
  var time12 = hours + ":" + minutes + " " + suffix;

  return time12;
};

export const getCoordinates = async (location) => {
  try {
    const response = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: location,
          key: process.env.REACT_APP_OPENCAGE_API_KEY,
        },
      }
    );

    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lng };
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
};

export const findDistanceBtwnPoints = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;

  const lat1 = coords1.lat;
  const lon1 = coords1.lng;
  const lat2 = coords2.lat;
  const lon2 = coords2.lng;

  const R = 6371; // Radius of the Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance; // Distance in km
};
