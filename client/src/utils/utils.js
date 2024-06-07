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

export const haulInfo = [
  {
    name: "Emma Johnson",
    driver_id: "emma_driver123",
    origin: "123 Main St, Toronto, ON",
    destination: "456 Elm St, Ottawa, ON",
    capacity: "1000 lbs",
    dimension: "8' x 5' x 4'",
    budget: "$200-$300",
    vehicle_type: "Van",
    vehicle_plate_number: "XYZ456",
  },
  {
    name: "Michael Williams",
    driver_id: "mike_trucker456",
    origin: "789 Oak St, Hamilton, ON",
    destination: "101 Maple St, Brampton, ON",
    capacity: "3000 lbs",
    dimension: "12' x 6' x 5'",
    budget: "$400-$600",
    vehicle_type: "Truck",
    vehicle_plate_number: "ABC123",
  },
  {
    name: "Sophia Martinez",
    driver_id: "sophia_hauler789",
    origin: "222 Cedar St, Mississauga, ON",
    destination: "333 Pine St, Niagara Falls, ON",
    capacity: "8000 lbs",
    dimension: "20' x 8' x 7'",
    budget: "$800-$1000",
    vehicle_type: "Trailer",
    vehicle_plate_number: "DEF789",
  },
  {
    name: "Liam Brown",
    driver_id: "liam_driver001",
    origin: "444 Walnut St, London, ON",
    destination: "555 Cherry St, Kingston, ON",
    capacity: "1200 lbs",
    dimension: "8' x 5' x 4.5'",
    budget: "$250-$350",
    vehicle_type: "Van",
    vehicle_plate_number: "JKL321",
  },
  {
    name: "Olivia Taylor",
    driver_id: "olivia_trucker002",
    origin: "666 Maple St, Kitchener, ON",
    destination: "777 Elm St, Windsor, ON",
    capacity: "3500 lbs",
    dimension: "14' x 6.5' x 5.5'",
    budget: "$450-$650",
    vehicle_type: "Truck",
    vehicle_plate_number: "MNO987",
  },
  {
    name: "Noah Garcia",
    driver_id: "noah_hauler003",
    origin: "888 Pine St, Guelph, ON",
    destination: "999 Oak St, Oshawa, ON",
    capacity: "9000 lbs",
    dimension: "22' x 8.5' x 7.5'",
    budget: "$900-$1100",
    vehicle_type: "Trailer",
    vehicle_plate_number: "PQR654",
  },
  {
    name: "Ava Rodriguez",
    driver_id: "ava_driver004",
    origin: "111 Elm St, Burlington, ON",
    destination: "222 Maple St, Cambridge, ON",
    capacity: "1100 lbs",
    dimension: "8.5' x 5.5' x 4'",
    budget: "$270-$370",
    vehicle_type: "Van",
    vehicle_plate_number: "STU246",
  },
  {
    name: "William Martinez",
    driver_id: "william_trucker005",
    origin: "333 Oak St, Barrie, ON",
    destination: "444 Cedar St, Sudbury, ON",
    capacity: "3200 lbs",
    dimension: "13' x 6' x 5.5'",
    budget: "$430-$630",
    vehicle_type: "Truck",
    vehicle_plate_number: "VWX852",
  },
  {
    name: "Isabella Hernandez",
    driver_id: "isabella_hauler006",
    origin: "555 Pine St, St. Catharines, ON",
    destination: "666 Elm St, Peterborough, ON",
    capacity: "8500 lbs",
    dimension: "21' x 8' x 7'",
    budget: "$850-$1050",
    vehicle_type: "Trailer",
    vehicle_plate_number: "YZA369",
  },
];
