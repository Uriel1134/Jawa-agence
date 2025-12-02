import React from "react";

type LogoMarkProps = {
  size?: "sm" | "md" | "lg";
};

const sizeMap: Record<Required<LogoMarkProps>["size"], string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-12 w-12"
};

const LogoMark: React.FC<LogoMarkProps> = ({ size = "md" }) => {
  return (
    <div className={`inline-flex items-center justify-center ${sizeMap[size]}`}>
      {/* Place le fichier du petit logo carré (J* violet) dans /public/jawa-logo-mark.png */}
      <img
        src="/Logo.png"
        alt="Logo JAWA"
        className="h-full w-full"
      />
    </div>
  );
};

export default LogoMark;



