import { Check, Heart, Loader2 } from "lucide-react";
import { Badge, Button, Card, Disclosure, ProgressBar } from "./ui";
import { abbreviateText, capitalizeFirstLetter, getProgress } from "../utils/utilityFunctions";

export const BookCard = ({
  book,
  isExpanded,
  onToggleExpand,
  isFavoritePending,
  onToggleFavorite,
  isProgressPending,
  onIncrementProgress,
  isDeletePending,
  onEdit,
  onDelete,
}) => {
  const progress = getProgress(book);
  const isFinished = book.current_page === book.total_pages;

  return (
    <Card lift className="flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-text leading-tight truncate">
              {capitalizeFirstLetter(abbreviateText(book.title, 40))}
            </h3>
            <p className="text-text-2 text-[14px] truncate">
              {capitalizeFirstLetter(abbreviateText(book.author, 30))}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isFinished && <Check size={16} className="text-ok" />}
            <button
              onClick={onToggleFavorite}
              disabled={isFavoritePending}
              className="text-accent hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              title={book.is_favorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavoritePending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Heart size={16} fill={book.is_favorite ? "currentColor" : "none"} />
              )}
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[12px] text-text-3 mb-1">
            <span>p. {book.current_page} / {book.total_pages}</span>
            <span className={isFinished ? "text-ok" : "text-accent"}>{progress}%</span>
          </div>
          <ProgressBar value={progress} tone={isFinished ? "ok" : "accent"} />
        </div>

        {book.genre && (
          <Badge variant="outline" tone="accent" className="w-fit">
            {book.genre}
          </Badge>
        )}
      </div>

      <Disclosure
        open={isExpanded}
        onToggle={onToggleExpand}
        label={isExpanded ? "Hide" : "Details"}
        className="px-4"
      >
        <div className="flex flex-col gap-3">
          {!isFinished && (
            <Button
              size="sm"
              className="w-full"
              loading={isProgressPending}
              onClick={onIncrementProgress}
            >
              {isProgressPending ? "Updating..." : "+1 page"}
            </Button>
          )}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              disabled={isDeletePending}
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="flex-1"
              loading={isDeletePending}
              onClick={onDelete}
            >
              {isDeletePending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Disclosure>
    </Card>
  );
};
