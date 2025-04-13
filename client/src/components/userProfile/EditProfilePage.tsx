;

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Save,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserCity,
  setUserCountry,
  setUserEmail,
  setUserFullName,
  setUserGovId,
  setUserPhoneNumber,
  setUserProfileImage,
  setUserState,
  setUserUpiID,
  setUserZipCode,
  userStoreType,
} from "../../store/reducers/user.reducers";
import { RootState } from "../../store/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { uploadImage } from "../../service/photos/imageUpload";
import { deleteImage } from "../../service/photos/deleteUpload";
import { updateUserData } from "../../service/userdata/updateUserData";

// Define the form data type
type FormInputs = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  govId: string;
  upiId: string;
};

export default function EditProfilePage() {
  const {
    email,
    profileImage,
    fullName,
    phoneNumber,
    govId,
    country,
    state,
    street,
    city,
    zipCode,
    upiID
  }: userStoreType = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string>(
    profileImage || ""
  );
  const [isUploading, setIsUploading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [originalProfileImage, setOriginalProfileImage] = useState<string>(profileImage || "");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: fullName || "",
      email: email || "",
      phone: phoneNumber ? String(phoneNumber) : "",
      street: street || "",
      city: city || "",
      state: state || "",
      country: country || "",
      zipcode: zipCode || "",
      govId: govId ? String(govId) : "",
      upiId: upiID || "",
    },
  });

  // Set form values when user data changes
  useEffect(() => {
    setValue("name", fullName || "");
    setValue("email", email || "");
    setValue("phone", phoneNumber ? String(phoneNumber) : "");
    setValue("street", street || "");
    setValue("city", city || "");
    setValue("state", state || "");
    setValue("country", country || "");
    setValue("zipcode", zipCode || "");
    setValue("govId", govId ? String(govId) : "");
    setValue("upiId",upiID ? String(upiID):"")
  }, [
    fullName,
    email,
    phoneNumber,
    street,
    city,
    state,
    country,
    zipCode,
    govId,
    setValue,
    upiID
  ]);

  // Update originalProfileImage when profileImage changes
  useEffect(() => {
    setOriginalProfileImage(profileImage || "");
  }, [profileImage]);

  // Handle profile image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);

      try {
        if (profileImage) {
          const deleteResult = await deleteImage(profileImage);
          
          if (!deleteResult.success) {
            console.error("Failed to delete previous image:", deleteResult.error);
          }
        }

        // Upload the new image
        const result = await uploadImage(file);

        if (result.success) {
          setUploadedImage(result.imageUrl);
        } else {
          console.error("Failed to upload image:", result.error);
          alert("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error handling image:", error);
        alert("An error occurred during image processing. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setFormSubmitting(true);
    try {
      if (uploadedImage && originalProfileImage && uploadedImage !== originalProfileImage) {
        console.log("Deleting previous profile image:", originalProfileImage);
        const deleteResult = await deleteImage(originalProfileImage);
        
        if (!deleteResult.success) {
          console.error("Failed to delete previous profile image:", deleteResult.error);
        }
      }

      const formDataWithImage = {
        ...data,
        profileImage: uploadedImage || profileImage || "",
      };

      // Rename upiId to match what the API expects
      const formDataForApi = {
        ...formDataWithImage,
        upiID: formDataWithImage.upiId, // Add this mapping to ensure server gets the right field
      };

      const result = await updateUserData(formDataForApi);
      if (result.success) {
        dispatch(setUserFullName(formDataWithImage.name));
        dispatch(setUserEmail(formDataWithImage.email));
        dispatch(setUserPhoneNumber(formDataWithImage.phone));
        dispatch(setUserState(formDataWithImage.state));
        dispatch(setUserCity(formDataWithImage.city));
        dispatch(setUserState(formDataWithImage.state));
        dispatch(setUserCountry(formDataWithImage.country));
        dispatch(setUserZipCode(formDataWithImage.zipcode));
        dispatch(setUserGovId(formDataWithImage.govId));
        dispatch(setUserUpiID(formDataWithImage.upiId)); // Make sure we're using the correct field name
        dispatch(
          setUserProfileImage(uploadedImage || formDataWithImage.profileImage)
        );

        // Update the original image reference after successful update
        setOriginalProfileImage(uploadedImage || formDataWithImage.profileImage);
        
        alert("Profile updated successfully!");
        navigate("/profile");
      } else {
        alert(result.error || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/profile"
                className="text-gray-500 hover:text-gray-900 flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Profile
              </Link>
            </div>
            <h1 className="text-lg font-medium text-gray-900">Edit Profile</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Image */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">
                Profile Photo
              </h2>
            </div>

            <div className="p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow">
                  <img
                    src={uploadedImage || profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full text-white hover:bg-teal-700 transition-colors disabled:bg-gray-400"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  disabled={isUploading}
                />
              </div>

              <p className="text-sm text-gray-500">
                {isUploading
                  ? "Uploading image..."
                  : "Click the upload button to change your profile photo"}
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">
                Personal Information
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      className={`focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">Address</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="street"
                    {...register("street")}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="Street address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    {...register("city")}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    {...register("state")}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    {...register("country")}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="Country"
                  />
                </div>

                <div>
                  <label
                    htmlFor="zipcode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zipcode
                  </label>
                  <input
                    id="zipcode"
                    {...register("zipcode")}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="Zipcode"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Other Information */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">
                Other Information
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="govId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GOVID
                  </label>
                  <input
                    id="govId"
                    {...register("govId")}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="Government ID"
                  />
                </div>

                <div>
                  <label
                    htmlFor="upiId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    UPI ID
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="upiId"
                      {...register("upiId")}
                      className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                      placeholder="yourname@upi"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Link
              to="/profile"
              className="mr-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={formSubmitting || isUploading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400"
            >
              {formSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
