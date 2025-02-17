import { useState } from "react";
import { Button } from "rizzui";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/layout/ui/card";
import HeadingPrimary from "../../../components/layout/ui/heading-primary";
import { UserCard } from "../../../components/shared/Users/userProfileCard";
import { apiClient } from "../../../../api/api.config";
import { useQuery } from "@tanstack/react-query";
import { UserFilter } from "../../../components/shared/filter/userFilter";
// fetching all innovators
async function fetchInnovators() {
  const response = await apiClient.get("/innovator/new");
  return response.data.data.innovators; // Adjust based on your API response structure
}
//fetching filtered innovators
async function fetchFilteredInnovators(country: string, experience: string) {
  const response = await apiClient.post("/innovator/filter", {
    country: country || undefined,
    experience: experience || undefined,
  });
  console.log(response.data.data.innovators);
  return response.data.data.innovators; // Adjust based on your API response structure
}
export default function InnovatorPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedExperience, setselectedExperience] = useState("");
  function locationFilter(v: string) {
    console.log(v);
    setSelectedCountry(v);
  }
  function experienceFIlter(v: string) {
    console.log(v);
    setselectedExperience(v);
  }
  const navigate = useNavigate();
  const username = useSelector((state: any) => state.user.user?.username);

  // Fetch innovators using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["innovators"], // Unique query key
    queryFn: fetchInnovators, // Your API call function
  });
  const {
    data: filteredUsers,
    isLoading: filteredUserLoading,
    error: filteredUserError,
  } = useQuery({
    queryKey: ["filteredInnovators", selectedCountry, selectedExperience], // Unique query key
    queryFn: () => fetchFilteredInnovators(selectedCountry, selectedExperience), // Your API call function
  });

  // Slicing logic for top 3 users
  const newUsers = data ? data.slice(0, 3) : [];

  // Button click handler
  function buttonClickHandler(e: any) {
    if (!username) {
      navigate("/sign-up");
    } else {
      navigate("/registeration/innovator");
    }
  }
  if (!filteredUserLoading) console.log(filteredUsers);
  return (
    <>
      <Card styles="flex flex-col">
        <HeadingPrimary styles="text-center text-sm">
          Unleash your creativity,{" "}
          <span className="text-[#944500] underline">share your ideas</span>,
          and connect with investors and experts to turn your{" "}
          <span className="text-green-900 underline">vision into reality</span>.
        </HeadingPrimary>
        <Button
          variant="outline"
          className="self-center mt-6 px-12 py-6 text-xl"
          onClick={buttonClickHandler}
        >
          Join Innovator Hub
        </Button>
        <div className="flex flex-col items-center mt-12 space-y-5">
          <h1 className="text-3xl font-bold text-primary">
            Newly Registered Innovators
          </h1>
          <h2 className="text-[#727077]">
            Meet new innovators who are making significant contributions in
            their fields.
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
            ) : newUsers.length > 0 ? (
              newUsers.map((user: any) => (
                <UserCard user={user} key={user.id} userType="Innovator" />
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
            userType="Innovator"
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
                <UserCard user={user} key={user.id} userType="Innovator" />
              ))
            ) : (
              <div>
                <h1 className="text-[#727077]">No Innovator found</h1>
              </div> // Handle empty state
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
