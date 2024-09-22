import { useEffect, useState } from "react";

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  {
    text: "In learning, you will teach, and in teaching, you will learn.",
    author: "Phil Collins",
  },
  {
    text: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family.",
    author: "Kofi Annan",
  },
  {
    text: "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch",
  },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "Continuous improvement is better than delayed perfection.",
    author: "Mark Twain",
  },
  {
    text: "The beautiful thing about learning is nobody can take it away from you.",
    author: "B.B. King",
  },
];

const QuoteCarousel = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="quote-carousel p-6 rounded-lg transition-transform transform mt-28 mb-20">
      <p className="text-center text-2xl font-bold text-gray-800 mb-4">
        "{quotes[currentQuote].text}"
      </p>
      <p className="text-center text-gray-600 text-lg">
        {quotes[currentQuote].author}
      </p>
    </div>
  );
};

export default QuoteCarousel;
