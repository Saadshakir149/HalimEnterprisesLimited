import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

type PortraitProps = {
  /** Width classes for the tile, e.g. "max-w-sm" */
  className?: string;
  /** Pass true where the portrait is the page's main image */
  priority?: boolean;
};

/**
 * The director's portrait. Until a real photo is supplied in
 * site.directorProfile.photo, a neutral monogram tile stands in. Never a
 * stock face presented as the director.
 */
export function Portrait({ className, priority = false }: PortraitProps) {
  const { photo } = site.directorProfile;
  return (
    <div className={cn("relative aspect-[4/5] w-full overflow-hidden rounded-md bg-navy", className)}>
      {photo ? (
        <Image
          src={photo}
          alt={`${site.director}, ${site.directorProfile.role}`}
          fill
          sizes="(min-width: 1024px) 24rem, 80vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div aria-hidden="true" className="flex size-full items-center justify-center">
          <span className="font-serif text-[clamp(4rem,10vw,7rem)] leading-none font-semibold tracking-tight text-on-navy">
            {initials(site.director)}
          </span>
          <span className="absolute inset-x-8 bottom-8 flex flex-col gap-0.75 sm:inset-x-10 sm:bottom-10">
            <span className="h-px bg-teal-on-dark" />
            <span className="h-px bg-teal-on-dark" />
          </span>
        </div>
      )}
    </div>
  );
}
