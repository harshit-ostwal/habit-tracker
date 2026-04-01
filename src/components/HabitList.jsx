import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll, setShowAll } = useHabit();

  const today = new Date().toISOString().split("T")[0];

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today),
  ).length;

  const progressPercent =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  if (habits.length === 0) {
    return (
      <div className="flex mt-20 items-center bg-slate-50 border border-slate-200 max-w-lg mx-auto p-10 rounded-xl justify-center flex-col">
        <h5 className="font-bold text-lg">No habits yet</h5>
        <p className="text-slate-400">
          Start your journey by adding a new habit above.
        </p>
      </div>
    );
  }

  const topCategory = habits.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {});

  const mainFocus = Object.keys(topCategory).reduce((a, b) =>
    topCategory[a] < topCategory[b] ? a : b,
  );

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <div className="max-w-md mx-auto mt-6 px-4 pb-20">
      <div className="flex flex-col gap-4 border border-slate-200 p-6 rounded-xl">
        <div className="flex flex-col gap-1">
          <p>DAILY PROGRESS</p>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-semibold">
              {habits.length === completedToday
                ? "All caught up!"
                : "Keep going!"}
            </h4>
            <p>
              {completedToday} / {habits.length}
            </p>
          </div>
        </div>
        <div className="h-3 bg-slate-100 rounded-xl overflow-hidden">
          <div
            className={`h-3 bg-indigo-500 rounded-xl duration-300 transition-all`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="h-px bg-slate-200 w-full" />
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xs text-slate-400">FOCUS</p>
            <p className="font-semibold">{mainFocus}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-slate-400">PRIORITY</p>
            <p className="font-semibold">
              {habits.filter((h) => h.priority === "High").length} High Tasks
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs text-slate-400 font-semibold">YOUR ROUTINE</p>
        {visibleHabits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default HabitList;
