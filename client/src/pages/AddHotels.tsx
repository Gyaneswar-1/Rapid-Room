import type React from "react";
import { addHotelService } from "../service/addhotel/addHotelService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImage as uploadImageService } from "../service/photos/imageUpload";
import {
  FaWifi,
  FaTv,
  FaHome,
  FaDesktop,
  FaBuilding,
  FaFlask,
  FaFire,
  FaArchive,
  FaShieldAlt,
  FaSwimmingPool,
  FaHotTub,
  FaUmbrellaBeach,
  FaSnowflake,
  FaParking,
  FaUtensils,
  FaWheelchair,
  FaMapMarkerAlt,
  FaCloudUploadAlt,
  FaBed,
  FaUsers,
  FaBath,
  FaDollarSign,
  FaTag,
  FaAlignLeft,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define form field types with boolean amenities
type FormFields = {
  hotelName: string;
  description: string;
  price: string;
  roomNumber: string;
  guests: number;
  beds: number;
  bathrooms: number;
  // Amenities as boolean properties
  hasWifi: boolean;
  hasTV: boolean;
  hasKitchen: boolean;
  hasBalcony: boolean;
  hasWorkspace: boolean;
  hasWashingMachine: boolean;
  hasGarden: boolean;
  hasParking: boolean;
  hasAirConditioning: boolean;
  hasDiningArea: boolean;
  hasPool: boolean;
  hasHotTub: boolean;
  hasFirepit: boolean;
  hasBBQGrill: boolean;
  hasPoolTable: boolean;
  hasExerciseEquipment: boolean;
  hasOutdoorShower: boolean;
  hasSmokeAlarm: boolean;
  hasFirstAidKit: boolean;
  hasFireExtinguisher: boolean;
  hasAccessibility: boolean;
  country: string;
  state: string;
  city: string;
  street: string;
  zipcode: string;
  numberOfRooms: number;
  type: string;
  latitude: string;
  longitude: string;
  images: string[];
};

interface AmenityItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  category: string;
  formKey: keyof FormFields; // Add formKey to map to form field
}

const allAmenities: AmenityItem[] = [
  { icon: FaWifi, name: "Wifi", category: "basic", formKey: "hasWifi" },
  { icon: FaTv, name: "TV", category: "basic", formKey: "hasTV" },
  { icon: FaHome, name: "Kitchen", category: "basic", formKey: "hasKitchen" },
  {
    icon: FaBuilding,
    name: "Balcony",
    category: "basic",
    formKey: "hasBalcony",
  },
  {
    icon: FaDesktop,
    name: "WorkSpace",
    category: "basic",
    formKey: "hasWorkspace",
  },
  {
    icon: FaArchive,
    name: "Washing Machine",
    category: "basic",
    formKey: "hasWashingMachine",
  },
  { icon: FaFlask, name: "Garden", category: "basic", formKey: "hasGarden" },
  {
    icon: FaParking,
    name: "Parking",
    category: "basic",
    formKey: "hasParking",
  },
  {
    icon: FaSnowflake,
    name: "Air Conditioning",
    category: "basic",
    formKey: "hasAirConditioning",
  },
  {
    icon: FaUtensils,
    name: "Dining Area",
    category: "basic",
    formKey: "hasDiningArea",
  },

  {
    icon: FaSwimmingPool,
    name: "Pool",
    category: "standout",
    formKey: "hasPool",
  },
  {
    icon: FaHotTub,
    name: "Hot tub",
    category: "standout",
    formKey: "hasHotTub",
  },
  {
    icon: FaFire,
    name: "Firepit",
    category: "standout",
    formKey: "hasFirepit",
  },
  {
    icon: FaArchive,
    name: "BBQ grill",
    category: "standout",
    formKey: "hasBBQGrill",
  },
  {
    icon: FaArchive,
    name: "Pool table",
    category: "standout",
    formKey: "hasPoolTable",
  },
  {
    icon: FaArchive,
    name: "Exercise equipment",
    category: "standout",
    formKey: "hasExerciseEquipment",
  },
  {
    icon: FaUmbrellaBeach,
    name: "Outdoor shower",
    category: "standout",
    formKey: "hasOutdoorShower",
  },

  {
    icon: FaShieldAlt,
    name: "Smoke alarm",
    category: "safety",
    formKey: "hasSmokeAlarm",
  },
  {
    icon: FaShieldAlt,
    name: "First aid Kit",
    category: "safety",
    formKey: "hasFirstAidKit",
  },
  {
    icon: FaShieldAlt,
    name: "Fire extinguisher",
    category: "safety",
    formKey: "hasFireExtinguisher",
  },
  {
    icon: FaWheelchair,
    name: "Accessibility features",
    category: "safety",
    formKey: "hasAccessibility",
  },
];

