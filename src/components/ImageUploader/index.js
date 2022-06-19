import React from "react";
import config from "../../config.js";
import {
	ImageUploaderWrapper,
	ImageUploaderUploadContent,
	ImageUploaderInput,
	UploadIconWrapper,
} from "./ImageUploaderElements";


const ImageUploader = (props) => {

	function uploadImage(props) {
		
		const r = new XMLHttpRequest();
		const d = new FormData();
		const e = document.getElementsByClassName("input-image")[0].files[0];
		var url;

		d.append("image", e);

		r.open("POST", "https://api.imgur.com/3/image/");
		r.setRequestHeader("Authorization", `Client-ID ${config.client}`);
		r.onreadystatechange = function () {

			if (r.status === 200 && r.readyState === 4) {

				let res = JSON.parse(r.responseText);
				url = `https://i.imgur.com/${res.data.id}.png`;
				
				props.setImages([...props.images, url])

				// props.addDisplayImageDivs(props.displayImageDivs);

				// const d = document.createElement("div");
				// d.className = "image";
				// document.getElementsByTagName("body")[0].appendChild(d);

				// const i = document.createElement("img");
				// i.className = "image-src";
				// i.src = u;
				// document.getElementsByClassName("image")[0].firstChild.src = url;
				// document.getElementsByClassName("uploadicon")[0].style.display = "none";

				// const a = document.createElement("a");
				// a.className = "image-link";
				// a.href = u;
				// document.getElementsByClassName("image")[0].appendChild(a);

				// const p = document.createElement("p");
				// p.className = "image-url";
				// p.innerHTML = u;
				// document.getElementsByClassName("image-link")[0].appendChild(p);
			}
		};
		r.send(d);
	};

	return (
		<ImageUploaderWrapper className="image">
			<ImageUploaderUploadContent></ImageUploaderUploadContent>
			<UploadIconWrapper className="uploadicon">
				<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12.387 5.807a.387.387 0 1 0-.774 0v5.806H5.806a.387.387 0 1 0 0 .774h5.807v5.807a.387.387 0 1 0 .774 0v-5.807h5.807a.387.387 0 1 0 0-.774h-5.807V5.807z"
					></path>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-.774c6.2 0 11.226-5.026 11.226-11.226C23.226 5.8 18.2.774 12 .774 5.8.774.774 5.8.774 12 .774 18.2 5.8 23.226 12 23.226z"
					></path>
				</svg>
			</UploadIconWrapper>

			<ImageUploaderInput
				type="file"
				className="input-image"
				accept="image/*"
				onChange={() => uploadImage(props)}
			/>
		</ImageUploaderWrapper>
	);
}


export default ImageUploader;