import { MouseEventHandler, PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  href,
  disabled,
}: PropsWithChildren<ButtonProps>) {
  const style = `rounded-md text-black shadow-md p-2 bg-accent-dark hover:brightness-110 ${disabled ? "invisible" : ""}`;

  if (href) {
    return (
      <a href={href} target="_blank" className={style}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button" className={style}>
      {children}
    </button>
  );
}
