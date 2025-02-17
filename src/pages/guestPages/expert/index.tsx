import { useState } from "react";
import { Button } from "rizzui";
import Card from "../../../components/layout/ui/card";
import HeadingPrimary from "../../../components/layout/ui/heading-primary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiClient } from "../../../../api/api.config";
import { useQuery } from "@tanstack/react-query";
import { UserCard } from "../../../components/shared/Users/userProfileCard";
import { UserFilter } from "../../../components/shared/filter/userFilter";
//fetch new experts
async function fetchExperts() {
  const response = await apiClient.get("/expert/new");
  return response.data.data.experts; // Adjust based on your API response structure
}
//fetch filtered experts
//fetching filtered innovators
async function fetchFilteredExperts(country: string, experience: string) {
  const response = await apiClient.post("/expert/filter", {
    country: country || undefined,
    experience: experience || undefined,
  });
  console.log(response.data.data.innovators);
  return response.data.data.experts; // Adjust based on your API response structure
}
export default function ExpertPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedExperience, setselectedExperience] = useState("");
  function locationFilter(v: string) {
    setSelectedCountry(v);
  }
  function experienceFIlter(v: string) {
    setselectedExperience(v);
  }
  // Fetch innovators using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["innovators"], // Unique query key
    queryFn: fetchExperts, // Your API call function
  });
  const {
    data: filteredUsers,
    isLoading: filteredUserLoading,
    error: filteredUserError,
  } = useQuery({
    queryKey: ["filteredExperts", selectedCountry, selectedExperience], // Unique query key
    queryFn: () => fetchFilteredExperts(selectedCountry, selectedExperience), // Your API call function
  });
  const username = useSelector((state: any) => state.user.user?.username);
  const navigate = useNavigate();
  function buttonClickHandler(e: any) {
    if (!username) {
      navigate("/sign-up");
    } else {
      navigate("/registeration/expert");
    }
  }
  return (
    <>
      <Card styles="flex flex-col">
        <HeadingPrimary styles="text-center text-sm">
          Share your expertise,{" "}
          <span className="text-green-900 underline">collaborate</span> on
          innovative ideas, and help{" "}
          <span className="text-[#944500] underline">shape the future</span> of
          technology and industry.
        </HeadingPrimary>
        <Button
          variant="outline"
          className="self-center mt-6 px-12 py-6 text-xl"
          onClick={buttonClickHandler}
        >
          Join Experts Hub
        </Button>
        <div className="flex flex-col items-center mt-12 space-y-5">
          <h1 className="text-3xl font-bold text-primary">
            Newly Registered Innovators
          </h1>
          <h2 className="text-[#727077]">
            Meet our new Experts who are making significant contributions in
            their fields
          </h2>
          {/* Display new registered innovators */}
          <div className="flex flex-wrap gap-4">
            {isLoading ? (
              <h1>Loading...</h1> // Show loading state
            ) : error ? (
              <div>
                <h1 className="text-red-500">
                  {error instanceof Error ? error.message : "An error occurred"}
                </h1>
              </div> // Handle error state
            ) : data.length > 0 ? (
              data.map((user: any) => (
                <UserCard user={user} key={user.id} userType="Expert" />
              ))
            ) : (
              <div>
                <h1 className="text-[#727077]">No Innovator found</h1>
              </div> // Handle empty state
            )}
          </div>
        </div>
        <div>
          <UserFilter
            locationFIlter={locationFilter}
            userType="Expert"
            experienceFilter={experienceFIlter}
          />
          <div className="flex flex-wrap gap-4">
            {filteredUserLoading ? (
              <h1>Loading...</h1> // Show loading state
            ) : filteredUserError ? (
              <div>
                <h1 className="text-red-500">
                  {filteredUserError instanceof Error
                    ? filteredUserError.message
                    : "An error occurred"}
                </h1>
              </div> // Handle error state
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user: any) => (
                <UserCard user={user} key={user.id} userType="Expert" />
              ))
            ) : (
              <div>
                <h1 className="text-[#727077]">No Expert found</h1>
              </div> // Handle empty state
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
