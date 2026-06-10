// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 3 — ContactForm  (controlled form + validation + submit)
//
// Build a form with two CONTROLLED inputs and validation:
//   - a Name input  (give it accessible label "Name"  via aria-label="Name")
//   - an Email input (give it accessible label "Email" via aria-label="Email")
//   - a submit button with text "Submit"
//
// Behavior:
//   - both inputs are CONTROLLED (value from state + onChange updates state)
//   - on submit, call e.preventDefault()
//   - if EITHER field is empty → render an element with role="alert" containing
//     the text:  All fields are required
//   - if BOTH are filled → render the text:  Welcome, {name}
//     (e.g. typing "Eric" then submitting shows "Welcome, Eric")
//
// Hints:
//   - type the submit handler param: React.FormEvent<HTMLFormElement>
//   - type the change handlers:      React.ChangeEvent<HTMLInputElement>
//   - <p role="alert">...</p> for the error;  conditionally render with &&
//
// Run the tests:  npx vitest run ContactForm
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("All fields are required");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p role="alert">{error}</p>}
      {submitted && <p>Welcome, {name}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
