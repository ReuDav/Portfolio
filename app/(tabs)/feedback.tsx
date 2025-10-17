import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // 👈 hozzáadva a router import
import { FaStar } from 'react-icons/fa'; // 🎨 szebb csillag ikonok

const MAX_CHAR_COUNT = 250;

const Feedback = () => {
  const router = useRouter();
  const [starCount, setStarCount] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isTooLong, setIsTooLong] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFeedback(text);
    setIsTooLong(text.length > MAX_CHAR_COUNT);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isTooLong || submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch('https://weiss-toborzas-api.fly.dev/api/add-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback,
          star_count: starCount,
        }),
      });

      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status}`);
      }

      alert('🎉 Köszönjük a visszajelzést!');
      setFeedback('');
      setStarCount(5);

      // ✅ Átirányítás a "finished" oldalra
      setTimeout(() => {
        router.push('/finished');
      }, 800);
    } catch (error) {
      console.error('❌ Hiba történt:', error);
      alert('Hiba történt a küldés közben.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 450,
        margin: '4rem auto',
        padding: '2rem',
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '1rem', color: '#009877' }}>Köszönjük, hogy játszottál! 💚</h2>
      <p style={{ marginBottom: '1.5rem' }}>
        Kérjük, értékeld az élményt és mondd el a véleményed!
      </p>

      {/* 🌟 Csillag értékelés */}
      <div style={{ marginBottom: '1.5rem' }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <FaStar
            key={n}
            onClick={() => setStarCount(n)}
            onMouseEnter={() => setHoveredStar(n)}
            onMouseLeave={() => setHoveredStar(null)}
            style={{
              cursor: 'pointer',
              fontSize: '2.2rem',
              margin: '0 4px',
              transition: 'transform 0.2s, color 0.2s',
              transform: hoveredStar === n ? 'scale(1.3)' : 'scale(1)',
              color: n <= (hoveredStar ?? starCount) ? '#ffc107' : '#ccc',
            }}
          />
        ))}
      </div>

      {/* 📝 Szöveges mező */}
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Írj visszajelzést..."
        style={{
          width: '100%',
          height: '120px',
          padding: '10px',
          fontSize: '1rem',
          backgroundColor: isTooLong ? '#ffe6e6' : 'white',
          border: '1px solid #ccc',
          borderRadius: '5px',
          resize: 'none',
        }}
      />

      <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', textAlign: 'right', color: isTooLong ? 'red' : '#555' }}>
        {feedback.length}/{MAX_CHAR_COUNT}
      </div>

      {/* 🚀 Küldés gomb */}
      <button
        type="submit"
        disabled={isTooLong || submitting}
        style={{
          marginTop: '1.5rem',
          width: '100%',
          padding: '12px',
          fontSize: '1rem',
          backgroundColor: isTooLong || submitting ? '#ccc' : '#009877',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isTooLong || submitting ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s, transform 0.1s',
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {submitting ? 'Küldés...' : 'Küldés'}
      </button>
    </form>
  );
};

export default Feedback;
