import { X } from 'lucide-react';
import { useState } from 'react';

function AddSectionModal({ staff, onClose, onAddSection }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Section title is required');
      return;
    }

    onAddSection({
      title: title.trim(),
      description: description.trim() || 'Custom staff document section'
    });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl shadow-slate-950/30"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Add New Section</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm">
          <p className="font-bold text-emerald-800">
            Adding section for: <span className="font-semibold">{staff.name}</span>
          </p>
          <p className="mt-1 font-semibold text-emerald-700">{staff.role}</p>
        </div>

        <label className="mt-6 block">
          <span className="text-sm font-semibold text-slate-800">
            Section Title *
          </span>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setError('');
            }}
            placeholder="Enter section title..."
            className="mt-3 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
          {error ? <span className="mt-2 block text-xs font-bold text-red-600">{error}</span> : null}
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-800">
            Section Description
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter section description..."
            rows="4"
            className="mt-3 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-lg bg-slate-100 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-11 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-white transition hover:bg-emerald-500"
          >
            Add Section
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSectionModal;
