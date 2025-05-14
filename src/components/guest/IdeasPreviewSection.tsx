import { Badge } from "rizzui";
import { useQuery } from "@tanstack/react-query";
import TechnologyImage from "../../../src/assets/Images/categories/technology.jpeg";
import HealthCareImage from "../../../src/assets/Images/categories/healthcare.jpeg";
import BusinessImage from "../../../src/assets/Images/categories/business.jpeg";
import FinanceImage from "../../../src/assets/Images/categories/finance.jpeg";
import EnvironmentImage from "../../../src/assets/Images/categories/environment.jpeg";
import ScienceImage from "../../../src/assets/Images/categories/science.jpeg";
import CreativeArtsImage from "../../../src/assets/Images/categories/creative-arts.jpeg";
import EducationImage from "../../../src/assets/Images/categories/education.jpeg";
import SocialImpactImage from "../../../src/assets/Images/categories/social-impact.jpeg";
import IndustrialImage from "../../../src/assets/Images/categories/industrial.jpeg";
import ProductsImage from "../../../src/assets/Images/categories/products.jpeg";
import TransportationImage from "../../../src/assets/Images/categories/transportation.jpeg";
import { apiClient } from "../../../api/api.config";
import GetAToast from "../shared/get-a-toast";
import toast from "react-hot-toast";
import IdeaCardSkeleton from "../shared/skeleton/IdeaCardSkeleton2";
const getFeaturedIdeas = async function () {
  const response = await apiClient.get("innovator/get-featured-ideas");
  return response.data;
};

const images = {
  technology: TechnologyImage,
  business: BusinessImage,
  healthcare: HealthCareImage,
  finance: FinanceImage,
  environment: EnvironmentImage,
  science: ScienceImage,
  education: EducationImage,
  industrial: IndustrialImage,
  oroducts: ProductsImage,
  transportation: TransportationImage,
  "creative-arts": CreativeArtsImage,
  "social-impact": SocialImpactImage,
};

const IdeasPreviewSection = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["featuredIdeas"],
    queryFn: getFeaturedIdeas,
  });
  if (isError) {
    toast.error("something happend, try later");
  }
  if (data) {
    console.log(data.data?.ideas);
  }
  // Sample idea data (anonymized/obfuscated)

  return (
    <>
      <GetAToast />
      <div id="ideas-preview" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Featured Ideas
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Discover Innovative Concepts
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Browse through some of the innovative ideas on our platform.
              <span className="block mt-2 font-medium">
                Sign up to access complete details and connect with creators.
              </span>
            </p>
          </div>

          <div className="flex justify-between">
            {isLoading && [1, 2, 3].map((i) => <IdeaCardSkeleton key={i} />)}
            {!isLoading &&
              !isError &&
              data &&
              data.data?.ideas.slice(0, 3).map((idea, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md"
                  >
                    <div className="relative h-48 w-full">
                      <img
                        src={images[idea.category]}
                        alt={idea.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Protected overlay */}
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="p-2 bg-white bg-opacity-80 rounded-lg">
                          <svg
                            className="h-8 w-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {idea.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {idea.category}
                          </p>
                        </div>
                        <Badge
                          variant="flat"
                          className="capitalize"
                          color={
                            idea.status === "Expert Refined"
                              ? "success"
                              : idea.status === "Seeking Investment"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {idea.stage.label}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        {idea.description}
                      </p>

                      {/* Blurred content indicator */}
                      <div className="mt-4 py-3 px-4 bg-gray-100 rounded-md border border-gray-200 blur-[2px] hover:blur-none transition-all">
                        <p className="text-xs text-gray-500">
                          Additional details are only visible to registered
                          users...
                        </p>
                      </div>

                      <div className="mt-4">
                        <button className="w-full px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors">
                          Sign Up to View Complete Idea
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default IdeasPreviewSection;
