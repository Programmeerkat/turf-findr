type TurfCardProps = {
  imgSrc: string;
  title: string;
  subtitle: string;
  price?: number;
};

export default function TurfCard({ imgSrc, title, subtitle, price }: TurfCardProps) {
	return (
		<div>
      <div className="relative">
        <img 
          src={imgSrc}
          className="mb-1"
        />
        {price && (
          <div className="absolute bottom-2 right-2 bg-rose-800 p-2 rounded-xl">
            <span
              className="text-white"
              >
              €{price}
            </span>
          </div>
        )}
      </div>
      <p className="!mb-0">
        {title}
      </p>
      <span className="text-xs">
        {subtitle}
      </span>
		</div>
	);
};
