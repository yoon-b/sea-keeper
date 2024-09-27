import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import DataForm from "../../components/Manager/DataForm";

const position: LatLngTuple = [35.3249, 129.2849];

const Manager = () => {
  return (
    <>
      <div className="pt-4">
        <DataForm />
      </div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "80vw", height: "55vh" }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://stadiamaps.com">Stadia Maps</a>'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Manager;
