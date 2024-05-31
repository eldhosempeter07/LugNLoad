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
