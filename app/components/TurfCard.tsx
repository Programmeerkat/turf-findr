type TurfCardProps = {
  imgSrc: string;
  title: string;
  subtitle: string;
};

export default function TurfCard({ imgSrc, title, subtitle }: TurfCardProps) {
	return (
		<div>
			<img 
        src={imgSrc}
        className="mb-1"
      />
      <p className="!mb-0">
        {title}
      </p>
      <span className="text-xs">
        {subtitle}
      </span>
		</div>
	);
};
