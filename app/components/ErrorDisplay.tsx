export default function ErrorDisplay({ message }: { message: string }) {
  return <p className="text-red-600 text-center">{message}</p>;
}
