import { useState, useRef, useEffect } from "react";

export default function FAQ() {
  const allFaqs = [
    { question: "What is this project about?", answer: "This project is a React-based system with styled summary and FAQ sections." },
    { question: "Can I customize the content?", answer: "Yes, you can easily modify the questions, answers, and styling." },
    { question: "Does it support hover effects?", answer: "Absolutely! Each FAQ item highlights on hover." },
    { question: "What happens if there are too many FAQs?", answer: "The section will scroll internally while keeping a clean look with hidden scrollbars." },
    { question: "Is the layout responsive?", answer: "Yes, the FAQ container is fully responsive and adapts to screen size." },
    { question: "Can I add new questions?", answer: "Yes, just extend the array in the component or fetch dynamically." },
    { question: "Does it work with mobile?", answer: "Of course, it’s mobile-friendly and responsive." }
  ];

  const [faqCount, setFaqCount] = useState(5); // default
  const [showScrollTop, setShowScrollTop] = useState(false);
  const faqListRef = useRef(null);

  // Handle scroll event to toggle button
  useEffect(() => {
    const handleScroll = () => {
      if (faqListRef.current) {
        setShowScrollTop(faqListRef.current.scrollTop > 50);
      }
    };
    const list = faqListRef.current;
    if (list) list.addEventListener("scroll", handleScroll);
    return () => list && list.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (faqListRef.current) {
      faqListRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-control">
          <label htmlFor="faqCount">#</label>
          <input
            id="faqCount"
            type="number"
            min="1"
            max={allFaqs.length}
            value={faqCount}
            onChange={(e) => setFaqCount(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="faq-list" ref={faqListRef}>
        {allFaqs.slice(0, faqCount).map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>

      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ⬆
        </button>
      )}
    </div>
  );
}
