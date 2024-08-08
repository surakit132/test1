/* eslint-disable react/prop-types */

function TypeList({ types }) {
    const getColorClass = (type) => {
        switch (type.toLowerCase()) {
            case "dog":
                return "bg-green-100 border border-green-500 text-green-500";
            case "cat":
                return "bg-pink-100 border border-pink-500 text-pink-500";
            case "rabbit":
                return "bg-orange-100 border border-orange-500 text-orange-500";
            case "bird":
                return "bg-blue-100 border border-blue-500 text-blue-500";
            default:
                return "bg-gray-100 border border-gray-500 text-gray-500";
        }
    };




    return (
        <div className=" flex gap-2 md:gap-2">
            {types && types.length && types.map((type, i) => {
                return (
                    <button
                        key={i}
                        className={`h-8 w-20 rounded-full px-2 flex items-center justify-center  ${getColorClass(type)}`}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
}

export default TypeList;
