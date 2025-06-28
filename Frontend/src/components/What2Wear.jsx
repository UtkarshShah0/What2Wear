import ImageCard from "./ImageCard";

function What2Wear({ image, className }) {
	return (
		<div className="what2wear">
			<p className="heading">Wear This For {image.tags}</p>
			<div id="suggestion-card">
				<div id="sparkle-1">
					<img src="./sparkle-1.png" alt="left-sparkle" className={className} />
				</div>
        <div className={className}>

				<ImageCard 
					img={image.url}
					desc={image.description}
					tag={image.tags}
					color={image.colors}
				/>

        </div>

				<div id="sparkle-2">
					<img src="./sparkle-2.png" alt="left-sparkle" className={className} />
				</div>
			</div>
		</div>
	);
}

export default What2Wear;