import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import MapWithMarker from "@/components/ui/MapWithMarker";

const CompanyContactDetails = ({ slice }) => {
  const companyLogo = "/assets/pin.svg";
  return (
    <Bounded as="section" size="widest" paddingAs="contentSection">
      <div className="space-y-16 divide-y divide-gray-100">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:col-span-2 lg:gap-8">
          <div className="rounded-2xl bg-gray-50 p-10">
            <h3 className="text-2xl font-semibold text-vertoDarkBlue uppercase font-heading">
              Contact Details
            </h3>
            <hr className="h-[2px] bg-gary-500 w-full my-4" />
            <dl className="mt-3 space-y-4 text-vertoBlack">
              <div>
                <a
                  href={`mailto:${slice.primary.email_address}`}
                  className="text-vertoLightBlue"
                >
                  {slice.primary.email_address}
                </a>
              </div>
              <div className="mt-1">
                <p>{slice.primary.telephone_number}</p>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl bg-gray-50 p-10">
            <h3 className="text-2xl font-semibold text-vertoDarkBlue uppercase font-heading">
              Office Address
            </h3>
            <hr className="h-[2px] bg-gary-500 w-full my-4" />
            <dl className="mt-3 space-y-4 text-sm/6 text-vertoBlack">
              <div className="mb-4">
                <PrismicRichText field={slice.primary.office_address} />
              </div>
              <div className="mt-4">
                <PrismicRichText field={slice.primary.office_hours} />
              </div>
            </dl>
          </div>
          <div className="rounded-2xl bg-gray-50">
            <MapWithMarker
              geoLocation={slice.primary.office_location}
              companyLogo={companyLogo}
            />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default CompanyContactDetails;
