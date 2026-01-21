'use client';

import { useState } from 'react';

interface TopicInputProps {
  onSubmit: (
    topic: string,
    difficulty: 'basic' | 'advanced',
    subject: 'Physics' | 'Chemistry' | 'Biology'
  ) => void;
  disabled: boolean;
}

export default function TopicInput({
  onSubmit,
  disabled,
}: TopicInputProps) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'basic' | 'advanced'>('basic');
  const [subject, setSubject] = useState<
    'Physics' | 'Chemistry' | 'Biology'
  >('Physics');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit(topic.trim(), difficulty, subject);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white dark:bg-gray-800
        rounded-xl
        shadow-sm
        border border-gray-200 dark:border-gray-700
        p-6
        mb-8
      "
    >
      {/* Topic Input */}
      <label
        htmlFor="topic"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Enter a JEE / NEET Topic
      </label>

      <div className="flex gap-4">
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Newton's Laws of Motion"
          disabled={disabled}
          maxLength={200}
          className="
            flex-1 px-4 py-3
            border border-gray-300 dark:border-gray-600
            rounded-md
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            disabled:bg-gray-100 dark:disabled:bg-gray-600
            disabled:text-gray-500
          "
        />

        <button
          type="submit"
          disabled={disabled || !topic.trim()}
          className="
            px-6 py-3
            bg-blue-600 text-white
            rounded-md
            font-semibold
            hover:bg-blue-700
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition-colors
          "
        >
          Explain
        </button>
      </div>

      {/* Subject Selector */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subject
        </p>

        <select
          value={subject}
          onChange={(e) =>
            setSubject(
              e.target.value as 'Physics' | 'Chemistry' | 'Biology'
            )
          }
          disabled={disabled}
          className="
            w-full px-3 py-2
            border border-gray-300 dark:border-gray-600
            rounded-md
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            disabled:bg-gray-100 dark:disabled:bg-gray-600
          "
        >
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
        </select>
      </div>

      {/* Difficulty Toggle */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Explanation Level
        </p>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="difficulty"
              value="basic"
              checked={difficulty === 'basic'}
              onChange={() => setDifficulty('basic')}
              disabled={disabled}
              className="accent-blue-600"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Basic
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="difficulty"
              value="advanced"
              checked={difficulty === 'advanced'}
              onChange={() => setDifficulty('advanced')}
              disabled={disabled}
              className="accent-blue-600"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Advanced
            </span>
          </label>
        </div>
      </div>
    </form>
  );
}
