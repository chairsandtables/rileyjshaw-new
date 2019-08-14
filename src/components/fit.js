import React, {useState, useEffect, useRef} from 'react';

import {useWindowWidth} from '../util/hooks';

import './fit.css';

export default ({children, className = ''}) => {
	const windowWidth = useWindowWidth();
	const [size, setSize] = useState([0, 0]);
	const [yAccumulator, setYAccumulator] = useState(0);
	const textEl = useRef(null);

	useEffect(() => {
		const {current: el} = textEl;
		if (!el) return;

		const {width, height, y} = el.getBBox();
		const newSize = [width, height].map(Math.floor);
		setYAccumulator(yAccumulator - y);
		if (newSize.some((d, i) => size[d] !== i)) {
			setSize(newSize);
		}
	}, [children, windowWidth, ...size]);

	return (
		<svg
			viewBox={`0 0 ${size.join(' ')}`}
			className={`${className} fit-svg`}
		>
			<text ref={textEl} x="50%" y={yAccumulator} className="fit-text">
				{children}
			</text>
		</svg>
	);
};
