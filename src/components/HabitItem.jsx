import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(habit);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);

  const handleSave = () => {
    updateHabit(habit.id, editData);
    setEditing(false);
  };

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col gap-3">
      {editing ? (
        <div className="flex flex-col gap-3">
          <input
            className="border border-slate-300 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                {habit.category}
              </span>
              <span
                className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                  habit.priority === "High"
                    ? "bg-red-100 text-red-500"
                    : habit.priority === "Medium"
                      ? "bg-orange-100 text-orange-400"
                      : "bg-green-100 text-green-500"
                }`}
              >
                {habit.priority}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">
                {getStreak(habit.completedDates)}{" "}
                <span className="text-indigo-500">^^</span>
              </p>
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Streak
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800">{habit.name}</h3>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide">
                Goal
              </p>
              <p className="text-sm font-semibold text-slate-700">
                {habit.goalValue}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEditing(true)}
                className="text-slate-500 hover:text-slate-800 font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-slate-500 hover:text-red-500 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`font-semibold px-4 h-11 rounded-xl transition-colors ${
                  isDoneToday
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isDoneToday ? "Done" : "Complete"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HabitItem;
