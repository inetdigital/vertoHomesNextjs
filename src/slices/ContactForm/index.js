"use client";

import { useState, useEffect } from "react";
import { Bounded } from "@/components/Bounded";
import { Field, Label, Switch } from "@headlessui/react";

import { motion } from "framer-motion";
import { PrismicRichText } from "@/components/PrismicRichText";

const ContactForm = ({ slice }) => {
  console.log(slice);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreed: false,
    hearAboutUs: "",
    honeypot: "", // Hidden spam prevention field
  });
  const [contactFormId, setContactFormId] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // "success" or "error"

  useEffect(() => {
    if (slice) {
      let selectedFormId = "";

      switch (slice.variation) {
        case "default":
          selectedFormId = "9ac024f8-ca5a-45b4-93cd-e5f7f35e5d73";
          break;
        case "careersEnquiry":
          selectedFormId = "126bdcf1-955d-4639-834d-cbe3144ac729";
          break;
        default:
          selectedFormId = "9ac024f8-ca5a-45b4-93cd-e5f7f35e5d73"; // Fallback ID
      }

      setContactFormId(selectedFormId);
    }
  }, [slice]);

  const validateField = (name, value) => {
    let error = "";
    const fieldValue = value ? String(value).trim() : "";

    if (!fieldValue) {
      error = "This field is required.";
    } else {
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
        error = "Invalid email format.";
      }
      if (name === "phone" && !/^\d+$/.test(fieldValue)) {
        error = "Phone number must contain only numbers.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot validation: If the hidden field is filled, reject submission
    if (formData.honeypot) {
      setSubmissionStatus("error");
      return;
    }

    let hasErrors = false;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (!formData[key] && key !== "honeypot") hasErrors = true;
    });

    // Validate privacy policy agreement
    if (!formData.agreed) {
      newErrors.agreed = "You must agree to our privacy policy.";
      hasErrors = true;
    }

    setErrors(newErrors);
    if (hasErrors) return; // Stop if errors exist

    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Prepare data for HubSpot
    const hubspotData = {
      fields: [
        { name: "firstname", value: formData.firstName },
        { name: "lastname", value: formData.lastName },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        { name: "message", value: formData.message },
        { name: "hear_about_us", value: formData.hearAboutUs },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/144659623/${contactFormId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hubspotData),
        }
      );

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          agreed: false,
          hearAboutUs: "",
          honeypot: "",
        });
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    }

    setIsSubmitting(false);
  };

  return (
    <Bounded as="section" paddingAs="fullWidthBlock">
      <div className="isolate bg-vertoDarkBlue px-6 lg:px-8 py-24 sm:py-32">
        {slice.primary?.form_header_content &&
          slice.primary?.form_header_content.length > 0 && (
            <div className="mx-auto max-w-xl text-center text-white mb-20 pb-20 border-b-2 border-solid border-neutral-500">
              <PrismicRichText
                field={slice.primary.form_header_content}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-white">{children}</p>
                  ),
                }}
              />
            </div>
          )}
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {["firstName", "lastName", "email", "phone", "message"].map(
              (field) => (
                <div
                  key={field}
                  className={field === "message" ? "sm:col-span-2" : ""}
                >
                  <label className="block text-xl text-white font-extralight mb-4">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  {field === "message" ? (
                    <textarea
                      name={field}
                      rows={4}
                      value={formData[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md bg-white px-3.5 py-2"
                    />
                  ) : (
                    <input
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      value={formData[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md bg-white px-3.5 py-2"
                    />
                  )}
                  {errors[field] && (
                    <p className="text-red-500">{errors[field]}</p>
                  )}
                </div>
              )
            )}

            {/* How Did You Hear About Us? */}
            <div className="sm:col-span-2">
              <label className="block text-xl text-white font-extralight mb-4">
                How did you hear about us?
              </label>
              <select
                name="hearAboutUs"
                value={formData.hearAboutUs}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2"
              >
                <option value="">Select an option</option>
                {[
                  "Estate agent",
                  "Facebook",
                  "Facebook web conversion",
                  "Facebook lead gen",
                  "Google / search engine",
                  "Newspaper / magazine",
                  "PPC",
                  "Rightmove",
                  "Zoopla",
                  "Site signage",
                  "Twitter",
                  "Word of mouth",
                  "Other",
                  "Google",
                  "From a friend",
                  "On site signage",
                  "Direct referral from Developer",
                  "Direct.gov",
                  "Right Move",
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Honeypot Field (Hidden) */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="hidden"
            />

            {/* Privacy Policy Switch */}
            <Field className="flex items-center gap-x-4 sm:col-span-2">
              <Switch
                checked={formData.agreed}
                onChange={(checked) =>
                  setFormData((prev) => ({ ...prev, agreed: checked }))
                }
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-hidden data-[checked]:bg-green-600"
              >
                <span className="sr-only">Accept privacy policy</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>

              <Label className="text-sm text-white">
                Agree to privacy policy.
              </Label>
            </Field>
            {errors.agreed && <p className="text-red-500">{errors.agreed}</p>}
          </div>

          {submissionStatus && (
            <p
              className={`mt-4 text-lg ${submissionStatus === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {submissionStatus === "success"
                ? "Thank you! Your message has been sent."
                : "Error submitting form. Please try again."}
            </p>
          )}
          <div className="mt-12">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-vertoLightBlue relative w-full text-center cursor-pointer uppercase px-6 py-3 text-white rounded-md shadow-md tracking-widest font-normal hover:bg-vertoLightGreen hover:text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </motion.button>
          </div>
        </form>
      </div>
    </Bounded>
  );
};

export default ContactForm;
