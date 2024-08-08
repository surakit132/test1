import ellpesb from "../assets/svgs/ellipesb.svg";
import ellpesa from "../assets/svgs/ellipesa.svg";
import star1 from "../assets/svgs/star1.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

const Linktologin = () => {
  const {state} = useAuth()

  return (
    <section className="lg:flex lg:justify-center lg:p-[80px]">
      <div className="flex justify-center overflow-hidden  bg-secondaryyellow-100 lg:rounded-[16px] w-[100%] max-w-[1280px]  relative px-[15px] pb-[106px] pt-[123px]">
        <img
          className="rounded-bl-lg absolute bottom-0 left-[-28px] w-[248px] h-[124px] lg:w-[337px] lg:h-[168px]"
          src={ellpesb}
          alt="half circle"
        />

        <div className="flex flex-col gap-[40px] w-[100%] z-10">
          <h1 className="text-[36px] leading-[44px]  text-center  font-bold text-black sm:text-[56px] sm:leading-[64px] ">
            Perfect Pet Sitter <br /> <span>For Your Pet</span>
          </h1>
          {!state.user&&<div className="flex flex-col gap-[16px] items-center sm:flex-row sm:justify-center">
            <Link to="/auth/login/petsitter" className="btn-ghost text-[16px] leading-[24px] font-bold  ">
              Become a Pet Sitter
            </Link>
            <Link to="/auth/login/user" className="btn-primary text-[16px] leading-[24px] font-bold w-[344px] sm:w-[168px]">
              Find A Pet Sitter
            </Link>
          </div>}
        </div>

        <img
          src={ellpesa}
          alt="circle"
          className="rounded-tr-lg absolute w-[133.76px] h-[133.81px] lg:w-[229px] lg:h-[229px] rotate-[15.01deg] top-[-70.98px]  right-[-18px]  lg:rotate-[0] lg:right-[-26px] lg:top-[-30px]"
        />
        <img
          src={star1}
          alt="star"
          className="absolute top-[28px] right-[62.12px] rotate-[0deg] w-[111.57px] h-[108.68px] lg:w-[191px] lg:h-[186px]  lg:right-[100px] lg:top-[145px] "
        />
      </div>
    </section>
  );
};

export default Linktologin;
