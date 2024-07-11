export default function serverActionDefaultResponse({
  message,
  error,
}: {
  message?: string;
  error?: string;
}) {
  return {
    message,
    error,
  };
}
