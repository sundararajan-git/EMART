import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { validateForm } from "@/lib/helper";
import axiosInstance from "@/lib/axios/axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const logInBtnHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData);

      if (!validateForm(e.currentTarget)) {
        return toast.error("Invalid inputs");
      }

      const { data } = await axiosInstance.put(
        `/auth/reset-password/${"a38ab5262a0db7fb370374326781674844d37ec797904d689524f32741e80878"}`,
        formJson
      );

      console.log("Data", data);
      toast.success(data.message);
      switch (data.status) {
        case "PASSWORD_RESET_DONE":
          navigate("/login");
          break;
        default:
          toast.error("Unkown action");
          null;
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          className="flex flex-col gap-6"
          onSubmit={logInBtnHandler}
          noValidate
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
              />
            </div>

            <Button type="submit" className="w-full hover:cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
