function MiniImageCard({ index, url, description }) {
  return (
    <div className="mini-img-card">
      <div className="mini-img-card-outer">
        <div className="mini-img">
          <img src={url} alt="Card Image" />
        </div>
        <div className="mini-img-desc">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default MiniImageCard;
