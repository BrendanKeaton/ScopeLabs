export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm pt-4 font-outfit font-light">
      {"success" in message && (
        <div className="text-red border-l-2 border-et-teal px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-red border-l-2 px-4">{message.message}</div>
      )}
    </div>
  );
}
