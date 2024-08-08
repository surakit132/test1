const BookingDetail = ({ data }) => {
  return (
    <section className="w-full bg-white">
      <h1 className="text-[20px] leading-[28px] font-bold p-4 border-b md:text-2xl">
        Booking Detail
      </h1>

      <ul className="py-6 px-4 list-detail gap-4">
        <li className="list-detail">
          <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
            Pet Sitter:
          </span>
          <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
            Happy House! By Jane Maison
          </span>
        </li>
        <li className="list-detail">
          <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
            Date & Time:
          </span>
          <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
            25 Aug, 2023 | 7 AM - 10 AM
          </span>
        </li>
        <li className="list-detail">
          <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
            Duration:
          </span>
          <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
            3 hours
          </span>
        </li>
        <li className="list-detail">
          <span className="text-[#7B7E8F] text-[14px] leading-[24px] font-medium">
            Pet:
          </span>
          <span className="text-[#3A3B46] text-[16px] leading-[28px] font-medium">
            {data.pet_name.map((name) => `${name}, `)}
          </span>
        </li>
      </ul>

      <ul className="bg-black p-4">
        <li className="flex justify-between">
          <span className="text-white text-[16px] leading-[28px] font-medium">
            Total
          </span>
          <span className="text-white text-[16px] leading-[28px] font-medium">
            0.00 THB
          </span>
        </li>
      </ul>
    </section>
  );
};

export default BookingDetail;
