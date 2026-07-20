import Avatar from "./Avatar";

type StarIconProps = {
  filled: boolean;
};

function StarIcon({ filled }: StarIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <polygon
        points="8,1 9.65,5.74 14.66,5.84 10.66,8.87 12.12,13.66 8,10.8 3.88,13.66 5.34,8.87 1.34,5.84 6.35,5.74"
        fill={filled ? "#FFD700" : "#374151"}
        stroke={filled ? "#FFA500" : "#4B5563"}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ReviewCardProps = {
  name: string;
  date: string;
  stars: number;
  text: string;
};

export default function ReviewCard({ name, date, stars, text }: ReviewCardProps) {
  const starList = Array.from({ length: 5 }, (_, i) => i < stars);
  return (
    <div 
      className="w-full flex gap-2"
    >
      <Avatar 
        name={name.charAt(0).toUpperCase()}
      />
      <div 
        className="flex-1"
      >
        <div 
          className="flex justify-between"
        >
          <span>
            {name}
          </span>
          <span>
            {date}
          </span>
        </div>
        <div 
          className="flex mb-2"
        >
          {starList.map((filled, i) => (<StarIcon key={i} filled={filled} />))}
        </div>
        <p>
          {text}
        </p>
      </div>
    </div>
  );
}