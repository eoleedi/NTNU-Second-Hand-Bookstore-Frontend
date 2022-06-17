import React, { useState } from "react";
import styles from "./Rating.module.css";

const StarRating = () => {
	const [rating, setRating] = useState(0);
	return (
		<div className="star-rating">
			{[...Array(10)].map((index) => {
				index += 1;
				return (
					<button
						type="button"
						key={index}
						className={
							(index <= rating ? styles.on : styles.off) + " " + styles.button
						}
						onClick={() => setRating(index)}
					>
						<span className="star">&#9733;</span>
					</button>
				);
			})}
		</div>
	);
};

export default StarRating;
