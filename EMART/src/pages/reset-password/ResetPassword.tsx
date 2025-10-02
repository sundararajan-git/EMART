import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { validateForm } from "@/lib/helper";

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

      const { email, password } = { email: "", password: "" };

      if (formJson.email !== email) {
        return toast.error("User not found !");
      }

      if (formJson.password !== password) {
        return toast.error("Password is incorrect !");
      }

      //   auth.isLogin = true;
      //   localStorage.setItem("auth", JSON.stringify(auth));

      navigate("/");
      toast.success("Login successfully");
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
