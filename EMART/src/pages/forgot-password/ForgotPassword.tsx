import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { validateForm } from "@/lib/helper";

const ForgotPassword = () => {
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
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to reset password
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required
              />
            </div>

            <Button type="submit" className="w-full hover:cursor-pointer">
              Send
            </Button>
          </div>
          <div className="text-center text-sm">
            Already you have an account?{" "}
            <span
              className="underline underline-offset-4 hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
