const AuthCard = ({ title, children }) => {
  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-center text-2xl font-bold">
        {title}
      </h1>

      {children}
    </div>
  );
};

export default AuthCard;