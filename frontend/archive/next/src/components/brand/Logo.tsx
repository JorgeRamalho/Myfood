import Image from "next/image";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "mark" | "wordmark" | "full";
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "full",
  className,
  priority = false,
}: LogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/brand/logo-mark.png"
        alt={`${brand.name} logomarca`}
        width={48}
        height={48}
        priority={priority}
        className={cn("h-11 w-11 rounded-2xl object-cover", className)}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <Image
        src="/brand/wordmark.png"
        alt={brand.name}
        width={180}
        height={56}
        priority={priority}
        className={cn("h-9 w-auto object-contain", className)}
      />
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={40}
        height={40}
        priority={priority}
        className="h-10 w-10 rounded-xl object-cover shadow-sm"
        aria-hidden
      />
      <div className="min-w-0 leading-none">
        <p className="mf-display text-[1.2rem] font-bold tracking-tight text-ink sm:text-[1.35rem]">
          My<span className="text-tomato">Food</span>
        </p>
        <p className="mf-caption mt-1 hidden text-[0.7rem] sm:block">
          {brand.slogan}
        </p>
      </div>
    </div>
  );
}
