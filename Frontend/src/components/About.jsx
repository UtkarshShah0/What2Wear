function About() {
	return (
		<div className="About">
      <h1>About Our App</h1>
      <img src="./Logo.svg" alt="App logo" />
			<p>
        The What2Wear app aims to simplify your daily outfit decisions.
        We understand that choosing the right attire can be time-consuming and
        mentally draining. Our mission is to streamline this process by leveraging
        technology to provide personalized outfit recommendations.
      </p>
			<div className="why-us">
      <h2>Why Choose Us?</h2>
				<ul>
					<li>
						<strong>Time-Saving:</strong> On average, people spend 15-20 minutes
						daily deciding what to wear. Our app helps you reclaim those precious
						hours.
					</li>
					<li>
						<strong>Psychological Impact:</strong> Decision fatigue and stress
						related to wardrobe choices affect many. We're here to alleviate that
						burden.
					</li>
					<li>
						<strong>Personalized Recommendations:</strong> Input your favorite
						dress combos, and our business logic suggests your best outfit. No
						more guesswork!
					</li>
					<li>
						<strong>Competitive Edge:</strong> We focus on user-centric design,
						offer a simplified process (single image upload), and use AI for
						accurate outfit classification.
					</li>
				</ul>
			</div>
      <h3>Our Competitors</h3>
      <p>
        While other apps like CLADWELL, FINERY, and PUREPLE exist, we stand out
        with our commitment to user privacy, boosted confidence, and
        environmental consciousness.
      </p>
			<div className="join-us">
				<h3>Join Us!</h3>
				<p>
					Create an account, upload your images, and let us help you unlock your
					style. Together, we'll make fashion decisions easier and more sustainable.
				</p>
			</div>
    </div>
	);
}

export default About;