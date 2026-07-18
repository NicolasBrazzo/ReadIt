import { Plus } from "lucide-react";
import { Button } from "./ui";
import { capitalizeFirstLetter } from "../utils/utilityFunctions";

export const DashboardHeader = ({ userName, onAddBook }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h1 className="text-h1 text-text">
        <span className="text-accent">Welcome</span>{" "}
        {capitalizeFirstLetter(userName)}
      </h1>
      <p className="text-text-2 text-[14px] mt-1">
        Here's where your reading progress lives.
      </p>
    </div>
    <Button icon={Plus} onClick={onAddBook}>
      Add Book
    </Button>
  </div>
);
