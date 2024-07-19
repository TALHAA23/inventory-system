const loading = () => {
  return (
    <div className="container w-full h-[calc(100vh-60px)] flex items-center justify-center">
      <div className="loader">
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
      </div>
    </div>
  );
};

export default loading;
