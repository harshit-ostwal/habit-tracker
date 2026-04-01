import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      goalValue: "",
      unit: "Minutes",
      startDate: "",
      category: "Health",
      priority: "Medium",
    },
  });

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completed: false,
    };

    addHabit(payload);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onCommit)}
      className="flex flex-col gap-4 px-1"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="border border-slate-300 rounded-md h-11 px-4"
          placeholder="e.g. Exercise, Read, Meditate"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="flex gap-2 ">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium" htmlFor="goalValue">
            Daily Goal
          </label>
          <input
            id="goalValue"
            className="border border-slate-300 rounded-md h-11 px-4"
            placeholder="e.g. 30 minutes, 10 pages"
            {...register("goalValue", { required: "Daily Goal is required" })}
          />
          {errors.goalValue && (
            <p className="text-red-500 text-sm">{errors.goalValue.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium" htmlFor="unit">
            Unit
          </label>
          <select
            className="border border-slate-300 rounded-md h-11 px-4 w-full"
            name="unit"
            id="unit"
            {...register("unit")}
          >
            <option value="Minutes">Minutes</option>
            <option value="Pages">Pages</option>
            <option value="Reps">Reps</option>
            <option value="Liters">Liters</option>
          </select>
          {errors.unit && (
            <p className="text-red-500 text-sm">{errors.unit.message}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2 ">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium" htmlFor="startDate">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            className="border border-slate-300 rounded-md h-11 px-4"
            placeholder="e.g. 30 minutes, 10 pages"
            {...register("startDate", { required: "Start Date is required" })}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium" htmlFor="category">
            Category
          </label>
          <select
            className="border border-slate-300 rounded-md h-11 px-4 w-full"
            name="category"
            id="category"
            {...register("category", { required: "Category is required" })}
          >
            <option value="Health">Health</option>
            <option value="Focus">Focus</option>
            <option value="Growth">Growth</option>
            <option value="Mindset">Mindset</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <label className="text-sm font-medium" htmlFor="motivation">
          Motivation
        </label>
        <textarea
          rows={5}
          id="motivation"
          className="border border-slate-300 rounded-md px-4 py-2 resize-none"
          placeholder="Why do you want to build this habit?"
          {...register("motivation")}
        />
      </div>
      <div className="">
        <label className="text-sm font-medium" htmlFor="priority">
          Priority
        </label>
        <div className="flex items-center gap-20">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Low"
              {...register("priority", { required: "Priority is required" })}
              className="accent-indigo-500"
            />
            Low
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Medium"
              {...register("priority", { required: "Priority is required" })}
              className="accent-indigo-500"
            />
            Medium
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="High"
              {...register("priority", { required: "Priority is required" })}
              className="accent-indigo-500"
            />
            High
          </label>
        </div>
        {errors.priority && (
          <p className="text-red-500 text-sm">{errors.priority.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 h-11 rounded-md"
      >
        Create
      </button>
    </form>
  );
};

export default HabitForm;
