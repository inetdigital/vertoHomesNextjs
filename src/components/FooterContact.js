"use client";

import { BlockButtonBlue } from "@/components/ui/BlockButonBlue";
import BlockButton from "@/components/ui/BlockButton";

import { useHubspotMainForm } from "@/context/HubspotMainFormContext";

export const FooterContact = ({
  page,
  themeColor,
  highlightColor,
  marginTop,
  property = false,
}) => {
  const { openForm, setFormId } = useHubspotMainForm();
  const handleOpenForm = (formId) => {
    setFormId(formId); // Set dynamic form ID
    openForm(); // Open the modal
  };
  return (
    <section
      className={`bg-${themeColor ? themeColor : "vertoDarkGreen"} text-white px-6 py-36 mt-${marginTop ? marginTop : "28"}`}
    >
      <div className="flex flex-col md:flex-row justify-between items-left md:items-center md:items-start max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="mb-8 md:mb-0">
          {page.data?.development_status?.uid === "available" ? (
            <h2 className="text-4xl">
              <span
                className={`text-${highlightColor ? highlightColor : "vertoLightGreen"}`}
              >
                CONTACT
              </span>{" "}
              US FOR <br /> MORE INFORMATION
            </h2>
          ) : (
            <h2 className="text-4xl">
              <span
                className={`text-${highlightColor ? highlightColor : "vertoLightGreen"}`}
              >
                CONTACT
              </span>{" "}
              US TO <br /> REGISTER INTEREST
            </h2>
          )}
          <div
            className={`h-1 w-16 bg-${highlightColor ? highlightColor : "vertoLightGreen"} mt-4`}
          ></div>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col space-y-4">
          {themeColor === "vertoDarkBlue" && (
            <FooterButtonsBlue
              handleOpenForm={handleOpenForm}
              page={page}
              property={property}
            />
          )}
          {themeColor === "vertoDarkGreen" && (
            <FooterButtonsStandard
              handleOpenForm={handleOpenForm}
              page={page}
              property={property}
            />
          )}
        </div>
      </div>
    </section>
  );
};

const FooterButtonsStandard = ({ handleOpenForm, page, property }) => {
  return (
    <>
      <BlockButton
        label={
          page.data?.development_status?.uid === "available"
            ? "Arrange a viewing"
            : "Register your interest"
        }
        onClick={() =>
          handleOpenForm(
            page?.data?.form_id
              ? page.data.form_id
              : "aceed824-92de-40a5-9021-08953b22be3a"
          )
        }
      />

      {property && page.data?.development?.data?.brochure?.url && (
        <a href={page.data?.development?.data?.brochure?.url} target="_blank">
          <BlockButton label="Download Brochure" />
        </a>
      )}

      {page.data?.brochure?.url && (
        <a href={page.data?.brochure?.url} target="_blank">
          <BlockButton label="Download Brochure" />
        </a>
      )}
    </>
  );
};

const FooterButtonsBlue = ({ handleOpenForm, page, property }) => {
  return (
    <>
      <BlockButtonBlue
        label={
          page.data?.development_status?.uid === "available"
            ? "Arrange a viewing"
            : "Register your interest"
        }
        onClick={() =>
          handleOpenForm(
            page?.data?.form_id
              ? page.data.form_id
              : "aceed824-92de-40a5-9021-08953b22be3a"
          )
        }
      />
      {property && page.data?.development?.data?.brochure?.url && (
        <a href={page.data?.development?.data?.brochure?.url} target="_blank">
          <BlockButtonBlue label="Download Brochure" />
        </a>
      )}
      {page.data?.brochure?.url && (
        <a href={page.data?.brochure?.url} target="_blank">
          <BlockButtonBlue label="Download Brochure" />
        </a>
      )}
    </>
  );
};
