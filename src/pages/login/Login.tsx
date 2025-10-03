import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { validateForm } from "@/lib/helper";
import axiosInstance from "@/lib/axios/axios";

const Login = () => {
  const navigate = useNavigate();
  const logInBtnHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries(formData);

      if (!validateForm(e.currentTarget)) {
        return toast.error("Invalid inputs");
      }

      formJson.software = "EMart";

      const { data } = await axiosInstance.post("/auth/login", formJson);

      console.log(data.user.jwtToken);
      toast.success(data.message);
      switch (data.status) {
        case "LOGINED":
          localStorage.setItem("jwt", JSON.stringify(data.user.jwtToken));
          navigate("/");
          break;
        case "RESEND_VERIFICATION":
          navigate("/verify");
          break;
        default:
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
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
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
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <span
                  className="ml-auto text-sm underline-offset-4 hover:underline hover:cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot your password?
                </span>
              </div>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
              />
            </div>
            <Button type="submit" className="w-full hover:cursor-pointer">
              Login
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <span
              className="underline underline-offset-4 hover:cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
