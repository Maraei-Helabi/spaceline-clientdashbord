"use client";
import { ErrorSection } from "@/components/ErrorSection";

const ErrorPage = (props: { error: string }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ErrorSection
        error={String(props.error)}
        className="max-w-[500px] mx-auto"
      />
    </div>
  );
};

export default ErrorPage;
