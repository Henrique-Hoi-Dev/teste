import React, { memo, useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoMercator } from "d3-geo";
import { IMapCard } from "@/endpoints/fetchWhoWeArePageData";

interface IMapChart {
  mapCards: IMapCard[];
}

const MapChart = ({ mapCards }: IMapChart) => {
  const notDisplayedCountries = ["ATA", "GRL"];
  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
  const mapProjection = geoMercator()
    .translate([800 / 2, 700 / 2])
    .rotate([-12, 0, 0])
    .scale(100);

  const [tooltipContent, setTooltipContent] = useState("false");

  const tooltipRectangleWidth = useMemo(() => {
    return 50 + tooltipContent.length * 2;
  }, [tooltipContent]);

  const tooltipTextPosition = useMemo(
    () => tooltipRectangleWidth - tooltipContent.length,
    [tooltipRectangleWidth, tooltipContent]
  );

  return (
    <>
      <ComposableMap
        projection={mapProjection as any}
        projectionConfig={{
          scale: 130,
        }}
        data-tip={""}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              if (!notDisplayedCountries.includes(geo.id)) {
                return (
                  <Geography
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    fill="#E1E1E1"
                    stroke="#fff"
                    key={geo.rsmKey}
                    geography={geo}
                  />
                );
              }
            })
          }
        </Geographies>

        {mapCards?.length &&
          mapCards.map(({ coordinates, title: name }) => {
            if (!coordinates) return <> </>;

            const { longitude, latitude } = coordinates;

            return (
              <>
                <Marker
                  id={name}
                  key={name}
                  onMouseEnter={() => setTooltipContent(name)}
                  onMouseLeave={() => setTooltipContent("")}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  coordinates={[longitude, latitude]}
                >
                  <>
                    {tooltipContent === name && (
                      <svg
                        width="200"
                        height="100"
                        fill="#495057"
                        x={-40}
                        y={-45}
                      >
                        <polygon
                          id="one"
                          points={"16,0 16,16 0,8"}
                          fill={"#495057"}
                          transform={"translate(42, 35)"}
                        />
                        <rect
                          x="52"
                          y="35"
                          rx="8"
                          ry="8"
                          width={tooltipRectangleWidth}
                          height="16"
                        />
                        <text
                          x={tooltipTextPosition}
                          y={46}
                          fontSize={8}
                          fill="white"
                        >
                          {tooltipContent}
                        </text>
                      </svg>
                    )}
                    <g
                      fill="transparent"
                      stroke="#f08202"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="translate(-12, -24)"
                    >
                      <circle cx="12" cy="21" r="2" fill="#f08202" />
                    </g>
                  </>
                </Marker>
              </>
            );
          })}
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
