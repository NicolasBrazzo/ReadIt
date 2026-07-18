import {
  BarChart3,
  BookMarked,
  BookOpen,
  Heart,
  Library,
  Tag,
  TrendingUp,
} from "lucide-react";
import { Card, EmptyState, ProgressBar } from "./ui";
import { capitalizeFirstLetter } from "../utils/utilityFunctions";

const STAT_CHIP_CLASSES = {
  ok: "bg-ok-soft text-ok",
  accent: "bg-accent-soft text-accent-text",
  neutral: "bg-surface-2 text-text-2",
};

const StatCard = ({ icon: Icon, label, value, tone = "neutral" }) => {
  const toneClass = tone === "ok" ? "text-ok" : tone === "accent" ? "text-accent" : "text-text";
  return (
    <Card lift className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className={`flex items-center justify-center w-9 h-9 rounded-full ${STAT_CHIP_CLASSES[tone]}`}>
          {Icon && <Icon size={16} />}
        </span>
        <span className="text-text-3 text-[11px] uppercase tracking-wide font-mono">
          {label}
        </span>
      </div>
      <span className={`text-3xl md:text-4xl font-black ${toneClass}`}>
        {value}
      </span>
    </Card>
  );
};

export const StatsPanel = ({ stats }) => {
  if (!stats) {
    return (
      <EmptyState
        icon={BarChart3}
        title="No stats yet"
        description="Add some books to start tracking your reading stats."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Library} label="Total books" value={stats.total_books} />
        <StatCard icon={BookOpen} label="In progress" value={stats.in_progress_count} />
        <StatCard icon={BookMarked} label="Finished" value={stats.finished_count} tone="ok" />
        <StatCard icon={Heart} label="Favorites" value={stats.favorites_count} tone="accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-text-2 text-[14px]">
              <TrendingUp size={16} /> Average progress
            </div>
            <span className="text-accent text-2xl font-black">{stats.average_progress}%</span>
          </div>
          <ProgressBar value={stats.average_progress} />
          <p className="text-text-3 text-[14px]">
            {stats.total_pages_read.toLocaleString()} / {stats.total_pages.toLocaleString()} pages read
          </p>
        </Card>

        <Card className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-text-2 text-[14px]">
            <Tag size={16} /> Favorite genre
          </div>
          {stats.favorite_genre ? (
            <span className="text-accent text-xl font-bold">{stats.favorite_genre}</span>
          ) : (
            <span className="text-text-3 text-[14px] italic">No genre yet</span>
          )}
        </Card>
      </div>

      <Card className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-text-2 text-[14px]">
          <BookOpen size={16} /> Most advanced book
        </div>
        {stats.most_advanced_book ? (
          <>
            <h3 className="text-h2 text-text">
              {capitalizeFirstLetter(stats.most_advanced_book.title)}
            </h3>
            <p className="text-text-3 text-[14px]">
              by {capitalizeFirstLetter(stats.most_advanced_book.author)}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <ProgressBar value={stats.most_advanced_book.progress} trackClassName="flex-1" />
              <span className="text-accent font-bold">{stats.most_advanced_book.progress}%</span>
            </div>
          </>
        ) : (
          <span className="text-text-3 text-[14px] italic">No book in progress</span>
        )}
      </Card>
    </div>
  );
};
