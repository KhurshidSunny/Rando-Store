function ChooseUsCard({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
      <div className="text-center">{children}</div>
    </div>
  );
}
export default ChooseUsCard;
