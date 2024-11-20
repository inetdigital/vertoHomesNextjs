import * as prismic from "@prismicio/client";

export function FormatUKPhoneNumber(phoneNumber) {
  phoneNumber = phoneNumber.phoneNumber;
  // Ensure phoneNumber is a string
  if (typeof phoneNumber === "object" && phoneNumber !== null) {
    // Extract the value if it's an object
    phoneNumber = phoneNumber.value || "";
  }

  // Convert to a string
  phoneNumber = String(phoneNumber);

  // Remove non-digit characters
  phoneNumber = "0" + phoneNumber.replace(/\D/g, "");

  // Format the number as a UK phone number
  if (phoneNumber.length === 11 && phoneNumber.startsWith("0")) {
    // Format with leading 0
    return phoneNumber.replace(/(\d{5})(\d{3})(\d{3})/, "$1 $2 $3");
  } else if (phoneNumber.length === 10) {
    // Format and add leading 0
    return phoneNumber.replace(/(\d{5})(\d{3})(\d{3})/, "0$1 $2 $3");
  } else {
    return phoneNumber;
  }
}
