import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  /** "measure" narrows to a comfortable reading width */
  width?: "site" | "measure";
};

export function Container({ width = "site", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        width === "site" ? "max-w-site" : "max-w-measure",
        className,
      )}
      {...props}
    />
  );
}
