import { useAuth } from "../contexts/authentication";
import DogFoot from "../assets/svgs/dog-foot.svg";
import DogFootLg from "../assets/svgs/dog-foot-lg.svg";
import StarGreen from "../assets/svgs/star-green.svg";
import CurveBlue from "../assets/svgs/curve-blue.svg";
import Google from "../assets/svgs/logo-google.svg";
import Facebook from "../assets/svgs/logo-facebook.svg";
import { Formik, Form, Field } from "formik";
import { signupSchema } from "../schemas/SignUpAndSignIn";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const initialValues = {
  email: "",
  phone: "",
  password: "",
};

const RegisterPetSitterPage = () => {
  const { registerPetSitter, state } = useAuth();

  const onSubmit = (values, actions) => {
    registerPetSitter(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="w-screen flex items-center justify-center px-[16px] pt-[60px]">
            <img
              src={CurveBlue}
              alt="CurveBlue"
              className="hidden sm:flex sm:absolute sm:bottom-[250px] sm:left-[12.66px]"
            />
            <img
              src={StarGreen}
              alt="StarGreen"
              className="hidden sm:flex sm:absolute sm:bottom-0 sm:left-0"
            />
            <div className="w-[100%] flex flex-col items-center max-w-[440px] min-w-[343px] z-10">
              <header className="flex flex-col items-center justify-center gap-[8px] mb-[40px]">
                <h1 className="text-black text-[36px] sm:text-[56px] leading-[44px] sm:leading-[64px] font-bold">
                  Join Us!
                </h1>
                <h3 className="text-gray-400 text-[18px] sm:text-[24px] leading-[26px] sm:leading-[32px] font-medium sm:font-bold">
                  Become the best Pet Sitter with us
                </h3>
              </header>
              <main className="flex flex-col items-center justify-center gap-[32px] w-[100%]">
                {state.error && <p className="text-red-600">{state.error}</p>}
                {state.loading && (
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                  </Box>
                )}
                <div className="flex flex-col gap-[4px] w-[100%]">
                  <label
                    htmlFor="email"
                    className="font-medium text-[16px] leading-[24px]"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="email@company.com"
                    className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[4px] w-[100%]">
                  <label
                    htmlFor="phone"
                    className="font-medium text-[16px] leading-[24px]"
                  >
                    Phone
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[4px] w-[100%]">
                  <label
                    htmlFor="password"
                    className="font-medium text-[16px] leading-[24px]"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Create your password"
                    className="border border-gray-200 rounded-[8px] h-[48px] p-[12px] text-[16px] leading-[24px] font-normal"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
                <button type="submit" className="btn-primary">
                  Register
                </button>
                {/* <div className="w-[100%] flex gap-[20px] items-center">
                  <span className="flex flex-1 h-[1px] bg-gray-200"></span>
                  <span className="text-gray-400 text-[18px] leading-[26px] font-medium">
                    Or Continue With
                  </span>
                  <span className="flex flex-1 h-[1px] bg-gray-200"></span>
                </div> */}
                <div className="flex justify-center items-center gap-[8px]">
                  <span>
                    <p>Already have an account?</p>
                  </span>
                  <span>
                    <Link to="/auth/login/petsitter" className="btn-ghost">
                      Login
                    </Link>
                  </span>
                </div>
              </main>
            </div>
            <img
              src={DogFoot}
              alt="DogFoot"
              className="absolute right-0 top-0 sm:hidden"
            />
            <img
              src={DogFootLg}
              alt="DogFoot"
              className="hidden sm:absolute sm:flex sm:top-[49px] sm:right-0"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterPetSitterPage;
