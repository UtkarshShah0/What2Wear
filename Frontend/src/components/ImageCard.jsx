function ImageCard({ img, desc, tag, color}) {
	return (
		<div className="img-card">
			<div className="img-card-outer">
				<div className="img">
					<img src={img} alt="Card Image" />
				</div>
				<div className="img-desc">
					<p className="desc">{desc}</p>
				</div>	
				<div className="tags">
					<div className="img-tag">
						<p># {tag}</p>
					</div>
					<div className="img-color">
						<p># {color}</p>
					</div>
				</div>
			</div>
		</div>
  );
}

export default ImageCard;