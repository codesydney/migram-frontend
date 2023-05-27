import { useRouter } from "next/navigation";

import axios from "axios";
import to from "await-to-js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateTaskPayload,
  CreateTaskSchema,
  StateSchema,
  TaskCategorySchema,
} from "@/types/schemas/Task";

export default function CreateTaskPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskPayload>({ resolver: zodResolver(CreateTaskSchema) });

  const onSubmit = async (data: CreateTaskPayload) => {
    const [err, result] = await to(axios.post("/api/tasks", data));

    // TODO Handle Errors

    if (!err && result) {
      console.log("Successfully Created Task");
      router.push("/tasks");
    }
  };

  const onCancelClick = () => {
    router.push("/tasks");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Create Tasks
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-10 divide-y divide-gray-900/10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Task Details
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Tell us what needs to be done
                </p>
              </div>

              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Short Description
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="short-description"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("shortDescription")}
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.shortDescription?.message as string}
                      </p>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <select
                          id="category"
                          autoComplete="category"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          {...register("category")}
                        >
                          {TaskCategorySchema.options.map((category) => (
                            <option value={category} key={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="details"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        More Details
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="details"
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("details")}
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.details?.message as string}
                      </p>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="due-date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Due Date
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          id="due-date"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("dueDate")}
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.dueDate?.message as string}
                      </p>
                    </div>

                    {/* <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Task Photo
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Budget
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Tell us how much you are looking to spend
                </p>
              </div>

              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Budget
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          id="budget"
                          autoComplete="budget"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("budget")}
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.budget?.message as string}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Tell us where the task will need to be done
                </p>
              </div>

              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="street-address"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("location.streetAddress")}
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.location?.streetAddress?.message as string}
                      </p>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("location.city")}
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.location?.city?.message as string}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <select
                          id="state"
                          autoComplete="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          {...register("location.state")}
                        >
                          {StateSchema.options.map((state) => (
                            <option value={state} key={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.location?.state?.message as string}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Postcode
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register("location.postal_code")}
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.location?.postal_code?.message as string}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={onCancelClick}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
