import Link from "next/link";
import { cn } from "@/lib/utils";

/** APIDrift mark from /public/logo.svg */
export function BrandMark({
  className,
  markClassName,
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="APIDrift home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local SVG mark */}
      <img
        src="/logo.svg"
        alt=""
        width={28}
        height={28}
        className={cn("size-7 shrink-0 rounded-sm", markClassName)}
      />
      {showWordmark ? (
        <span className="font-mono text-sm tracking-[0.22em] text-accent-signal uppercase">
          APIDrift
        </span>
      ) : null}
    </Link>
  );
}

/** @deprecated Prefer BrandMark */
export const Logo = BrandMark;
/** @deprecated Prefer BrandMark with showWordmark={false} */
export const LogoIcon = ({
  className,
}: {
  className?: string;
  uniColor?: boolean;
}) => <BrandMark className={className} showWordmark={false} />;
