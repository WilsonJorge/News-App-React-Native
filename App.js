import AppNavigation from "./src/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeWindStyleSheet } from "nativewind";

const queryClient = new QueryClient();

export default function App() {
  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
