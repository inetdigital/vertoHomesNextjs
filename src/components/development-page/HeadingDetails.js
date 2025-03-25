"use client";

import { useHubspotMainForm } from "@/context/HubspotMainFormContext";

import {
  MapPinIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import BlockButton from "@/components/ui/BlockButton";

export const HeadingDetails = ({ page }) => {
  const { openForm, setFormId } = useHubspotMainForm();

  const handleOpenForm = (formId) => {
    setFormId(formId); // Set dynamic form ID
    openForm(); // Open the modal
  };

  return (
    <section className="py-12 bg-vertoDarkGreen">
      <div className="max-w-6xl mx-auto px-6 xl:px-0">
        <div className="text-white py-8">
          <div className="flex flex-col lg:flex-row">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 w-full lg:w-2/3">
              <div className="grid grid-cols-[auto,1fr] gap-4">
                <div className="w-8">
                  <HomeIcon className="h-auto w-6 text-vertoLightGreen" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase">
                    Property Types
                  </h3>
                  <p className="text-base text-white">
                    {page.data.property_types}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[auto,1fr] gap-4">
                <div className="w-8">
                  <MapPinIcon className="h-6 w-6 text-vertoLightGreen" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase">Location</h3>
                  <p className="text-base text-white">
                    {page.data.location_town}, {page.data.location_city}, <br />
                    {page.data.location_postcode}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[auto,1fr] gap-4">
                <div className="w-8">
                  <Squares2X2Icon className="h-6 w-6 text-vertoLightGreen" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase">
                    Development Size
                  </h3>
                  <p className="text-base text-white">
                    {page.data.development_size}
                  </p>
                </div>
              </div>
              {page.data?.what_three_words && (
                <div className="grid grid-cols-[auto,1fr] gap-4">
                  <div className="w-8">
                    <span className="text-xl text-vertoLightGreen w-6">
                      {"///"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      What3Words
                    </h3>
                    <p className="text-base text-white">
                      {page.data.what_three_words}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-1/3 pl-0 lg:pl-12 mt-12 lg:mt-0">
              {page.data?.development_status?.uid === "coming_soon" && (
                <>
                  <BlockButton
                    label="Register your interest"
                    onClick={() =>
                      handleOpenForm(
                        page?.data?.form_id
                          ? page.data.form_id
                          : "aceed824-92de-40a5-9021-08953b22be3a"
                      )
                    }
                  />
                </>
              )}
              {page.data?.development_status?.uid === "available" && (
                <>
                  <BlockButton
                    label="Arrange a Viewing"
                    onClick={() =>
                      handleOpenForm(
                        page?.data?.form_id
                          ? page.data.form_id
                          : "aceed824-92de-40a5-9021-08953b22be3a"
                      )
                    }
                  />
                  {page.data?.brochure?.url && (
                    <a href={page.data?.brochure?.url} target="_blank">
                      <BlockButton label="Download Brochure" />
                    </a>
                  )}
                  {page.data?.site_plan?.url && (
                    <a href={page.data?.site_plan?.url} target="_blank">
                      <BlockButton label="Site Plan" />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
