export default function ComponentError({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <div className="h-full w-full flex items-center justify-center text-xs text-red-800">
      {errorMessage}
    </div>
  );
}
