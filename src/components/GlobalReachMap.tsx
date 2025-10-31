import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// World map topology URL (free, no API key needed)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Example client locations - UPDATE THESE WITH YOUR ACTUAL CLIENT LOCATIONS
// Format: [longitude, latitude, city name]
const clientLocations = [
  // North America
  [-74.006, 40.7128, "New York, USA"],
  [-122.4194, 37.7749, "San Francisco, USA"],
  [-87.6298, 41.8781, "Chicago, USA"],
  [-79.3832, 43.6532, "Toronto, Canada"],
  
  // Europe
  [-0.1276, 51.5074, "London, UK"],
  [2.3522, 48.8566, "Paris, France"],
  [13.405, 52.52, "Berlin, Germany"],
  [4.9041, 52.3676, "Amsterdam, Netherlands"],
  
  // Asia
  [103.8198, 1.3521, "Singapore"],
  [139.6917, 35.6895, "Tokyo, Japan"],
  [121.5654, 25.033, "Taipei, Taiwan"],
  [77.209, 28.6139, "New Delhi, India"],
  
  // Australia
  [151.2093, -33.8688, "Sydney, Australia"],
  
  // South America
  [-46.6333, -23.5505, "São Paulo, Brazil"],
  [-70.6483, -33.4489, "Santiago, Chile"],
];

interface GlobalReachMapProps {
  locations?: Array<[number, number, string]>;
}

export const GlobalReachMap = ({ locations = clientLocations }: GlobalReachMapProps) => {
  return (
    <div className="w-full h-full">
      <ComposableMap
        projectionConfig={{
          scale: 147,
          center: [0, 20],
        }}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(210 100% 20%)"
                stroke="hsl(192 100% 44% / 0.3)"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "hsl(210 100% 18%)" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {locations.map(([longitude, latitude, city], index) => (
          <Marker key={index} coordinates={[longitude, latitude]}>
            <g>
              {/* Outer glow circle */}
              <circle
                r={8}
                fill="hsl(192 100% 44%)"
                opacity={0.3}
                className="animate-pulse"
              />
              {/* Main marker circle */}
              <circle r={4} fill="hsl(192 100% 44%)" className="glow-accent" />
              {/* Inner highlight */}
              <circle r={2} fill="hsl(192 100% 60%)" />
            </g>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};


