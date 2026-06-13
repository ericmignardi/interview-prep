// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R16 — Lifting State Up
//
// Two sibling components need to share state. The query typed in SearchInput
// must control what ResultsList shows — but they can't talk directly to each other.
// The solution: "lift" the shared state to their nearest common parent.
//
// Components to build:
//
//   SearchInput — props: { query: string; onQueryChange: (v: string) => void }
//     - renders <input aria-label="Search" value={query} onChange={...}>
//     - calls onQueryChange with the input value on every keystroke
//
//   ResultsList — props: { query: string; items: string[] }
//     - filters `items` to those whose text includes `query` (case-insensitive)
//     - when query is empty: show ALL items
//     - renders <ul> with <li key={item}>{item}</li> for each match
//     - when no items match: renders <p data-testid="empty">No results</p>
//
//   LiftState (the parent) — the single source of truth for query
//     - holds query in state (default '')
//     - renders <SearchInput> and <ResultsList> as siblings
//     - passes query + onQueryChange down to SearchInput
//     - passes query + ITEMS down to ResultsList
//
// The ITEMS constant below is the hardcoded list — use it in LiftState.
//
// Run tests: npx vitest run LiftState
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';

const ITEMS = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express'];

interface SearchInputProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function SearchInput({ query, onQueryChange }: SearchInputProps) {
  // TODO: implement
  return <div />;
}

interface ResultsListProps {
  query: string;
  items: string[];
}

export function ResultsList({ query, items }: ResultsListProps) {
  // TODO: filter items by query (case-insensitive); show all when query is empty
  // TODO: return <ul>/<li> or <p data-testid="empty">
  return <div />;
}

export default function LiftState() {
  // TODO: query state
  // TODO: render SearchInput + ResultsList, passing shared state down
  return <div />;
}
