import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Award,
  MapPin,
  Globe,
  Clock,
} from "lucide-react";

import profiles from './2052.json';

const ProfileCard = ({ profile }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const importImage = () => {
      try {
        if (profile["Upload your most recent image"]) {
          const imagePath = `/images/${profile["Upload your most recent image"]}`;
          setImagePreview(imagePath);
        } else {
          setImagePreview(null);
        }
      } catch (error) {
        console.error("Image not found", error);
      setImagePreview(null);
    }
    };
  
    importImage();
  }, [profile]);

  const NameDisplay = () => {
    const nameParts = profile.Name.split(" ");
    return (
      <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x">
        {nameParts.map((part, index) => (
          <span key={index} className="inline-block mr-2 hover:scale-105 transition-transform">
            {part}
          </span>
        ))}
      </h2>
    );
  };

  const determineQualifications = () => {
    const mastersDiscipline = profile["Masters Description (Discipline, Institution)"];
    const phdDiscipline = profile["PHD Description (Discipline, Institution)"];
    const otherQualification = profile["Other Qualification Description (Discipline, Institution)"];
    const qualificationsValue = profile["Qualifications"];
  
    const qualifications = [];
  
    if (mastersDiscipline) {
      qualifications.push({
        type: "Masters",
        details: mastersDiscipline
      });
    }
  
    if (phdDiscipline) {
      qualifications.push({
        type: "PhD",
        details: phdDiscipline
      });
    }
  
    if (qualifications.length === 0) {
      if (otherQualification) {
        qualifications.push({
          type: "Other Qualification",
          details: otherQualification
        });
      } else if (qualificationsValue === "Masters") {
        qualifications.push({
          type: "Masters",
          details: "Masters"
        });
      } else {
        qualifications.push({
          type: "BE",
          details: "Pulchowk Campus"
        });
      }
    }
  
    return qualifications;
  };
  
  const qualification = determineQualifications();
  

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 p-1.5 rounded-xl shadow-xl transform transition-all hover:scale-[1.02] hover:shadow-2xl">
        <div className="w-full rounded-xl bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden grid grid-cols-2 gap-4">
          <div className={`relative ${profile.Name === "Thakur Gyawali" ? 'h-auto' : 'h-[500px]'}`}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center shadow-lg ring-2 ring-gray-200/50">
                <Camera className="text-white" size={28} />
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-white/90 py-2 text-center">
              <p className="text-base font-medium text-gray-800">{profile["Designation in the Organization"]}</p>
              <p className="text-sm text-gray-600">{profile["Working Organization"]}</p>
            </div>
          </div>
          <div ref={detailsRef} className="p-6 space-y-2 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              <NameDisplay />
            </h2>
            {/* Address section */}
            <h3 className="text-base font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-1 mt-4">
              <MapPin className="mr-2 text-blue-500" size={18} />
              Address
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-gray-200/50 hover:bg-blue-100/50 transition-all">
              <div className="space-y-2">
                {profile.Name === "Thakur Gyawali" ? (
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-blue-500" size={16} />
                    <p className="text-xs text-gray-700">
                      Current: {profile["Current Address"]} | Permanent: {profile["Permanent Address"]}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <MapPin className="mr-2 text-blue-500" size={16} />
                      <p className="text-xs text-gray-700">Current: {profile["Current Address"]}</p>
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-2 text-purple-500" size={16} />
                      <p className="text-xs text-gray-700">Permanent: {profile["Permanent Address"]}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Qualification Details */}
            <div>
            <h3 className="text-base font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-1">
              <Award className="mr-2 text-green-500" size={20} />
              Qualifications
            </h3>
            <div className="bg-green-50 p-3 rounded-lg shadow-sm border border-gray-200/50">
              {qualification.map((qual, index) => (
                <p key={index} className="text-xs">
                  <strong className="text-green-800">{qual.type}:</strong>{" "}
                  {qual.details}
                </p>
              ))}
            </div>
          </div>

            {/* Job Experience */}
            {profile["Job Experience"] && (
              <div>
                <h3 className="text-base font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-1">
                  <Clock className="mr-2 text-orange-500" size={18} />
                  Job Experience
                </h3>
                <div className="bg-orange-50 p-3 rounded-lg shadow-sm border border-gray-200/50">
                  <p className="text-xs text-gray-700">{profile["Job Experience"]}</p>
                </div>
              </div>
            )}

            {/* Other Details */}
            {profile["Other Details (If Any)"] && (
              <div>
                <h3 className="text-base font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-1">
                  <Globe className="mr-2 text-pink-500" size={20} />
                  Other Details
                </h3>
                <div className="bg-pink-50 p-3 rounded-lg shadow-sm border border-gray-200/50">
                  <p className="text-xs text-gray-700">{profile["Other Details (If Any)"]}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileDirectory = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleNext = () => {
    setCurrentProfileIndex((prevIndex) =>
      (prevIndex + 1) % profiles.length
    );
  };

  const handlePrevious = () => {
    setCurrentProfileIndex((prevIndex) =>
      prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
      <div className="absolute bottom-4 left-4 text-gray-600 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
        Roll No: {profiles[currentProfileIndex]["Roll No"]}
      </div>
      <div className="absolute bottom-4 right-4 text-gray-600 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
        {currentProfileIndex + 1} / {profiles.length}
      </div>
      <div className="flex items-center justify-center w-full max-w-6xl mx-auto px-4">
        <ProfileCard profile={profiles[currentProfileIndex]} />
      </div>
    </div>
  );
};


const App = () => {
  return <ProfileDirectory />;
};

export default App;