"use client";
import { useState } from "react";
import { useChildren } from "@/app/hooks/children/useChildren";
import { useLocations } from "@/app/hooks/location/useLocations";
import { useAddLocation } from "@/app/hooks/location/useAddLocation";
import { useUpdateLocation } from "@/app/hooks/location/useUpdateLocation";
import { useDeleteLocation } from "@/app/hooks/location/useDeleteLocation";
import { useLiveLocation } from "@/app/hooks/location/useLiveLocation";
import { SafeZone, AddLocationPayload } from "@/app/types/api/location.types";
import ChildTabs from "@/app/components/dashboard/location/ChildTabs";
import LiveLocationCard from "@/app/components/dashboard/location/LiveLocationCard";
import SafeZoneList from "@/app/components/dashboard/location/SafeZoneList";
import LocationMap from "@/app/components/dashboard/location/LocationMap";
import SafeZoneModal from "@/app/components/dashboard/location/SafeZoneModal";

export default function LocationPage() {
  const { children, isLoading: childrenLoading } = useChildren();
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editZone, setEditZone] = useState<SafeZone | null>(null);

  const effectiveChildId = selectedChildId || children[0]?.id || "";

  const { locations, isLoading: locationsLoading, refetch } = useLocations(effectiveChildId);
  const { liveLocation, isConnected } = useLiveLocation(effectiveChildId);
  const { mutate: addLocation, isLoading: addLoading, error: addError } = useAddLocation();
  const { mutate: updateLocation, isLoading: updateLoading, error: updateError } = useUpdateLocation();
  const { mutate: deleteLocation } = useDeleteLocation();

  const handleAdd = () => {
    setEditZone(null);
    setModalOpen(true);
  };

  const handleEdit = (zone: SafeZone) => {
    setEditZone(zone);
    setModalOpen(true);
  };

  const handleDelete = async (locId: string) => {
    const ok = await deleteLocation(effectiveChildId, locId);
    if (ok) refetch();
  };

  const handleSubmit = async (data: AddLocationPayload) => {
    if (editZone) {
      const result = await updateLocation(effectiveChildId, editZone.id, data);
      if (result) {
        setModalOpen(false);
        refetch();
      }
    } else {
      const result = await addLocation(effectiveChildId, data);
      if (result) {
        setModalOpen(false);
        refetch();
      }
    }
  };

  if (childrenLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div
          className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "#1E73BE", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div className="py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Location</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your children and manage safe zones
        </p>
      </div>

      {/* Child Tabs */}
      <ChildTabs
        items={children}
        selectedId={effectiveChildId}
        onSelect={setSelectedChildId}
      />

      {/* Content */}
      {effectiveChildId ? (
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "300px 1fr" }}
        >
          {/* Left Panel */}
          <div className="flex flex-col gap-3">
            <LiveLocationCard
              liveLocation={liveLocation}
              isConnected={isConnected}
              safeZones={locations}
            />
            <SafeZoneList
              zones={locations}
              isLoading={locationsLoading}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Map */}
          <LocationMap
            safeZones={locations}
            liveLocation={liveLocation}
            isConnected={isConnected}
          />
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p>No children found. Add a child first.</p>
        </div>
      )}

      {/* Modal */}
      <SafeZoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={editZone ? updateLoading : addLoading}
        error={editZone ? updateError : addError}
        editZone={editZone}
      />
    </div>
  );
}