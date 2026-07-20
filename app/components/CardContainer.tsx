import { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
}

export default function CardContainer({ children }: CardContainerProps) {
	return (
		<div 
      className="flex gap-8 flex-wrap"
    >
			{children}
		</div>
	);
};
