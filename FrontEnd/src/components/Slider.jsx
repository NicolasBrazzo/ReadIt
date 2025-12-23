export const Slider = () => {
  return (
    <div
      className="slider"
      style={{
        "--width": "500px",
        "--height": "200px",
        "--quantity": 10,
      }}
    >
      <div className="list">
        <div className="item" style={{ "--position": 1 }}>
          <p>In Italy, 39% of people read at least one book a year.</p>
        </div>
        <div className="item" style={{ "--position": 2 }}>
          <p>Only 6% of Italians are considered heavy readers.</p>
        </div>
        <div className="item" style={{ "--position": 3 }}>
          <p>In Southern Italy, only 27% read at least one book a year.</p>
        </div>
        <div className="item" style={{ "--position": 4 }}>
          <p>12% of Italians read e-books.</p>
        </div>
        <div className="item" style={{ "--position": 5 }}>
          <p>17% of Italian readers read no more than three books a year.</p>
        </div>
        <div className="item" style={{ "--position": 6 }}>
          <p>Worldwide, about 60% of people read books at least once a week.</p>
        </div>
        <div className="item" style={{ "--position": 7 }}>
          <p>In Sweden, about 80% of adults read at least one book a year.</p>
        </div>
        <div className="item" style={{ "--position": 8 }}>
          <p>
            In Italy, 74% of people aged 15–74 read books, e-books, or
            audiobooks.
          </p>
        </div>
        <div className="item" style={{ "--position": 9 }}>
          <p>The average weekly reading time in Italy is 4 hours.</p>
        </div>
        <div className="item" style={{ "--position": 10 }}>
          <p>Over 24% of Italians read nothing during the previous week.</p>
        </div>
      </div>
    </div>
  );
};
