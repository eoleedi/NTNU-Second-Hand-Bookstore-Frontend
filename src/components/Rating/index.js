import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import styles from "./Rating.module.css";

class StarRating extends React.Component {
	constructor(props) {
		super(props);
		this.name = this.props.name;
	}

	render() {
		return (
			<div className="star-rating">
				{[...Array(10).keys()].map((index) => {
					index += 1;
					return (
						<button
							type="button"
							key={index}
							className={
								(index <= this.props.rating ? styles.on : styles.off) +
								" " +
								styles.button
							}
							onClick={(event) => {
								this.props.setRating(index);
							}}
						>
							<span className="star">&#9733;</span>
						</button>
					);
				})}
			</div>
		);
	}
}

export default StarRating;
