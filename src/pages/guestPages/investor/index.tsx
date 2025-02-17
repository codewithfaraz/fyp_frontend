import { Button } from "rizzui";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../../api/api.config";
import Card from "../../../components/layout/ui/card";
import HeadingPrimary from "../../../components/layout/ui/heading-primary";
import { useQuery } from "@tanstack/react-query";
import { UserCard } from "../../../components/shared/Users/userProfileCard";
import { UserFilter } from "../../../components/shared/filter/userFilter";
// fetching new investors
async function fetchInvestors() {
  const response = await apiClient.get("/investor/new");
  return response.data.data.investors; // Adjust based on your API response structure
}
//fetching filtered innovators
async function fetchFilteredInvestors(country: string, experience: string) {
  const response = await apiClient.post("/investor/filter", {
    country: country || undefined,
    experience: experience || undefined,
  });
  return response.data.data.investors; // Adjust based on your API response structure
}
export default function InvestorPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedExperience, setselectedExperience] = useState("");
  function locationFilter(v: string) {
    setSelectedCountry(v);
  }
  function experienceFIlter(v: string) {
    setselectedExperience(v);
  }
  const username = useSelector((state: any) => state.user.user?.username);
  const navigate = useNavigate();
  function buttonClickHandler(e: any) {
    if (!username) {
      navigate("/sign-up");
    } else {
      navigate("/registeration/investor");
    }
  }

  // Fetch investors using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["innovators"], // Unique query key
    queryFn: fetchInvestors, // Your API call function
  });
  const {
    data: filteredUsers,
    isLoading: filteredUserLoading,
    error: filteredUserError,
  } = useQuery({
    queryKey: ["filteredInnovators", selectedCountry, selectedExperience], // Unique query key
    queryFn: () => fetchFilteredInvestors(selectedCountry, selectedExperience), // Your API call function
  });
  return (
    <>
      <Card styles="flex flex-col">
        <HeadingPrimary styles="text-center text-sm">
          Discover ground breaking ideas and{" "}
          <span className="text-[#944500] underline">invest in the future</span>
          .<span className="text-green-900 underline">Empower innovators</span>{" "}
          and fuel the next wave of transformative technology.
        </HeadingPrimary>
        <Button
          variant="outline"
          className="self-center mt-6 px-12 py-6 text-xl"
          onClick={buttonClickHandler}
        >
          Join Investor Hub
        </Button>
        <div className="flex flex-col items-center mt-12 space-y-5">
          <h1 className="text-3xl font-bold text-primary">
            Newly Registered Investors
          </h1>
          <h2 className="text-[#727077]">
            Meet new investors who are making significant contributions in their
            fields.
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
                <UserCard user={user} key={user.id} userType="Investor" />
              ))
            ) : (
              <div>
                <h1 className="text-[#727077]">No Investor found</h1>
              </div> // Handle empty state
            )}
          </div>
        </div>
        <div>
          <UserFilter
            locationFIlter={locationFilter}
            userType="Investor"
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
                <UserCard user={user} key={user.id} userType="Investor" />
              ))
            ) : (
              <div>
                <h1 className="text-[#727077]">No Investor found</h1>
              </div> // Handle empty state
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
