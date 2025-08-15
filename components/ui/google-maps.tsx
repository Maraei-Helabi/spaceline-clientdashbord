import React, { useCallback, useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  MapMouseEvent,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { cn } from "@/lib/utils";

type GoogleMapsProps = {
  className?: string;
  lat?: number;
  lng?: number;
  onChange: (lat: number, lng: number) => void;
};

const INITIAL_CAMERA = {
  center: { lat: 40.7, lng: -74 },
  zoom: 12,
};

export const GoogleMaps = (props: GoogleMapsProps) => {
  const { className, lat, lng } = props;
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setCameraProps(ev.detail),
    []
  );

  const handleClick = (event: MapMouseEvent) => {
    const latLng = event.detail.latLng;
    if (latLng) {
      props.onChange(latLng.lat, latLng.lng);
    }
  };

  const onMarkerDrag = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;
    if (latLng) {
      props.onChange(latLng.lat(), latLng.lng());
    }
  };

  useEffect(() => {
    if (lat && lng) {
      setCameraProps((prev) => ({
        ...prev,
        center: { lat, lng },
      }));
    }
  }, [lat, lng]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
      <Map
        className={cn("w-full h-[200px]", className)}
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        {...cameraProps}
        onCameraChanged={handleCameraChange}
        onClick={handleClick}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
      >
        <AdvancedMarker
          onDragEnd={onMarkerDrag}
          draggable
          position={{ lat: lat ?? NaN, lng: lng ?? NaN }}
        />
      </Map>
    </APIProvider>
  );
};
