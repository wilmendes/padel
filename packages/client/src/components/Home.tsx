import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { AuthSection } from "./AuthSection";

export const Home = () => {
  const { data, isLoading } = trpc.greeting.useQuery({ name: "hey" });
  return (
    <div>
      <AuthSection />
    </div>
  );
};
