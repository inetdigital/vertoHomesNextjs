"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

const ArrangeViewing = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "", email: "" });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });

  const validateField = (fieldName, value) => {
    let error = "";

    if (fieldName === "name") {
      error = value.trim() === "" ? "Name is required" : "";
    } else if (fieldName === "phone") {
      error = /^\d{10}$/.test(value) ? "" : "Phone number must be 10 digits";
    } else if (fieldName === "email") {
      error = /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address";
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleBlur = (fieldName, value) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, value);
  };

  const isFormValid =
    !errors.name && !errors.phone && !errors.email && name && phone && email;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateField("name", name);
    validateField("phone", phone);
    validateField("email", email);

    if (isFormValid) {
      alert("Form submitted successfully!");
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        aria-hidden="true"
      />
      <DialogPanel className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-vertoDarkGreen">
          Arrange a Viewing
        </h2>
        <p className="mb-6 text-gray-600">
          Register your interest and we’ll send you a link to pick a viewing
          time that suits you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name", name)}
              className={`w-full p-2 border rounded-md ${
                touched.name && errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur("phone", phone)}
              className={`w-full p-2 border rounded-md ${
                touched.phone && errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email", email)}
              className={`w-full p-2 border rounded-md ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-vertoLightGreen text-white font-semibold rounded-md ${
              isFormValid
                ? "hover:bg-green-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      </DialogPanel>
    </Dialog>
  );
};

export default ArrangeViewing;
