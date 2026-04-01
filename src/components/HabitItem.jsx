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
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Edit Habit
          </p>

          <input
            className="border border-indigo-400 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 w-full"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />

          <div className="flex gap-3">
            <select
              className="flex-1 border border-slate-200 rounded-xl px-3 h-11 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              value={editData.priority}
              onChange={(e) =>
                setEditData({ ...editData, priority: e.target.value })
              }
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <select
              className="flex-1 border border-slate-200 rounded-xl px-3 h-11 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
            >
              <option value="Health">Health</option>
              <option value="Fitness">Fitness</option>
              <option value="Mindset">Mindset</option>
              <option value="Growth">Growth</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-5 text-sm text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
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
