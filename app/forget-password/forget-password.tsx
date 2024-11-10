import Form from "@/components/shared/form/form";
import { Input, PinCode, Button } from "rizzui";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Forget, forget } from "@/validators/zod-schemas";
export default function ForgetPassword() {
    function submit(data: Forget) {
      console.log(data);
    }
    const [isEmailEntered, setIsEmailEntered] = useState(false);
    const handleNextClick = () => {
        if (!isEmailEntered) {
            setIsEmailEntered(true);
        }
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Forget>({
      resolver: zodResolver(forget),
    });
    return (
      <Form style="" onSubmit={handleSubmit(submit)}>
      {!isEmailEntered?(  <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          inputClassName={`${errors.email ? "border-red-500" : ""}`}
          errorClassName="text-red-500"
          error={errors.email?.message}
        />):(<PinCode
        {...register("pinCode")}
        inputClassName={`${errors.pinCode ? "border-red-500" : ""}`}
        errorClassName="text-red-500"
        error={errors.pinCode?.message}
        /> )
      }
        <div className="space-y-3">
          <Button
            isLoading={false}
            type="submit"
            size="lg"
            variant="solid"
            className="bg-green-900 text-white flex space-x-3 w-full"
            onClick={!isEmailEntered ? handleNextClick : undefined}
          >
            <span>{!isEmailEntered?"Next":"Submit"}</span>
            <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
          </Button>
        </div>
      </Form>
    );
  }  
