interface userFilterProps {
  locationFIlter: (location: string) => void;
  userType: string;
  experienceFilter: (location: string) => void;
}
export const UserFilter = ({
  locationFIlter,
  userType,
  experienceFilter,
}: userFilterProps) => {
  return (
    <div className="mb-8 mt-12">
      <h1 className="text-3xl font-bold">Browse All {userType}</h1>
      <div className="mt-5 flex space-x-3">
        <div className="w-full max-w-xs">
          <select
            onChange={(e) => locationFIlter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-900 focus:border-green-900 text-gray-700"
          >
            <option value="">All Countries</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
          </select>
        </div>
        <div className="w-full max-w-xs">
          <select
            onChange={(e) => experienceFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-900 focus:border-green-900 text-gray-700"
          >
            <option value="">Any Experience</option>
            <option value="1_2_years">1 to 2 years</option>
            <option value="3_5_years">3 to 5 years</option>
            <option value="5+_years">5+ years</option>
          </select>
        </div>
      </div>
    </div>
  );
};
