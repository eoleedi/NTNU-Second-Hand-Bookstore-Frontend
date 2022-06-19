import styled from "styled-components";

export const ImageUploaderWrapper = styled.label`
	display: flex;
	justify-content: center;
	cursor: pointer;
	outline: 3px dotted #d9d9d9;
	height: 150px;
	width: 130px;
`;

export const ImageUploaderUploadContent = styled.img`
	height: 100%;
`;

export const ImageUploaderInput = styled.input`
	display: none;
`;

export const UploadIconWrapper = styled.i`
	line-height: 150px;
	display: inline-block;
	fill: currentColor;
	box-sizing: content-box;
	justify-content: center;
	width: 23px;
	height: 23px;
	color: #1791f2;
`;
