import { Bounded } from "@/components/Bounded";
import MapWithMarker from "@/components/ui/MapWithMarker";

const MapLocation = ({ slice }) => {
  const companyLogo = "/assets/pin.svg";
  return (
    <Bounded as="section" paddingAs="contentSection" size="widest">
      <MapWithMarker
        geoLocation={slice.primary.geolocation}
        companyLogo={companyLogo}
      />
    </Bounded>
  );
};

export default MapLocation;
