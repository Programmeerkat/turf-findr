import { ReactNode } from "react";

type ReviewContainerProps = {
  children: ReactNode;
}

export default function ReviewContainer({ children }: ReviewContainerProps) {
	return (
		<div 
			className="flex flex-col gap-8 mb-6"
    	>
			{children}
		</div>
	);
};
