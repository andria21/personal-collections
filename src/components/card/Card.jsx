import "./card.styles.scss"

import Link from "next/link";

const Card = ({ title, description, image, link }) => {
  return (
    <div className="card">
      <Link href={"#"}>
          <img src={"https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt={"titlew"} />
          <div className="card-body">
            <h3>Card</h3>
            <p>Card Desc</p>
          </div>
      </Link>
    </div>
  );
};

export default Card;