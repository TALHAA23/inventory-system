import DatabaseResponse from "@/app/_types/DatabaseResponse";

export default function response({ data, error }: DatabaseResponse) {
  return {
    data,
    error,
  };
}
