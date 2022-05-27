const SocialBtn = ({ logo, onClick }) => {
    return (
        <button
            className="rounded-full p-2 shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-800"
            onClick={onClick}
        >
            {logo}
        </button>
    );
};

export default SocialBtn;
