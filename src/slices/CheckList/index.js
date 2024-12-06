import { Bounded } from "@/components/Bounded";

const CheckList = ({ slice }) => {
  const features = [
    "Zero Carbon Smart Home, designed and built for maximum efficiency",
    "Pay ZERO energy bills, guaranteed for at least 5 years",
    "Integrated solar roof and 13.5kw battery storage system",
    "Vaillant Air Source Heat Pump with zonal underfloor heating throughout",
    "Zehnder Mechanical Ventilation with Heat Recovery system",
    "Triple glazed argon-filled windows and doors",
    "Fully integrated Smart Home system with dimmable Phos LED lighting",
    "Nobilia kitchen with Siemens appliances",
    "Duravit sanitary-ware and Vado brassware to bathrooms",
    "Engineered oak flooring to living areas as standard",
  ];
  return (
    <Bounded as="section" paddingAs="contentSection" size="widest">
      <h2 className="text-4xl font-semibold text-vertoLightBlue uppercase mb-14 tracking-widest">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-11">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <span className="flex-shrink-0 text-vertoLightBlue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <p className="text-vertoDarkBlue text-base">{feature}</p>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default CheckList;
