const vehicleTypes = [
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

export const getVehicleType = (items) => {
  let totalLength = 0;
  let totalWidth = 0;
  let totalHeight = 0;

  items.forEach((item) => {
    totalLength += item.length * item.number;
    totalWidth += item.width * item.number;
    totalHeight += item.height * item.number;
  });

  for (let vehicle of vehicleTypes) {
    if (
      totalLength <= vehicle.maxDimensions.length &&
      totalWidth <= vehicle.maxDimensions.width &&
      totalHeight <= vehicle.maxDimensions.height
    ) {
      return vehicle.type;
    }
  }

  return "No suitable vehicle found";
};
