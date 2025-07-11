import React, { useState, useRef, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { Icon } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const BloodDonorsList = () => {
  const [selectedView, setSelectedView] = useState<'default' | 'satellite' | 'driving' | 'transit' | 'explore'>('default');
  const [showDirections, setShowDirections] = useState(false);
const [selectedDonor, setSelectedDonor] = useState<BloodDonor | null>(null);
const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
const [directions, setDirections] = useState<{ distance: string; duration: string; steps: string[] } | null>(null);

const MapControls = () => {
  const handleViewChange = (view: typeof selectedView) => {
    setSelectedView(view);
  };

  const handleDirections = (donor: BloodDonor) => {
    setSelectedDonor(donor);
    setShowDirections(true);
    if (userLocation) {
      // Calculate directions (simplified for demo)
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        donor.latitude,
        donor.longitude
      );
      const duration = Math.round(distance * 2); // Rough estimate: 2 minutes per km
      setDirections({
        distance: `${distance.toFixed(1)} km`,
        duration: `${duration} mins`,
        steps: [
          'Start from your current location',
          'Head north on Main Street',
          'Turn right onto Hospital Road',
          `Arrive at ${donor.name}'s location`
        ]
      });
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-2">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleViewChange('default')}
          className={`px-3 py-1 rounded ${
            selectedView === 'default' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          Default
        </button>
        <button
          onClick={() => handleViewChange('satellite')}
          className={`px-3 py-1 rounded ${
            selectedView === 'satellite' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => handleViewChange('driving')}
          className={`px-3 py-1 rounded ${
            selectedView === 'driving' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          Driving
        </button>
        <button
          onClick={() => handleViewChange('transit')}
          className={`px-3 py-1 rounded ${
            selectedView === 'transit' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          Transit
        </button>
        <button
          onClick={() => handleViewChange('explore')}
          className={`px-3 py-1 rounded ${
            selectedView === 'explore' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

const DirectionsPanel = () => {
  if (!showDirections || !selectedDonor || !directions) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Directions to {selectedDonor.name}</h3>
        <button
          onClick={() => setShowDirections(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">Distance</p>
          <p className="font-semibold">{directions.distance}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">Duration</p>
          <p className="font-semibold">{directions.duration}</p>
        </div>
      </div>
      <div className="space-y-2">
        {directions.steps.map((step, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
              {index + 1}
            </div>
            <p className="text-sm">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = L.map(mapRef.current).setView([51.505, -0.09], 13);
    
    // Add different tile layers based on selected view
    const tileLayers = {
      default: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
      }),
      driving: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }),
      transit: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }),
      explore: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      })
    };

    tileLayers[selectedView].addTo(mapInstance);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [selectedView]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    const newMarkers: L.Marker[] = [];

    // Add donor markers
    donors.forEach(donor => {
      const marker = L.marker([donor.latitude, donor.longitude])
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${donor.name}</h3>
            <p>${donor.bloodType}</p>
            <p>${donor.location}</p>
            <button 
              class="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onclick="window.handleDirections(${JSON.stringify(donor)})"
            >
              Get Directions
            </button>
          </div>
        `)
        .addTo(map);
      newMarkers.push(marker);
    });

    // Add user location marker if available
    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: L.divIcon({
          className: 'user-location-marker',
          html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>'
        })
      }).addTo(map);
      newMarkers.push(userMarker);
    }

    setMarkers(newMarkers);
  }, [map, donors, userLocation]);

  return (
    <div ref={mapRef} className="h-[600px] w-full rounded-lg shadow-lg" />
  );
};

const BloodDonorsList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('');
  const [filteredDonors, setFilteredDonors] = useState<BloodDonor[]>([]);

  const handleEditDonor = (donor: BloodDonor) => {
    // Implementation of handleEditDonor
  };

  const handleDeleteDonor = (id: string) => {
    // Implementation of handleDeleteDonor
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Blood Donors</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Donor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Search donors..."
                className="flex-1 px-4 py-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="px-4 py-2 border rounded-lg"
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
              >
                <option value="">All Blood Types</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <MapView />
            <MapControls />
            <DirectionsPanel />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Donor List</h2>
          <div className="space-y-4">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEditDonor(donor)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{donor.name}</h3>
                    <p className="text-sm text-gray-600">{donor.bloodType}</p>
                    <p className="text-sm text-gray-600">{donor.location}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDonor(donor.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {/* ... existing modal code ... */}
    </div>
  );
}

export default BloodDonorsList;