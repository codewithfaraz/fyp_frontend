import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input } from "rizzui";
import Form from "../../../components/shared/form/form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { ContactInformation, contactInformation } from "../../../../validators/zod-schemas";

// Cast components to valid JSX types
const PhoneInputComponent = PhoneInput as unknown as React.FC<any>;
const SelectComponent = Select as unknown as React.FC<any>;

// Country List
const countryOptions = [
  { label: "United States", value: "United States" },
  { label: "Canada", value: "Canada" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "India", value: "India" },
];

export default function ContactInformationPage({
  submit,
  goBack,
}: {
  submit: (data: ContactInformation) => void;
  goBack: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactInformation>({
    resolver: zodResolver(contactInformation),
  });

  const selectedCountry = watch("country");
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    if (selectedCountry) {
      setLoadingCities(true);
      axios
        .post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: selectedCountry,
        })
        .then((response) => {
          if (response.data.data) {
            setCities(
              response.data.data.map((city: string) => ({
                label: city,
                value: city,
              }))
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        })
        .finally(() => setLoadingCities(false));
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  return (
    <Form style="my-12 w-full" onSubmit={handleSubmit(submit)}>
      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium">Phone No.</label>
        <Controller
          name="phoneNo"
          control={control}
          render={({ field }) => (
            <PhoneInputComponent
              country={"us"}
              enableSearch
              inputClass="w-full p-2 border border-gray-300 rounded"
              containerClass="w-full"
              onChange={(phone) => field.onChange(phone)}
              value={field.value || ""}
            />
          )}
        />
        {errors.phoneNo && (
          <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>
        )}
      </div>

      {/* Country Dropdown */}
      <div>
        <label className="block text-sm font-medium">Country</label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <SelectComponent
              options={countryOptions}
              className="w-full"
              placeholder="Select your country"
              value={countryOptions.find((c) => c.label === field.value)}
              onChange={(selectedOption) => {
                field.onChange(selectedOption?.label || "");
                setValue("city", "");
              }}
            />
          )}
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      {/* City Dropdown */}
      <div>
        <label className="block text-sm font-medium">City</label>
        {selectedCountry ? (
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <SelectComponent
                options={cities}
                isLoading={loadingCities}
                className="w-full"
                placeholder={
                  loadingCities ? "Loading cities..." : "Select your city"
                }
                value={cities.find((c) => c.label === field.value)}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.label || "")
                }
              />
            )}
          />
        ) : (
          <Input label="City" placeholder="Select a country first" disabled />
        )}
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="space-x-3 mt-4">
        <Button size="xl" variant="outline" onClick={goBack}>
          Back
        </Button>
        <Button size="xl" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