const hotelTypes = [
  { value: "CITY", label: "city" },
  { value: "MOUNTAIN", label: "mountain" },
  { value: "RESORT", label: "resort" },
  { value: "LUXURY", label: "luxury" },
  { value: "AMAZING_VIEWS", label: "amazing views" },
  { value: "FARMS", label: "farms" },
  { value: "HISTORICAL_HOMES", label: "historical homes" },
  { value: "BEACHFRONT", label: "beachfront" },
  { value: "LAKEFRONT", label: "lakefront" },
  { value: "CASTLES", label: "castles" },
  { value: "CAMPING", label: "camping" },
  { value: "TROPICAL", label: "tropical" },
  { value: "ARCTIC", label: "arctic" },
  { value: "ISLANDS", label: "islands" },
  { value: "COUNTRYSIDE", label: "countryside" },
];

const AddHotelForm = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("basic");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      // Basic info
      hotelName: "",
      description: "",
      price: "",
      roomNumber: "",
      guests: 1,
      beds: 1,
      bathrooms: 1,

      // Initialize all amenities as false
      hasWifi: false,
      hasTV: false,
      hasKitchen: false,
      hasBalcony: false,
      hasWorkspace: false,
      hasWashingMachine: false,
      hasGarden: false,
      hasParking: false,
      hasAirConditioning: false,
      hasDiningArea: false,
      hasPool: false,
      hasHotTub: false,
      hasFirepit: false,
      hasBBQGrill: false,
      hasPoolTable: false,
      hasExerciseEquipment: false,
      hasOutdoorShower: false,
      hasSmokeAlarm: false,
      hasFirstAidKit: false,
      hasFireExtinguisher: false,
      hasAccessibility: false,

      // Location
      country: "",
      state: "",
      city: "",
      street: "",
      zipcode: "",
      numberOfRooms: 1,
      type: "",
      latitude: "",
      longitude: "",
      images: [],
    },
  });

  // Handle amenity selection
  const handleAmenitySelection = (formKey: keyof FormFields) => {
    const currentValue = watch(formKey) as boolean;
    setValue(formKey, !currentValue, { shouldValidate: true });
  };

  // Handle image upload with the real service
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if adding new images would exceed the 5 image limit
      if (images.length + e.target.files.length > 5) {
        setUploadError("Maximum 5 images allowed");
        return;
      }

      setUploading(true);
      setUploadError(null);

      try {
        const files = Array.from(e.target.files);
        const uploadedUrls: string[] = [];

        for (const file of files) {
          const response = await uploadImageService(file);

          if (response.success && response.imageUrl) {
            uploadedUrls.push(response.imageUrl);
          } else {
            throw new Error(response.error || "Failed to upload image");
          }
        }

        // Update state with new image URLs
        setImages((prev) => [...prev, ...uploadedUrls]);
        setValue("images", [...images, ...uploadedUrls], {
          shouldValidate: true,
        });
      } catch (error) {
        console.error("Error uploading images:", error);
        setUploadError(
          error instanceof Error ? error.message : "Failed to upload images"
        );
      } finally {
        setUploading(false);
      }
    }
  };

  // Remove all images
  const removeAllImages = () => {
    setImages([]);
    setValue("images", []);
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("latitude", position.coords.latitude.toFixed(6));
          setValue("longitude", position.coords.longitude.toFixed(6));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  // Function to validate section before moving to next
  const validateSection = async (
    currentSection: string,
    nextSection: string
  ) => {
    let fieldsToValidate: (keyof FormFields)[] = [];

    // Define which fields to validate for each section
    switch (currentSection) {
      case "basic":
        fieldsToValidate = ["hotelName", "description", "price", "roomNumber"];
        break;
      case "amenities":
        // At least one amenity should be selected
        const hasAnyAmenity = allAmenities.some(
          (amenity) => watch(amenity.formKey) === true
        );
        if (!hasAnyAmenity) {
          alert("Please select at least one amenity");
          return false;
        }
        return true;
      case "location":
        fieldsToValidate = [
          "country",
          "state",
          "city",
          "street",
          "zipcode",
          "numberOfRooms",
          "type",
          "latitude", // Add latitude validation
          "longitude", // Add longitude validation
        ];
        break;
      case "photos":
        // Check if exactly 5 images are uploaded
        if (images.length < 5) {
          alert("Please upload exactly 5 images");
          return false;
        }
        return true;
    }

    // Trigger validation for the specified fields
    const result = await trigger(fieldsToValidate);
    return result;
  };

  // Function to handle section navigation
  const nextSection = async (current: string, next: string) => {
    const isValid = await validateSection(current, next);

    if (isValid) {
      setActiveSection(next);
      window.scrollTo(0, 0); // Scroll to top
    } else {
      // Find the first error and focus on it
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        (firstErrorField as HTMLElement).focus();
      }
    }
  };

  const onSubmit = async (data: FormFields) => {
    try {
      const mappedData = {
        ...data,
        numberOfGuests: data.guests,
        numberOfBeds: data.beds,
        numberOfBathrooms: data.bathrooms,
        hasWorkSpace: data.hasWorkspace,
        perNight: parseFloat(data.price),
        guestAllowed: data.guests,
        roomType: data.type,
        hasTv: data.hasTV, // Fix casing to match backend
      };

      const response = await addHotelService(mappedData);

      if (response.success) {
        toast.success(response.message || "Hotel added successfully!");
        navigate("/dashboard/hotels");
      } else {
        toast.error(response.message || "Failed to add hotel");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Error submitting hotel:", error);
    }
  };

  // Filter amenities by category
  const basicAmenities = allAmenities.filter(
    (item) => item.category === "basic"
  );
  const standoutAmenities = allAmenities.filter(
    (item) => item.category === "standout"
  );
  const safetyItems = allAmenities.filter((item) => item.category === "safety");

  // Watch form values
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  // Count selected amenities
  const selectedAmenitiesCount = allAmenities.filter(
    (amenity) => watch(amenity.formKey) === true
  ).length;

  return (
    <>
      <Navbar show={false} />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 pt-22">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8 sm:px-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Add New Hotel
              </h1>
              <p className="text-white mt-2 opacity-90">
                Fill out the form below to list your hotel on our platform
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-6 py-8 sm:px-10"
            >
              {/* Basic Information Section */}
              <div className={activeSection === "basic" ? "block" : "hidden"}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Basic Information
                </h2>
                {Object.keys(errors).some((key) =>
                  [
                    "hotelName",
                    "description",
                    "price",
                    "roomNumber",
                    "guests",
                    "beds",
                    "bathrooms",
                  ].includes(key)
                ) && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 font-medium">
                      Please fix the following errors:
                    </p>
                    <ul className="mt-2 list-disc list-inside text-sm text-red-600">
                      {errors.hotelName && <li>{errors.hotelName.message}</li>}
                      {errors.description && (
                        <li>{errors.description.message}</li>
                      )}
                      {errors.price && <li>{errors.price.message}</li>}
                      {errors.roomNumber && (
                        <li>{errors.roomNumber.message}</li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Hotel Title */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaTag className="text-teal-600" />
                      Hotel Title
                    </label>
                    <input
                      {...register("hotelName", {
                        required: "Hotel hotelName is required",
                      })}
                      type="text"
                      placeholder="e.g. Luxury Ocean View Resort"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    />
                    {errors.hotelName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.hotelName.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaAlignLeft className="text-teal-600" />
                      Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 50,
                          message:
                            "Description should be at least 50 characters",
                        },
                      })}
                      rows={4}
                      placeholder="Describe your hotel, its unique features, and what guests can expect..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    ></textarea>
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Price per Night */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaDollarSign className="text-teal-600" />
                      Price per Night
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        {...register("price", {
                          required: "Price is required",
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Please enter a valid price",
                          },
                        })}
                        type="text"
                        placeholder="e.g. 120.00"
                        className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  {/* Room Number */}
                  {/* <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaBuilding className="text-teal-600" />
                      Room Number
                    </label>
                    <input
                      {...register("roomNumber", {
                        required: "Room number is required",
                      })}
                      type="text"
                      placeholder="e.g. 101"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    />
                    {errors.roomNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.roomNumber.message}
                      </p>
                    )}
                  </div> */}

                  {/* Guests */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaUsers className="text-teal-600" />
                      Max Guests
                    </label>
                    <select
                      {...register("guests", {
                        required: "Number of guests is required",
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Beds */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaBed className="text-teal-600" />
                      Beds
                    </label>
                    <select
                      {...register("beds", {
                        required: "Number of beds is required",
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Bed" : "Beds"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaBath className="text-teal-600" />
                      Bathrooms
                    </label>
                    <select
                      {...register("bathrooms", {
                        required: "Number of bathrooms is required",
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Bathroom" : "Bathrooms"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={() => nextSection("basic", "amenities")}
                    className="px-6 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Next: Amenities
                  </button>
                </div>
              </div>

              {/* Amenities Section */}
              <div
                className={activeSection === "amenities" ? "block" : "hidden"}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Amenities
                </h2>
                <p className="text-gray-600 mb-6">
                  Select all the amenities that your hotel provides. The more
                  amenities you offer, the more attractive your listing will be.
                </p>

                {/* Basic Amenities */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <FaHome className="w-4 h-4 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Basic amenities
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {basicAmenities.map((amenity, index) => {
                      const Icon = amenity.icon;
                      const isSelected = watch(amenity.formKey) === true;

                      return (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "border-teal-600 bg-teal-50 shadow-sm"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            handleAmenitySelection(amenity.formKey)
                          }
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                          <Icon
                            className={`w-8 h-8 mb-2 ${
                              isSelected ? "text-teal-600" : "text-gray-600"
                            }`}
                          />
                          <p
                            className={`text-sm text-center ${
                              isSelected
                                ? "font-medium text-teal-700"
                                : "text-gray-700"
                            }`}
                          >
                            {amenity.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Standout Amenities */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <FaSwimmingPool className="w-4 h-4 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Standout amenities
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {standoutAmenities.map((amenity, index) => {
                      const Icon = amenity.icon;
                      const isSelected = watch(amenity.formKey) === true;

                      return (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "border-teal-600 bg-teal-50 shadow-sm"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            handleAmenitySelection(amenity.formKey)
                          }
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                          <Icon
                            className={`w-8 h-8 mb-2 ${
                              isSelected ? "text-teal-600" : "text-gray-600"
                            }`}
                          />
                          <p
                            className={`text-sm text-center ${
                              isSelected
                                ? "font-medium text-teal-700"
                                : "text-gray-700"
                            }`}
                          >
                            {amenity.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Safety Items */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <FaShieldAlt className="w-4 h-4 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Safety items
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {safetyItems.map((amenity, index) => {
                      const Icon = amenity.icon;
                      const isSelected = watch(amenity.formKey) === true;

                      return (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "border-teal-600 bg-teal-50 shadow-sm"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            handleAmenitySelection(amenity.formKey)
                          }
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                          <Icon
                            className={`w-8 h-8 mb-2 ${
                              isSelected ? "text-teal-600" : "text-gray-600"
                            }`}
                          />
                          <p
                            className={`text-sm text-center ${
                              isSelected
                                ? "font-medium text-teal-700"
                                : "text-gray-700"
                            }`}
                          >
                            {amenity.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected amenities summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Selected Amenities ({selectedAmenitiesCount})
                  </h3>
                  {selectedAmenitiesCount > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {allAmenities
                        .filter((amenity) => watch(amenity.formKey) === true)
                        .map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-700"
                          >
                            {item.name}
                            <button
                              type="button"
                              className="ml-1.5 text-teal-600 hover:text-teal-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAmenitySelection(item.formKey);
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No amenities selected yet. Select at least one amenity.
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setActiveSection("basic")}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => nextSection("amenities", "location")}
                    className="px-6 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Next: Location
                  </button>
                </div>
              </div>

              {/* Location Section */}
              <div
                className={activeSection === "location" ? "block" : "hidden"}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Location Information
                </h2>
                {Object.keys(errors).some((key) =>
                  [
                    "country",
                    "state",
                    "city",
                    "street",
                    "zipcode",
                    "numberOfRooms",
                    "type",
                  ].includes(key)
                ) && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 font-medium">
                      Please fix the following errors:
                    </p>
                    <ul className="mt-2 list-disc list-inside text-sm text-red-600">
                      {errors.country && <li>{errors.country.message}</li>}
                      {errors.state && <li>{errors.state.message}</li>}
                      {errors.city && <li>{errors.city.message}</li>}
                      {errors.street && <li>{errors.street.message}</li>}
                      {errors.zipcode && <li>{errors.zipcode.message}</li>}
                      {errors.numberOfRooms && (
                        <li>{errors.numberOfRooms.message}</li>
                      )}
                      {errors.type && <li>{errors.type.message}</li>}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Country */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaMapMarkerAlt className="text-teal-600" />
                      Country
                    </label>
                    <input
                      {...register("country", {
                        required: "Country is required",
                      })}
                      type="text"
                      placeholder="e.g. Japan"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaBuilding className="text-teal-600" />
                      State/Province
                    </label>
                    <input
                      {...register("state", { required: "State is required" })}
                      type="text"
                      placeholder="e.g. Odisha"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaHome className="text-teal-600" />
                      City
                    </label>
                    <input
                      {...register("city", { required: "City is required" })}
                      type="text"
                      placeholder="e.g. Cuttack"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  {/* Street */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaBuilding className="text-teal-600" />
                      Street
                    </label>
                    <input
                      {...register("street", {
                        required: "Street is required",
                      })}
                      type="text"
                      placeholder="e.g. nh45"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    />
                    {errors.street && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.street.message}
                      </p>
                    )}
                  </div>

                  {/* Zipcode */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaBuilding className="text-teal-600" />
                      Zipcode
                    </label>
                    <input
                      {...register("zipcode", {
                        required: "Zipcode is required",
                      })}
                      type="text"
                      placeholder="e.g. 755049"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    />
                    {errors.zipcode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.zipcode.message}
                      </p>
                    )}
                  </div>

                  {/* Number of Rooms */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaBuilding className="text-teal-600" />
                      Number of Rooms
                    </label>
                    <input
                      {...register("numberOfRooms", {
                        required: "Number of rooms is required",
                        min: { value: 1, message: "Must have at least 1 room" },
                      })}
                      type="number"
                      placeholder="e.g. 10"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-600"
                    />
                    {errors.numberOfRooms && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.numberOfRooms.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hotel Type */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Hotel Type
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {hotelTypes.map((type) => (
                      <label key={type.value} className="relative">
                        <input
                          type="radio"
                          {...register("type", {
                            required: "Hotel type is required",
                          })}
                          value={type.value}
                          className="peer sr-only"
                        />
                        <div className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 peer-checked:border-teal-600 peer-checked:bg-teal-50 transition-colors cursor-pointer">
                          <span className="font-medium peer-checked:text-teal-700 capitalize">
                            {type.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                {/* Location Coordinates */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Coordinates
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Click the button below to automatically get your current
                    location coordinates.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Latitude
                      </label>
                      <input
                        {...register("latitude", {
                          required: "Latitude is required",
                          validate: {
                            isNumber: (value) =>
                              !isNaN(Number(value)) || "Must be a valid number",
                            inRange: (value) =>
                              (Number(value) >= -90 && Number(value) <= 90) ||
                              "Latitude must be between -90 and 90",
                          },
                        })}
                        type="number"
                        step="any"
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                      {errors.latitude && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.latitude.message}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Longitude
                      </label>
                      <input
                        {...register("longitude", {
                          required: "Longitude is required",
                          validate: {
                            isNumber: (value) =>
                              !isNaN(Number(value)) || "Must be a valid number",
                            inRange: (value) =>
                              (Number(value) >= -180 && Number(value) <= 180) ||
                              "Longitude must be between -180 and 180",
                          },
                        })}
                        type="number"
                        step="any"
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                      />
                      {errors.longitude && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.longitude.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    Get Current Location
                  </button>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setActiveSection("amenities")}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => nextSection("location", "photos")}
                    className="px-6 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Next: Photos
                  </button>
                </div>
              </div>

              {/* Photos Section */}
              <div className={activeSection === "photos" ? "block" : "hidden"}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Hotel Photos
                </h2>
                {errors.images && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 font-medium">
                      Please fix the following errors:
                    </p>
                    <ul className="mt-2 list-disc list-inside text-sm text-red-600">
                      <li>{errors.images.message}</li>
                    </ul>
                  </div>
                )}
                {uploadError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{uploadError}</p>
                  </div>
                )}
                <p className="text-gray-600 mb-6">
                  Upload high-quality images of your hotel. Images will be
                  uploaded immediately.
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="images"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    {uploading ? (
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mb-2"></div>
                    ) : (
                      <FaCloudUploadAlt className="w-12 h-12 text-teal-600 mb-2" />
                    )}
                    <span className="text-lg font-medium text-gray-900">
                      {uploading ? "Uploading..." : "Click to upload images"}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      or drag and drop
                    </span>
                    <span className="text-xs text-gray-400 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                </div>

                {/* Image previews */}
                {images.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-900">
                        Uploaded Images ({images.length})
                      </h3>
                      {images.length > 0 && (
                        <button
                          type="button"
                          onClick={removeAllImages}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove All
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.map((url, index) => (
                        <div
                          key={index}
                          className="rounded-lg overflow-hidden shadow-sm border border-gray-200 h-24"
                        >
                          {/* Use a direct img tag with explicit width and height */}
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Hotel image ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.currentTarget.src =
                                "/placeholder.svg?height=100&width=150";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {errors.images && (
                  <p className="mt-4 text-sm text-red-600">
                    {errors.images.message}
                  </p>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setActiveSection("location")}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Hotel"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHotelForm;
