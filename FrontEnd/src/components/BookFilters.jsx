import { Heart, X } from "lucide-react";
import { Select, Input } from "./ui";
import { BOOK_GENRES } from "../../constants";

export const BookFilters = ({
  genre,
  onGenreChange,
  author,
  onAuthorChange,
  showOnlyFavorites,
  onToggleFavorites,
  hasActiveFilters,
  onReset,
}) => (
  <div className="flex flex-wrap gap-3 items-center bg-surface-2/60 border border-border rounded-field p-2">
    <div className="w-48">
      <Select value={genre} onChange={(e) => onGenreChange(e.target.value)}>
        <option value="">All genres</option>
        {BOOK_GENRES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </Select>
    </div>

    <div className="w-56">
      <Input
        type="text"
        placeholder="Filter by author..."
        value={author}
        onChange={(e) => onAuthorChange(e.target.value)}
      />
    </div>

    <button
      onClick={onToggleFavorites}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-field border text-[13px] font-mono transition-colors ${
        showOnlyFavorites
          ? "border-accent bg-accent-soft text-accent-text"
          : "border-border bg-surface text-text-2 hover:border-text-3 hover:text-text"
      }`}
    >
      <Heart size={14} fill={showOnlyFavorites ? "currentColor" : "none"} />
      Favorites
    </button>

    {hasActiveFilters && (
      <button
        onClick={onReset}
        className="flex items-center gap-1 px-3 py-2.5 text-text-3 text-[13px] font-mono hover:text-text transition-colors"
      >
        <X size={12} /> Reset
      </button>
    )}
  </div>
);
