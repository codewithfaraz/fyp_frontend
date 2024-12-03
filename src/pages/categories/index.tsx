import Card from "../../components/layout/ui/card";
import HeadingPrimary from "../../components/layout/ui/heading-primary";
import { categories } from "../../../data/categories";
export default function Categories() {
  return (
    <Card styles="">
      <HeadingPrimary styles="md:text-4xl text-center">
        Find the perfect match to bring your vision to life!"
      </HeadingPrimary>
      <div className="flex flex-wrap mt-12 space-y-6 md:space-x-1 justify-center md:justify-between">
        {categories.map((category, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-[350px] filter  group-hover:grayscale"
              />
              <ul className="hidden group-hover:block absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-center">
                {category.availableCategories?.map((cat, index) => {
                  return (
                    <li key={index} className="text-xl">
                      {cat}
                    </li>
                  );
                })}
              </ul>
            </div>
            <h2 className="text-center text-xl font-bold bg-white shadow-lg mt-6 p-3">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </Card>
  );
}
