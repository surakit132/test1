import logoFooter from "../assets/svgs/logo-footer.svg";

const Footer = () => {
  return (
    <footer className="bg-black py-[80px] flex justify-center items-center">
      <div className="flex flex-col items-center gap-[24px]">
        <img src={logoFooter} alt="logo" />
        <h1 className="text-white text-[18px] leading-[26px] lg:text-[24px] lg:leading-[32px] font-bold ">
          Find your perfect pet sitter with us.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
