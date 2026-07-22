type BookingReviewProps = {
  img_src: string;
  title: string;
	subtitle: string;
  start_date: Date;
  end_date: Date;
	booking_price: number;
};

export default function BookingReview({ img_src, title, subtitle, start_date, end_date, booking_price }: BookingReviewProps) {
	return (
		<div
			className="flex gap-4 items-center"
		>
			<div>
				<img
				className="h-28"
				src={img_src}
				/>
        </div>
        <div 
					className="flex-1 flex flex-col gap-1"
				>
				<span>
					{title}
				</span>
				<span>
					{start_date.toLocaleDateString("nl-NL")} - {end_date.toLocaleDateString("nl-NL")}
				</span>
				<span>
					{subtitle}
				</span>
				<span>
					€{booking_price}
				</span>
			</div>
    </div>
	);
}   