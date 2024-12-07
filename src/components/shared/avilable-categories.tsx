import Card from "../layout/ui/card";
export default function AvailableCategories() {
  return (
    <Card styles="">
      <div className="flex justify-between">
        <span className="text-green-900 font-bold">Technology</span>
        <span>Health Care</span>
        <span>Finance</span>
        <span>Environment</span>
        <span>Business</span>
        <span>Science</span>
        <span>Creative Arts</span>
        <span>Education</span>
        <span>Social Impact</span>
        <span>Inductrial</span>
        <span>Products</span>
        <span>Transportation</span>
      </div>
    </Card>
  );
}
