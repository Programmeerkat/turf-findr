type AvatarProps = {
    name: string;
};

export default function Avatar({ name }: AvatarProps) {
	return (
		<div 
      className="w-12 h-12 rounded-full bg-white text-rose-800 flex items-center justify-center"
    >
			<span
        className="text-3xl font-extrabold"
      >
				{name}
			</span>
		</div>
	);
};
