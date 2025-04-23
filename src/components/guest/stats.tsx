import React from "react";
import { apiClient } from "../../../api/api.config";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";

const getStats = async function () {
  const response = await apiClient.get("/get-stats");
  console.log(response.data.data);
  return response.data.data;
};
export const StatsSection: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
  if (data) {
    console.log(data);
  }
  if (isLoading) {
    return;
  } else
    return (
      <div className="bg-primary py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by innovators around the world
            </h2>
            <p className="mt-3 text-xl text-indigo-100 sm:mt-4">
              Our platform is making innovation accessible and successful
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white">
                <CountUp
                  end={data.ideas}
                  suffix="+"
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyDelay={200}
                />
              </p>
              <p className="text-white">Active Ideas</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">
                <CountUp
                  end={data.experts}
                  suffix="+"
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyDelay={200}
                />
              </p>
              <p className="text-white">Expert Advisors</p>
            </div>

            <div>
              <p className="text-4xl font-bold text-white">
                <CountUp
                  end={data.innovators}
                  suffix="+"
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyDelay={200}
                />
              </p>
              <p className="text-white">Innovators</p>
            </div>
          </div>
        </div>
      </div>
    );
};
