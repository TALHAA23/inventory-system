"use client";
const Error = ({ error }: { error: Error }) => {
  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center font-light">
      {error.message}
    </div>
  );
};

export default Error;
